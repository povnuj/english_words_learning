import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

interface UserDatas {
  
  [key: string]: any; 
}

export async function GET(request: NextRequest) {



  const email = cookies().get('email');
  const main_email = 'test@test.com';
  const exp_time = cookies().get('exp_time');

  if(exp_time &&  Number.parseInt(exp_time.value, 10) > Date.now()){
    let userResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`.json`);
    const mainUserResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+main_email?.replace('.','_')+`.json`);
    
    if(userResp.ok && mainUserResp.ok){
      let userData: UserDatas = await userResp.json();
      const mUserData = await mainUserResp.json();
      const selectedCategory = userData.selectedCategory? userData.selectedCategory : 'other';

      const updUserCategory = async () => {
        let words:UserDatas = {};
            words[selectedCategory] = {};
            for(let key in mUserData.words[selectedCategory]){
              words[selectedCategory][key] = {
                learning: mUserData.words[selectedCategory][key].learning,
                posAnswer: 0,
                negAnswer: 1
              } 
            }
            const updResponse = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`/words.json`,
            {
              method: 'PATCH',
              body: JSON.stringify(words),
            });
      };
      
      if(userData.hasOwnProperty(selectedCategory)){
        //console.log("=======================================",  Object.keys(userData.words[selectedCategory]).length);
        //console.log("=======================================",  Object.keys(mUserData.words[selectedCategory]).length);
        if(Object.keys(userData.words[selectedCategory]).length !== Object.keys(mUserData.words[selectedCategory]).length){
          updUserCategory();
          userResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`.json`);
          userData = await userResp.json();
        }
      }else{
        updUserCategory();
        userResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`.json`);
        userData = await userResp.json();
      }


      cookies().set({
        name: 'category',
        value: selectedCategory,
        //httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      
      return NextResponse.json( {words: mUserData.words[selectedCategory], 
                                 userWords: userData.words[selectedCategory],
                                 categoryList: mUserData.categoryList, 
                                 selectedCategory});
    }else {
      return NextResponse.json({ message: 'Somesing went Wrong with your Auth' }, { status: 401 });
    }
  }
}

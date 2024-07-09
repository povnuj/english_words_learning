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
    const userResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`.json`);
    const mainUserResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+main_email?.replace('.','_')+`.json`);
    
    if(userResp.ok && mainUserResp.ok){
      const userData: UserDatas = await userResp.json();
      const mUserData = await mainUserResp.json();
      const selectedCategory = userData.selectedCategory? userData.selectedCategory : 'other';
      //console.log("=======================================", userData[selectedCategory]);
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

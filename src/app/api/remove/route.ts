import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const email = 'test@test.com';
  const { category } = await request.json();
  console.log(category);
  let listResp = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email.replace('.','_')+`/words/${category}.json`);
  const listWords = await listResp.json();
  for(let key in listWords){
    if(listWords[key].learning === true){
        console.log(key);
        const delResponse = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email.replace('.','_')+`/words/${category}/${key}.json`,
    {
        method: 'DELETE',
    });
    if(delResponse.ok){
        return NextResponse.json({ message: 'Remove successful'});
    } else {
        return NextResponse.json({ message: 'Remove fault. Check your credential!' }, { status: 401 });
    }
    }
  }
  
//   
return NextResponse.json({ message: 'Add fault. Check your credential!' }, { status: 201 });
}

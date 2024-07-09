import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const email = 'test@test.com';
  const { category, word } = await request.json();


  const addResponse = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email.replace('.','_')+`/words/${category}.json`,
    {
        method: 'POST',
        body: JSON.stringify(word),
    });
    if(addResponse.ok){
        return NextResponse.json({ message: 'Add successful'});
    
    //console.log("===================================================>",isAuthenticated);

    } else {
        return NextResponse.json({ message: 'Add fault. Check your credential!' }, { status: 401 });
    }
}

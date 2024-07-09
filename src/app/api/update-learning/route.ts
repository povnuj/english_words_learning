import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function PATCH(request: NextRequest) {

  const { id, word } = await request.json();
  const main_email = 'test@test.com';
  const email = cookies().get('email');
  const exp_time = cookies().get('exp_time');
  const category = cookies().get('category');
  //console.log("===================================================>");
  
  if(!exp_time ||  !(Number.parseInt(exp_time.value, 10) > Date.now()) ) return NextResponse.json({ message: 'Autentification issue' }, { status: 401 });
  
  const response = await fetch('https://wordslearning-255d7-default-rtdb.firebaseio.com/users/'+email?.value!.replace('.','_')+`/words/${category?.value}/${id}.json`,
    {
        method: 'PATCH',
        body: JSON.stringify(word),
    });
  //const isAuthenticated = await loginResponse.json();
    //console.log("===================================================>",isAuthenticated);

  if (response.ok) {

    // Response
    const response = NextResponse.json({ message: 'Update successful'});


    return response;
  } else {
    return NextResponse.json({ message: 'Udpate fault. Check your internet conection!' }, { status: 401 });
  }
}

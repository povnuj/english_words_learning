import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {

  const { email, password } = await request.json();


  const loginResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw_TZfD5zIV5FNlp9G_ZdT4gIP-jDEd8U`,
    {
        method: 'POST',
        body: JSON.stringify({email, password, returnSecureToken: true }),
    });
  const isAuthenticated = await loginResponse.json();
    //console.log("===================================================>",isAuthenticated);

  if (isAuthenticated.idToken) {

    // Response
    const response = NextResponse.json({ message: 'Login successful'});

    // token save
    cookies().set({
      name: 'idToken',
      value: isAuthenticated.idToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    cookies().set({
      name: 'email',
      value: isAuthenticated.email,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    cookies().set({
      name: 'refreshToken',
      value: isAuthenticated.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    cookies().set({
      name: 'exp_time',
      value: (Date.now() + 3600000).toString(),
      //httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } else {
    return NextResponse.json({ message: 'Login fault. Check your credential!' }, { status: 401 });
  }
}

'use server';

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'

export async function authenticate(_currentState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // validate email and password
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      console.log('userCredential', userCredential.user)
      const token = await userCredential.user.getIdToken();
      console.log('token', token)
      cookies().set('Authorization', token);
      cookies().set('User', JSON.stringify(userCredential.user));
      // return userCredential.user;
    }
    // return null;
  } catch (error: { code: string, message: string } | any) {
    const errorMessage = error?.message;
    console.log(error)
    return errorMessage;
  }

  redirect('/');

  // await signInWithEmailAndPassword(auth, email, password)
  //   .then(userCredential => {
  //     if (userCredential.user) {
  //       console.log('userCredential', userCredential.user)
  //       return userCredential.user;
  //     }
  //     return null;
  //   })
  //   .catch(error => {

  //   })
}

export async function logout() {
  await signOut(auth);
  cookies().delete('Authorization');
  cookies().delete('User');
  redirect('/login');
}

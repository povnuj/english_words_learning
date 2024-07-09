'use client'
import { FormEvent } from 'react'
import { Typography, Container, Box } from "@mui/material";
import { Colors } from '../theme/colors';
import { useRouter } from 'next/navigation';
 
export default function Login() {
 const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
 
    if (response.ok) {
      router.push('/words-list')
    } 
  }
 
  return (
    <Box width={'100%'} height={'90vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', rowGap: '20px', padding: '40px', maxWidth: '400px', width: '100%', background: Colors.lightGray, borderRadius: '10px'}}>
          <input style={{height: '25px'}} type="email" name="email" placeholder="Email" required />
          <input style={{height: '25px'}} type="password" name="password" placeholder="Password" required />
          <button  style={{maxWidth: '100px', padding: '5px 20px ', background: Colors.blue}} type="submit">Login</button>
        </form>
    </Box>
  )
}

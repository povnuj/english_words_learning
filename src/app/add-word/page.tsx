'use client'
import { FormEvent } from 'react'
import { Typography, Container, Box } from "@mui/material";
import { Colors } from '../theme/colors';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Word, StringParser } from '@/services/words-services';
 
export default function Login() {
 const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const category = useAppSelector((state) => state.words.selectedCategory);
    const category = 'new';

    const formData = new FormData(event.currentTarget)
    const en = formData.get('en')?.toString();
    const tr = formData.get('tr')?.toString();
    let word = {};
    if(en && tr) word = new Word().generateFromSring(en, tr);
    console.log(en);
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, word }),
    })
 
    if (response.ok) {
      router.push('/words-list')
    } 
  }
 
  return (
    <Box width={'100%'} height={'90vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', rowGap: '20px', padding: '40px', maxWidth: '400px', width: '100%', background: Colors.lightGray, borderRadius: '10px'}}>
          <input style={{height: '25px'}} type="text" name="en" placeholder="English word" required />
          <input style={{height: '25px'}} type="text" name="tr" placeholder="Translate word" required />
          <button  style={{maxWidth: '100px', padding: '5px 20px ', background: Colors.blue}} type="submit">Add</button>
        </form>
    </Box>
  )
}

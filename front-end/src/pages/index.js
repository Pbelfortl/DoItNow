import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { signIn } from '@/services/authApi'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  
  async function handleForm (event) {
    event.preventDefault()
    const body = {
      email:email,
      password:password
    }

    try{
      const response = await signIn(body)
      localStorage.setItem("token",JSON.stringify(response.token))
      router.push("/home")
    } catch (error) {
      alert(error?.response?.data)
    }
    
  }


  return (
    <>
      <LoginBox>
        <Form onSubmit={handleForm}>
          <input placeholder='Email'onChange={e => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password'onChange={e => setPassword(e.target.value)}/>
          <button type='submit'>Entrar</button>
          <button>Cadastre-se</button>
        </Form>
      </LoginBox>
    </>
  )
}

const LoginBox = styled.div`
  height: 500px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid lightgray 1px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
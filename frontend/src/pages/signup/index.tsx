import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/home.module.scss'
import logopizzaria from '@public/pizzaria.png'

import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'

import Link from 'next/link'
import { useState, FormEvent, useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

export default function Signup() {
  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent){
    event.preventDefault();

    setLoading(true);

    if(name === '' || email === '' || password === ''){
      console.log("falta dados aí..")
      return;
    }

    let data = {
      name,
      email,
      password,
    }

    await signUp(data);

    setLoading(false)

  }

  return (
   <>
   <Head>
    <title>Faça seu cadastro agora!</title>
   </Head>
   <div className={styles.containerCenter}>
    <Image src={logopizzaria} alt='PizzariaFun' />

    <div className={styles.login}>
      
      <h2>Criar sua conta no PizzaFun <span>\o/</span></h2>

      <form onSubmit={handleSignup} >
        <Input
         placeholder='Seu nome de usuário.'
         type='text'
         value={name}
         onChange={(e) => setName(e.target.value) }
        />
        <Input
         placeholder='email@exemplo.com'
         type='text'
         value={email}
         onChange={(e) => setEmail(e.target.value) }
        />
        <Input
         placeholder='Crie sua senha'
         type='password'
         value={password}
         onChange={(e) => setPassword(e.target.value) }
        />
        <Button
          type="submit"
          loading={loading}        
        >
          Cadastrar
        </Button>
      </form>

      <Link href="/"
       className={styles.text}
      >        
        Já possui uma conta? Faça login!        
      </Link>      

    </div>
   </div>
   </>
  )
}

import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/home.module.scss'
import logopizzaria from '@public/pizzaria.png'

import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'

import { AuthContext } from '@contexts/AuthContext';

import Link from 'next/link'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
     email,
     password,
    }

    await signIn(data);
  }

  return (
   <>
   <Head>
    <title>Pizzafun-Bem vindo!</title>
   </Head>
   <div className={styles.containerCenter}>
    <Image src={logopizzaria} alt='PizzariaFun' />

    <div className={styles.login}>
      <form onSubmit={handleLogin} >
        <Input
         placeholder='email@exemplo.com'
         type='text'
         value={email}
         onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
         placeholder='senha'
         type='password'
         value={password}
         onChange={ (e) => setPassword(e.target.value) }
        />
        <Button
          type="submit"
          loading={false}        
        >
          Entrar
        </Button>
      </form>

      <Link href="/signup"
       className={styles.text}
      >        
        Não possui uma conta ainda? Cadastre-se aqui!        
      </Link>      

    </div>
   </div>
   </>
  )
}

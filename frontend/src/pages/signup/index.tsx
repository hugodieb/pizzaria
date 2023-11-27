import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/home.module.scss'
import logopizzaria from '@public/pizzaria.png'

import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'

import Link from 'next/link'

export default function Home() {
  return (
   <>
   <Head>
    <title>Faça seu cadastro agora!</title>
   </Head>
   <div className={styles.containerCenter}>
    <Image src={logopizzaria} alt='PizzariaFun' />

    <div className={styles.login}>
      
      <h2>Criar sua conta no PizzaFun <span>\o/</span></h2>

      <form >
        <Input
         placeholder='Seu nome completo aqui...'
         type='text'
        />
        <Input
         placeholder='email@exemplo.com'
         type='text'
        />
        <Input
         placeholder='senha'
         type='password'
        />
        <Button
          type="submit"
          loading={false}        
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

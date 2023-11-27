import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/home.module.scss'
import logopizzaria from '@public/pizzaria.png'

import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'

export default function Home() {
  return (
   <>
   <Head>
    <title>Pizzafun-Bem vindo!</title>
   </Head>
   <div className={styles.containerCenter}>
    <Image src={logopizzaria} alt='PizzariaFun' />

    <div className={styles.login}>
      <form >
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
          Entrar
        </Button>
      </form>

      <a className={styles.text}>Não possui uma conta ainda? Cadastre-se aqui!</a>

    </div>
   </div>
   </>
  )
}

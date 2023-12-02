import { useContext } from 'react';
import styles from '@components/Header/styles.module.scss'
import Link from "next/link";
import Image from 'next/image'
import { FiLogOut } from 'react-icons/fi'
import logoDesktop from '@public/logo-desktop.png'
import { AuthContext } from '@contexts/AuthContext'

export function Header(){
  const { signOut }  = useContext(AuthContext);  

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src={logoDesktop} alt="Pizzaria"
            width={190} height={60}
          />
        </Link>

        <nav className={styles.headerMenuNav}>
          <Link href="/category">
            <span>
              Categoria
            </span>
            
          </Link>
          <Link href="/product">
            <span>
              Cardápio
            </span>
          </Link>
          <button onClick={signOut} >
            <FiLogOut color='#FFF' size={24} />
          </button>
        </nav>

      </div>
    </header>
  )
}
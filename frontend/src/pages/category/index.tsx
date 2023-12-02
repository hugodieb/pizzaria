import Head from "next/head";
import { Header } from "@components/Header";
import { withSSRAuth } from "@utils/withSSRAuth";
import styles from '@pages/category/styles.module.scss'
import { FormEvent, useState } from "react";
import { setupAPIClient } from "@services/api";
import { toast } from "react-toastify";

export default function Category(){
  const [ name, setName ] = useState('');

  async function handleRegisterCategory(event: FormEvent){
    event.preventDefault();

    if(name === ''){
      return;
    }
    
    const apiClient = setupAPIClient();
    await apiClient.post("/category", {
      name: name
    })

    toast.success("Categoria salvo com sucesso.");
    setName('');

  }


  return(
    <>
    <Head>
      <title>
        Nova Categoria - Pizzafun
      </title>
    </Head>
    <div>
      <Header />

      <main className={styles.container}>
        <h1>
          Cadastrar Categorias
        </h1>

        <form className={styles.form}
          onSubmit={handleRegisterCategory}
        >
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={styles.btnAddCategory} 
            type="submit"
          >
            Cadastrar
          </button>
        </form>

      </main>

    </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
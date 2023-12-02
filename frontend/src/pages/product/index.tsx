import { withSSRAuth } from "@utils/withSSRAuth";
import Head from "next/head";
import { Header } from '@components/Header/';
import styles from '@pages/product/styles.module.scss';
import { GrAdd } from 'react-icons/gr'
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function Product(){

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files){
      return;
    }

    const image = e.target.files[0];

    if(!image){
      return;
    }

    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }

  }

  return(
    <>
    <Head>
      <title>
        Produto Pizzafun 
      </title>
    </Head>

    <div>
      <Header />

      <main
        className={styles.container}
      >
        <h1> Novo Produto </h1>

        <form
         className={styles.form}
        >

          <label className={styles.labelAvatar}>
            <span>
              <GrAdd size={20} color="#FFF" />              
            </span>

            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
            />

            {avatarUrl && (
              <Image
                className={styles.preview}
                src={avatarUrl}
                alt="Produto"
                width={250}
                height={250}
              />  
            )}

          </label>

          <select         
          >
            <option 
            >
              Bebidas
            </option>
          </select>

          <input
           type="text"
           className={styles.input}
           placeholder="Digite o nome do produto"
          />

          <input
            type="text"
            className={styles.input}
            placeholder="Preço do produto"
          />

          <textarea
            className={styles.input}            
            placeholder="Descrição do produto..."
          />

          <button
            type="submit"
            className={styles.buttonAddProduct}
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
import { withSSRAuth } from "@utils/withSSRAuth";
import Head from "next/head";
import { Header } from '@components/Header/';
import styles from '@pages/product/styles.module.scss';
import { GrAdd } from 'react-icons/gr'
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPIClient } from "@services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}


export default function Product({categoryList}: CategoryProps){
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

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

  function handleChangeCategory(event){
    setCategorySelected(event.target.value);
  }

  async function handleSaveProduct(event: FormEvent){
    event.preventDefault();

    try {
      
      const data = new FormData();

      if(name === '' || price === '' || description === '' || imageAvatar === null){
        toast.error("Preencha todos os campos.")
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('file', imageAvatar);
      data.append('category_id', categories[categorySelected].id);

      const apiClient = setupAPIClient();
      await apiClient.post('/product', data);

      toast.success("Produto cadastrado com sucesso!")

    } catch (error) {
      toast.error("Oops...erro ao cadastrar um novo produto.")
      console.log(error);
    }

    setName('');
    setPrice('');
    setDescription('');
    setImageAvatar(null);
    setAvatarUrl('');
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
         onSubmit={handleSaveProduct}
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
                width={1}
                height={1}
              />  
            )}

          </label>

          <select
            value={categorySelected}
            onChange={handleChangeCategory}          
          >
            {categories.map((item, index) => {
              return(
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <input
           type="text"
           className={styles.input}
           placeholder="Digite o nome do produto"
           value={name}
           onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className={styles.input}
            placeholder="Preço do produto"
            value={price}
           onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            className={styles.input}            
            placeholder="Descrição do produto..."
            value={description}
           onChange={(e) => setDescription(e.target.value)}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/category'); 

  return {
    props: {
      categoryList: response.data
    }
  }
})
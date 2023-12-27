import { withSSRAuth } from "@utils/withSSRAuth"
import Head from "next/head"
import styles from '@pages/dashboard/styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { Header } from '@components/Header/'
import { setupAPIClient } from '@services/api'
import { type } from "os"
import { useState } from "react"
import Modal from 'react-modal'
import { types } from "util"
import { ModalOrder } from "@components/ModalOrder"

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null
}

interface dashProps{
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }  
}

export default function Dashboard({orders}: dashProps){
  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
    
    const apiClient = setupAPIClient();  

    const response = await apiClient.get('/api/order/detail', {
      params:{
        order_id: id
      }
    })   
    
    setModalItem(response.data);
    setModalVisible(true);

  }

  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient();
    apiClient.put('/api/order/finish', {
      order_id: id,
    })

    const response = await apiClient.get('/api/orders');

    setOrderList(response.data)
    setModalVisible(false);

  }

  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/api/orders');

    setOrderList(response.data);
  }

  Modal.setAppElement('#__next')

  return(
    <>
    <Head>
      <title>
        Dashboard Pizzafun 
      </title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>

          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw 
                size={25} color="#3fffa3"
              />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado....
              </span>
            )}

            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}>
                  </div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}           
          </article>

        </main>

        { modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}

      </div>    
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/api/orders');

  return {
    props: {
      orders: response.data
    }
  }
})
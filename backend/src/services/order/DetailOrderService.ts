import prismaClient from "../../prisma";

interface OrderRequest{
  order_id: string
}

class DetailOrderService{
  async execute({order_id}: OrderRequest){

    const detailOrder = await prismaClient.item.findMany({
      where: {
        id: order_id,
      },
      include: {
        product: true,
        order: true,
      }
    });

    return detailOrder;

  }
}

export { DetailOrderService }
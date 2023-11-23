import prismaClient from "../../prisma";

interface CategoryRequest{
  category_id: string
}

class ListProductByCategoryService{
  async execute({category_id}: CategoryRequest){
    
    const listProductByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id
      }
    })
    
    return listProductByCategory
  }
}

export { ListProductByCategoryService }
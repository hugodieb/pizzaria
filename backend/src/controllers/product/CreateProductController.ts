import { Request, Response }  from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController{
  async handle(req: Request, res: Response){

    const { name, price, description, banner, category_id } = req.body 

    const createProduct = new CreateProductService();

    if(!req.file){
      throw new Error("Tem que carregar a foto do produto.")
    }else{

      const { originalname, filename } = req.file;

      console.log(originalname, " ", filename)

      const product = await createProduct.execute({
        name,
        price,
        description,
        banner: '',
        category_id
      });
  
      return res.json(product);
    }  
  }
}

export { CreateProductController }
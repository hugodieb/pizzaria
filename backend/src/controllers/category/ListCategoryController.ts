import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';

class ListCategoryController{
  async handle(req: Request, res: Response){

    const listCategory = new ListCategoryService();

    const categories = await listCategory.execute();

    return res.json(categories);

  }
}

export { ListCategoryController }
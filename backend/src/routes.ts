import { Router } from "express";
import multer from "multer";

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from '../src/midlewares/isAuthenticated';
import { CreateCategoryController } from '../src/controllers/category/CreateCategoryController';
import { ListCategoryController } from '../src/controllers/category/ListCategoryController';
import { CreateProductController } from '../src/controllers/product/CreateProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';


import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./images"));

router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/whoamy', isAuthenticated, new DetailUserController().handle);

// Rotas Category

router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryController().handle);

// Rotas Product
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/products', isAuthenticated, new ListProductByCategoryController().handle);

//Rotas de Order
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);


export { router }; 
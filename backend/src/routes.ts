import { Router } from "express";
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from '../src/midlewares/isAuthenticated';
import { CreateCategoryController } from '../src/controllers/category/CreateCategoryController';

const router = Router();

router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/whoamy', isAuthenticated, new DetailUserController().handle);

// Rotas Category

router.post('/category', isAuthenticated, new CreateCategoryController().handle);

export { router }; 
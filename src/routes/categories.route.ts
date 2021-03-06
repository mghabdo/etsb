import { Router } from 'express';
import CategoriesController from '@controllers/categories.controller';
import { Routes } from '@interfaces/routes.interface';

class CategoriesRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoriesController.getCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.categoriesController.getCategoryById);
    this.router.post(`${this.path}`, this.categoriesController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, this.categoriesController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.categoriesController.deleteCategory);
  }
}

export default CategoriesRoute;

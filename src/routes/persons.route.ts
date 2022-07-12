import { Router } from 'express';
import PersonsController from '@controllers/persons.controller';
import { CreatePersonDto } from '@dtos/persons.dto';
import { Routes } from '@interfaces/routes.interface';

class PersonsRoute implements Routes {
  public path = '/persons';
  public router = Router();
  public personsController = new PersonsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.personsController.getPersons);
    this.router.get(`${this.path}/:id(\\d+)`, this.personsController.getPersonById);
    this.router.post(`${this.path}`, this.personsController.createPerson);
    this.router.put(`${this.path}/:id(\\d+)`, this.personsController.updatePerson);
    this.router.delete(`${this.path}/:id(\\d+)`, this.personsController.deletePerson);
  }
}

export default PersonsRoute;

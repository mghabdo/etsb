import { NextFunction, Request, Response } from 'express';
import { CreatePersonDto } from '@dtos/persons.dto';
import { Person } from '@interfaces/persons.interface';
import personService from '@services/persons.service';

class PersonsController {
  public personService = new personService();

  public getPersons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPersonsData: Person[] = await this.personService.findAllPerson();

      res.status(200).json({ data: findAllPersonsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPersonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personId = Number(req.params.id);
      const findOnePersonData: Person = await this.personService.findPersonById(personId);

      res.status(200).json({ data: findOnePersonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personData: CreatePersonDto = req.body;
      const createPersonData: Person = await this.personService.createPerson(personData);

      res.status(201).json({ data: createPersonData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personId = Number(req.params.id);
      const personData: CreatePersonDto = req.body;
      const updatePersonData: Person = await this.personService.updatePerson(personId, personData);

      res.status(200).json({ data: updatePersonData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personId = Number(req.params.id);
      const deletePersonData: Person = await this.personService.deletePerson(personId);

      res.status(200).json({ data: deletePersonData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PersonsController;

import DB from '@databases';
import { CreatePersonDto } from '@dtos/persons.dto';
import { HttpException } from '@exceptions/HttpException';
import { Person } from '@interfaces/persons.interface';
import { isEmpty } from '@utils/util';

class PersonService {
  public persons = DB.Persons;

  public async findAllPerson(): Promise<Person[]> {
    const allPerson: Person[] = await this.persons.findAll();
    return allPerson;
  }

  public async findPersonById(personId: number): Promise<Person> {
    if (isEmpty(personId)) throw new HttpException(400, "You're not personId");

    const findPerson: Person = await this.persons.findByPk(personId);
    if (!findPerson) throw new HttpException(409, "You're not person");

    return findPerson;
  }

  public async createPerson(personData: CreatePersonDto): Promise<Person> {
    if (isEmpty(personData)) throw new HttpException(400, "You're not personData");

    const findPerson: Person = await this.persons.findOne({ where: { email: personData.email } });
    if (findPerson) throw new HttpException(409, `You're email ${personData.email} already exists`);

    const createPersonData: Person = await this.persons.create({ ...personData });
    return createPersonData;
  }

  public async updatePerson(personId: number, personData: CreatePersonDto): Promise<Person> {
    if (isEmpty(personData)) throw new HttpException(400, "You're not personData");

    const findPerson: Person = await this.persons.findByPk(personId);
    if (!findPerson) throw new HttpException(409, "You're not person");

    await this.persons.update({ ...personData }, { where: { id: personId } });

    const updatePerson: Person = await this.persons.findByPk(personId);
    return updatePerson;
  }

  public async deletePerson(personId: number): Promise<Person> {
    if (isEmpty(personId)) throw new HttpException(400, "You're not personId");

    const findPerson: Person = await this.persons.findByPk(personId);
    if (!findPerson) throw new HttpException(409, "You're not person");

    await this.persons.destroy({ where: { id: personId } });

    return findPerson;
  }
}

export default PersonService;

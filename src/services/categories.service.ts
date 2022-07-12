import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateCategoryDto } from '@dtos/categories.dto';
import { HttpException } from '@exceptions/HttpException';
import { Category } from '@interfaces/categories.interface';
import { isEmpty } from '@utils/util';
import { ProductModel } from '@/models/products.model';

class CategoryService {
  public categories = DB.Categories;

  public async findAllCategory(): Promise<Category[]> {
    const allCategory: Category[] = await this.categories.findAll({ include: ProductModel });
    return allCategory;
  }

  public async findCategoryById(productId: number): Promise<Category> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findCategory: Category = await this.categories.findByPk(productId);
    if (!findCategory) throw new HttpException(409, "You're not product");

    return findCategory;
  }

  public async createCategory(productData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findCategory: Category = await this.categories.findOne({ where: { name: productData.name } });
    if (findCategory) throw new HttpException(409, `You're name ${productData.name} already exists`);

    const createCategoryData: Category = await this.categories.create({ ...productData });
    return createCategoryData;
  }

  public async updateCategory(productId: number, productData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findCategory: Category = await this.categories.findByPk(productId);
    if (!findCategory) throw new HttpException(409, "You're not product");

    await this.categories.update({ ...productData }, { where: { id: productId } });

    const updateCategory: Category = await this.categories.findByPk(productId);
    return updateCategory;
  }

  public async deleteCategory(productId: number): Promise<Category> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findCategory: Category = await this.categories.findByPk(productId);
    if (!findCategory) throw new HttpException(409, "You're not product");

    await this.categories.destroy({ where: { id: productId } });

    return findCategory;
  }
}

export default CategoryService;

import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import { isEmpty } from '@utils/util';
import { CategoryModel } from '@/models/categories.model';

class ProductService {
  public products = DB.Products;

  public async findAllProduct(): Promise<Product[]> {
    const allProduct: Product[] = await this.products.findAll({ include: CategoryModel });
    return allProduct;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "You're not product");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.products.findOne({ where: { name: productData.name } });
    if (findProduct) throw new HttpException(409, `You're name ${productData.name} already exists`);

    const createProductData: Product = await this.products.create({ ...productData });
    return createProductData;
  }

  public async updateProduct(productId: number, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "You're not product");

    await this.products.update({ ...productData }, { where: { id: productId } });

    const updateProduct: Product = await this.products.findByPk(productId);
    return updateProduct;
  }

  public async deleteProduct(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "You're not product");

    await this.products.destroy({ where: { id: productId } });

    return findProduct;
  }
}

export default ProductService;

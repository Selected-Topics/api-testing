import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Creates a new product in the database
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
  
    return createdProduct.save();
  }
  /*
    This function takes a DTO object and saves a new product to the database.
    It returns the saved product document.
  */

  // Retrieves all products from the database
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Finds a product by its ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
  /*
    This function searches for a product by its unique identifier.
    If the product is not found, it throws a NotFoundException.
    Otherwise, it returns the product document.
  */

  // Updates a product by its ID
  async update(
    id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  // Removes a product by its ID
  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  // Finds products by category
  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }
} 
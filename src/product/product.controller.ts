import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ProductRto } from './rtos/product.rto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return ProductRto.fromDocument(product);
  }

  @Get()
  async findAll(@Query('category') category?: string) {
    const products = category
      ? await this.productService.findByCategory(category)
      : await this.productService.findAll();
    return ProductRto.fromDocuments(products);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return ProductRto.fromDocument(product);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return ProductRto.fromDocument(product);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
  }
}

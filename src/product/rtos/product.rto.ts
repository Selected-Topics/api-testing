import { Product } from '../product.schema';

export class ProductRto {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public category: string,
    public images: string[],
    public isActive: boolean,
    public rating: number,
    public discount: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromDocument(document: Product): ProductRto {
    return new ProductRto(
      document._id.toString(),
      document.name,
      document.description,
      document.price,
      document.stock,
      document.category,
      document.images,
      document.isActive,
      document.rating,
      document.discount,
      document.createdAt,
      document.updatedAt,
    );
  }

  static fromDocuments(documents: Product[]): ProductRto[] {
    return documents.map((doc) => ProductRto.fromDocument(doc));
  }
} 
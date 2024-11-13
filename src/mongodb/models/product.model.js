import { productSchema } from '../schemas/product.schema.js';

// DB 접근만 한다.
// 모델은 비즈니스 서비스 로직, http 통신 로직을 몰라야한다.
export class ProductModel {
  constructor(connection) {
    this.model = connection.model('Product', productSchema);
  }

  getCount = async keyword => {
    const searchOption = keyword ? { $text: { $search: keyword } } : {};

    return await this.model.find(searchOption).countDocuments();
  };

  findMany = async ({ orderBy, page, pageSize, keyword }) => {
    const sortOption = { createdAt: orderBy === 'recent' ? 'desc' : 'asc' };
    const searchOption = keyword ? { $text: { $search: keyword } } : {};

    return await this.model
      .find(searchOption)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  };

  findById = async id => {
    return this.model.findById(id);
  };

  create = async body => {
    return await this.model.create(body);
  };

  save = async product => {
    return await product.save();
  };

  deleteById = async id => {
    return await this.model.findByIdAndDelete(id);
  };

  deleteMany = async option => {
    return await this.model.deleteMany(option);
  };

  insertMany = async data => {
    return await this.model.insertMany(data);
  };
}

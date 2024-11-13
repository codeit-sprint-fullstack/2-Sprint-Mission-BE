/**
 * layered architecture(3-layer)
 * controller, service, repository(=model)
 *
 * controller: http 통신만 함.
 * service: 비즈니스 로직이 실행됨.
 *          비즈니스 로직: 실제 api이 동작이 발생하는 부분
 * repository: db 접근만 함
 *
 * flow
 * 1. 사용자가 api 호출
 * 2. controller가 이 요청을 받음
 * 3. controller는 req params, query, body 등을 받아서 service에 넘김.
 * 4. service는 controller로부터 받은 정보를 가지고 행동을 하고, db 관련 처리를 해야하면 repository를 호출함.
 * 5. repository는 넘겨받은 정보를 바탕으로 db에 접근해서 결과를 service에 반환
 *
 * MVC pattern(model, view, controller)에서 진화해 만들어진 architecture
 */
export class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  // getProducts = async ({ orderBy, page, pageSize, keyword }) => {
  //   return await this.productModel.findMany({
  //     orderBy,
  //     page,
  //     pageSize,
  //     keyword,
  //   });
  // };

  // getCount = async (keyword) => {
  //   return await this.productModel.getCount(keyword);
  // };

  getProductsAndCount = async ({ orderBy, page, pageSize, keyword }) => {
    const list = await this.productModel.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    const totalCount = await this.productModel.getCount(keyword);

    return { list, totalCount };
  };

  getProductById = async id => {
    return await this.productModel.findById(id);
  };

  postProduct = async body => {
    return await this.productModel.create(body);
  };

  patchProductById = async (id, body) => {
    let product = await this.productModel.findById(id);
    if (!product) return;

    Object.keys(body).forEach(k => {
      product[k] = body[k];
    });
    return await this.productModel.save(product);
  };

  deleteProductById = async id => {
    return await this.productModel.deleteById(id);
  };
}

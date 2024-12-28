import { S3Service } from '@/s3/s3.service';
import { ProductDTO } from '@/types/product.types';

async function filterProductInfo(s3Service: S3Service, product: ProductDTO) {
  const { productImages, ownerId, owner, isDeletedAt, ...restProductData } =
    product;
  const { id, name, ...restOwnerData } = owner;
  const responseOwner = { id, name };
  const filterImagePromise = product.productImages.map(async (productImage) => {
    const { s3key, id, ...restProductImageData } = productImage;
    const imageUrl = await s3Service.generatePresignedUrl(s3key);
    const responseProductImage = { id, imageUrl };
    return responseProductImage;
  });
  const responseImages = await Promise.all(filterImagePromise);
  const responseProduct = {
    ...restProductData,
    owner: responseOwner,
    images: responseImages,
  };
  return responseProduct;
}

export default filterProductInfo;

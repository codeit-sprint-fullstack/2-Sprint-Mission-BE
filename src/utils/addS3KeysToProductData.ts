import { S3Service } from '@/s3/s3.service';
import { CreateProductDTO } from '@/types/product.types';

async function addS3KeysToProductData(
  s3Service: S3Service,
  productData: CreateProductDTO,
): Promise<CreateProductDTO> {
  const { files, ownerId, ...restProductData } = productData;
  const uploadPromises = files.map((file) => {
    const s3key = `${ownerId}/${file.originalname}`;
    return s3Service.uploadPublicFile(file.buffer, s3key);
  });
  const s3keys = await Promise.all(uploadPromises);

  const filteredProductData = {
    ...restProductData,
    ownerId,
    s3keys,
  };
  return filteredProductData;
}
export default addS3KeysToProductData;

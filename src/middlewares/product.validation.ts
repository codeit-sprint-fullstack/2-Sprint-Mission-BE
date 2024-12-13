import { assert } from 'superstruct';
import { RequestHandler } from '#types/request.type.js';
import { CreateProduct, PatchProduct } from '#utils/struct.js';

const validateProduct: RequestHandler<{ body: { data: string; tags: string[]; file?: object } }> = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  switch (req.method) {
    case 'POST':
      assert(req.body, CreateProduct);
      if (req.body?.tags?.length < 1 || req.body?.tags?.length > 5) throw new Error('invalid tags length');
      break;
    case 'PATCH':
      assert(req.body, PatchProduct);
      if (req.body?.tags?.length < 1 || req.body?.tags?.length > 5) throw new Error('invalid tags length');
      break;
  }
  req.body.file = req.file;

  next();
};

export default validateProduct;

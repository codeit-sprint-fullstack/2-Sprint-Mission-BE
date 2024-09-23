import { Prisma } from "@prisma/client";

/*
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
*/

function asyncHandler(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (e) {
      if (res.headersSent) {
        // 이미 응답이 전송된 경우에는 next로 에러를 전달하여 Express가 기본 처리를 하도록 함
        return next(e); 
      }      
      if (
        e.name === 'StructError' ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        res.status(404).send({message: 'Resource not found with the given ID'});
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}
export default asyncHandler;
import pkg from "@prisma/client"; // Default import
const { PrismaClientValidationError, PrismaClientUnknownRequestError } = pkg; // 필요한 클래스 구조 분해
export const asyncHandler = (handler) => {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof PrismaClientUnknownRequestError &&
        e.code === "P2025"
      ) {
        res.status(404).send({ message: NOT_FOUND_MESSAGE });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
};
export const checkAndConvertPageParams = (query) => {
  const { page = "0", pageSize = "10", order = "oldest", keyword = "" } = query;
  const parsedPage = parseInt(page);
  const parsedPageSize = parseInt(pageSize);

  if (isNaN(parsedPage) || !Number.isInteger(parsedPage))
    throw new Error("page는 정수여야합니다.");
  else if (parsedPage < 0) throw new Error("page는 0 이상이여야 합니다.");

  if (isNaN(parsedPageSize) || !Number.isInteger(parsedPageSize))
    throw new Error("pageSize는 정수여야합니다.");
  else if (parsedPageSize <= 0)
    throw new Error("pageSize는 1 이상이어야 합니다.");

  query.page = parsedPage;
  query.pageSize = parsedPageSize;
  return query;
};

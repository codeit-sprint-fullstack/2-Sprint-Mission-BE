import { StructError } from 'superstruct';
import { MESSAGES } from '../../constants.js';
import { CastError, TypeError, ValidationError } from './error.js';

// handler를 인자로 받아서 오류처리 해주는 함수
export function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof ValidationError || e instanceof TypeError) {
        res.status(400).json({ message: e.message });
      } else if (e instanceof StructError || e instanceof CastError) {
        res.status(404).json({ message: e.message });
      } else {
        res.status(500).json({ message: e.message });
      }
    }
  };
}

import { ModelBase } from '#types/dtos.type.js';
import MESSAGES from '#utils/constants/messages.js';
import { NotFound } from '#utils/http-errors.js';

export default function assertExist<T extends ModelBase>(target: T | null): asserts target is T {
  if (target === null) {
    throw new NotFound(MESSAGES.NOT_FOUND);
  }
}

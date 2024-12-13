import { getStorage } from '#middlewares/asyncLocalStorage.js';
import { UserRepository } from '#repositories/user.repository.js';
import { UserDTO } from '#types/dtos.type.js';
import assertExist from '#utils/assertExist.js';
import compareExp from '#utils/compareExp.js';
import MESSAGES from '#utils/constants/messages.js';
import createToken from '#utils/createToken.js';
import filterSensitiveData from '#utils/filterSensitiveData.js';
import hashingPassword from '#utils/hashingPassword.js';
import { Unauthorized } from '#utils/http-errors.js';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  getUserById = async (id: string) => {
    const user = await this.userRepository.findById(id);
    assertExist(user);

    return filterSensitiveData(user);
  };

  createUser = async (body: UserDTO) => {
    const exist = await this.userRepository.findByEmail(body.email);
    if (exist) return true;

    const user = await this.userRepository.create(body);

    return filterSensitiveData(user);
  };

  signIn = async (body: UserDTO) => {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) {
      throw new Unauthorized(MESSAGES.WRONG_CREDENTIAL);
    }

    const { salt, password } = user;
    const hashedPassword = hashingPassword(body.password, salt);

    if (hashedPassword != password) {
      throw new Unauthorized(MESSAGES.WRONG_CREDENTIAL);
    }

    const accessToken = createToken(user, 'access');
    // NOTE refreshToken 발급 후 최근 발급된 토큰을 유저 정보에 저장
    const refreshToken = createToken(user, 'refresh');
    user.refreshToken = refreshToken;
    await this.userRepository.update(user.id, user);

    return { user: { ...filterSensitiveData(user), accessToken }, refreshToken };
  };

  getNewToken = async () => {
    const storage = getStorage();
    const { userId, exp, refreshToken } = storage;

    const user = await this.userRepository.findById(userId);
    assertExist(user);
    if (user.refreshToken !== refreshToken) {
      throw new Unauthorized(MESSAGES.INVALID_TOKEN);
    }

    // NOTE 리프레시 토큰의 남은 시간이 2시간 이내일경우
    const timeRemaining = compareExp(exp);
    if (timeRemaining < 3600 * 2) {
      // NOTE 새 리프레시 토큰을 발급하고 이를 업데이트
      const refreshToken = createToken(user, 'refresh');
      user.refreshToken = refreshToken;
      await this.userRepository.update(user.id, user);
    }

    const accessToken = createToken(user, 'access');

    return { ...filterSensitiveData(user), accessToken };
  };
}

import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpStatus from "../httpStatus.js";

async function hashingPassword(password) { // 함수 추가
  return bcrypt.hash(password, 10); // 2^10 번 hash
}

function createToken(user, type) {
  const payload = { userId: user.id };
  const options = {
    expiresIn: type === 'refresh' ? '1w' : '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function filterSensitiveUserData(user) {
  const { password, encryptedPassword, refreshToken, ...rest } = user;
  return rest;
}

async function createUser(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password); // 해싱 과정 추가
  const createdUser = await userRepository.save({ ...filterSensitiveUserData(user), encryptedPassword: hashedPassword }); // password 추가
  return filterSensitiveUserData(createdUser);
}

async function verifyPassword(inputPassword, savedPassword) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword); // 변경
  if (!isValid) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('User not found.');
    error.code = HttpStatus.NOT_FOUND;
    throw error;
  }
  verifyPassword(password, user.encryptedPassword);
  return filterSensitiveUserData(user);
}

async function getUserById(id) {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error('Not Found');
    error.code = 404;
    throw error;
  }

  return filterSensitiveUserData(user);
}

async function updateUser(id, data) {
  return await userRepository.update(id, data);
}

async function refreshToken(userId, refreshToken) {
  const user = await userRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  const accessToken = createToken(user); // 변경
  const newRefreshToken = createToken(user, 'refresh'); // 추가
  return { accessToken, newRefreshToken };
}

async function oauthCreateOrUpdate(provider, providerId, email, nickname) {
  const user = await userRepository.createOrUpdate(provider, providerId, email, nickname);
  return filterSensitiveUserData(user);
}

export default {
  hashingPassword,
  createUser,
  getUser,
  createToken,
  updateUser,
  refreshToken,
  getUserById,
  oauthCreateOrUpdate,
};

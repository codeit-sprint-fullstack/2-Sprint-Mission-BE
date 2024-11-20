import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function hashingPassword(password) {
  //비밀번호 해싱
  return bcrypt.hash(password, 10);
}

//유저 회원가입
async function createUser(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error("User already exists");
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password); // 해싱 과정 추가
  const createdUser = await userRepository.save({
    ...user,
    password: hashedPassword,
  }); // password 추가
  return filterSensitiveUserData(createdUser);
}

function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}

// 유저 로그인
async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }
  verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function verifyPassword(inputPassword, savedPassword) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword); // 변경
  if (!isValid) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }
}
async function updateUser(id, data) {
  return await userRepository.update(id, data);
}

function createToken(user, type) {
  const payload = { userId: user.id };
  const options = {
    expiresIn: type === "refresh" ? "2w" : "9h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

async function refreshToken(userId, refreshToken) {
  const user = await userRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }
  const accessToken = createToken(user); // 변경
  const newRefreshToken = createToken(user, "refresh"); // 추가
  return { accessToken, newRefreshToken }; // 변경
}

async function getUserById(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.code = 404;
    throw error;
  }
  return filterSensitiveUserData(user);
}

async function getUserFavorites(userId) {
  const favorites = await userRepository.findFavoritesByUserId(userId);
  return favorites.map((favorite) => ({
    id: favorite.product.id,
    name: favorite.product.name,
    description: favorite.product.description,
    price: favorite.product.price,
    favoriteCount: favorite.product.favoriteCount,
    images: favorite.product.images,
    // 추가적인 상품 정보가 필요하다면 여기에 더 추가
  }));
}

export default {
  createUser,
  getUser,
  updateUser,
  createToken,
  refreshToken,
  getUserById,
  getUserFavorites,
};

import prisma from "../config/prisma.js";

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function save(user) {
  return prisma.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    },
  });
}

async function update(id, data) {
  return prisma.user.update({
    where: {
      id,
    },
    data: data,
  });
}

async function createOrUpdate(provider, providerId, email, nickname) {
  return prisma.user.upsert({
    where: { provider, providerId },
    update: { email, nickname },
    create: { provider, providerId, email, nickname },
  });
}
async function findFavoritesByUserId(userId) {
  return await prisma.favorite.findMany({
    where: { userId },
    include: {
      product: true, // 좋아요한 상품 정보 포함
    },
  });
}
export default {
  findById,
  findByEmail,
  save,
  update,
  createOrUpdate,
  findFavoritesByUserId,
};

import prisma from '../config/prisma.js';

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email) {
  return await prisma.User.findUnique({
    where: {
      email,
    },
  });
}

async function save({ password, ...user }) {
  return prisma.user.create({
    data: { ...user },
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

export default {
  findById,
  findByEmail,
  save,
  update,
  createOrUpdate,
}

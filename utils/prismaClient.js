import { PrismaClient } from "@prisma/client";

let prisma
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 개발환경에서 
  // PrismaClient 인스턴스를 매번 새로 생성하게 되면 Too many connections 오류가 발생할 수 있음
  // PrismaClient 인스턴스를 global 객체에 저장하여, 
  // 서버가 재시작되더라도 이전에 생성된 PrismaClient 인스턴스를 재사용
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
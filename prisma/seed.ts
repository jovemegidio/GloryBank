import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash("Demo@123456", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@glorybank.com" },
    update: {},
    create: {
      name: "Usuário Demo",
      email: "demo@glorybank.com",
      cpfCnpj: "12345678901",
      phone: "11999999999",
      passwordHash,
      isActive: true,
    },
  });

  console.log("✅ Demo user ready:");
  console.log("   Email:  demo@glorybank.com");
  console.log("   Senha:  Demo@123456");
  console.log(`   ID:     ${demoUser.id}`);
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

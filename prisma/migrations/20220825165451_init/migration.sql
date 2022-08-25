-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project_Employee" ALTER COLUMN "createdAt" DROP NOT NULL;

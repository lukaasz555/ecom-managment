/*
  Warnings:

  - You are about to drop the `StaffAccountActivation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffAccountActivation" DROP CONSTRAINT "StaffAccountActivation_staffId_fkey";

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "activatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "StaffAccountActivation";

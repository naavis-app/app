/*
  Warnings:

  - A unique constraint covering the columns `[profile_pic]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_pic_key" ON "User"("profile_pic");

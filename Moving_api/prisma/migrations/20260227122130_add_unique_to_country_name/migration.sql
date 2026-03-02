/*
  Warnings:

  - A unique constraint covering the columns `[countryName]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Country_countryName_key` ON `Country`(`countryName`);

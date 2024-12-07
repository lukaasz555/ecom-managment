-- CreateTable
CREATE TABLE "StaffAccountActivation" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "StaffAccountActivation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffAccountActivation_staffId_key" ON "StaffAccountActivation"("staffId");

-- AddForeignKey
ALTER TABLE "StaffAccountActivation" ADD CONSTRAINT "StaffAccountActivation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

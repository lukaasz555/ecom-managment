-- CreateTable
CREATE TABLE "StaffPasswordRecovery" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "StaffPasswordRecovery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staffId" ON "StaffPasswordRecovery"("staffId");

-- AddForeignKey
ALTER TABLE "StaffPasswordRecovery" ADD CONSTRAINT "StaffPasswordRecovery_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

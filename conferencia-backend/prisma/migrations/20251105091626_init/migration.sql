-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "rg" TEXT,
    "gender" TEXT,
    "race" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "delegate_type" TEXT,
    "organization" TEXT,
    "position" TEXT,
    "accessCode" TEXT NOT NULL,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "registrations_cpf_key" ON "registrations"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_accessCode_key" ON "registrations"("accessCode");

-- CreateTable
CREATE TABLE "Reflektion" (
    "id" SERIAL NOT NULL,
    "namn" TEXT NOT NULL,
    "meddelande" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reflektion_pkey" PRIMARY KEY ("id")
);

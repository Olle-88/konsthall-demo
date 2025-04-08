-- CreateTable
CREATE TABLE "Konstverk" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "konstnar" TEXT NOT NULL,
    "beskrivning" TEXT NOT NULL,
    "bildUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Konstverk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "creatorCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastMilestoneNotified" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "donatorId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorLeaderboard" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatorLeaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonatorLeaderboard" (
    "id" TEXT NOT NULL,
    "donatorId" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonatorLeaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_creatorCode_key" ON "Creator"("creatorCode");

-- CreateIndex
CREATE UNIQUE INDEX "Donator_name_key" ON "Donator"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorLeaderboard_creatorId_key" ON "CreatorLeaderboard"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "DonatorLeaderboard_donatorId_key" ON "DonatorLeaderboard"("donatorId");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donatorId_fkey" FOREIGN KEY ("donatorId") REFERENCES "Donator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorLeaderboard" ADD CONSTRAINT "CreatorLeaderboard_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonatorLeaderboard" ADD CONSTRAINT "DonatorLeaderboard_donatorId_fkey" FOREIGN KEY ("donatorId") REFERENCES "Donator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

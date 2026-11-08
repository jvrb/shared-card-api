-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "finalNumberCard" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_finalNumberCard_key" ON "card"("finalNumberCard");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

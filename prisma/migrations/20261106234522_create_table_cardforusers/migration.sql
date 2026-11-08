-- CreateTable
CREATE TABLE "users_for_card" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "users_for_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_for_card" ADD CONSTRAINT "users_for_card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_for_card" ADD CONSTRAINT "users_for_card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

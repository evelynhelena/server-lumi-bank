-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

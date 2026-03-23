-- CreateTable
CREATE TABLE "memories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "spotifyUrl" TEXT,
    "photos" TEXT[],
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "stripeSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "memories_slug_key" ON "memories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "memories_stripeSessionId_key" ON "memories"("stripeSessionId");

-- CreateTable
CREATE TABLE "Livros" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "paginas" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivrosUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "livroId" TEXT NOT NULL,
    "paginasLidas" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LivrosUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LivrosUser" ADD CONSTRAINT "LivrosUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivrosUser" ADD CONSTRAINT "LivrosUser_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

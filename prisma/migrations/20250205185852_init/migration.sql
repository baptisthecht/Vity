-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('MOVIE', 'LIVE', 'SERIES', 'OTHER');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stream_type" TEXT NOT NULL,
    "stream_id" INTEGER NOT NULL,
    "stream_icon" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "rating_5based" DOUBLE PRECISION NOT NULL,
    "added" INTEGER NOT NULL,
    "is_adult" BOOLEAN NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Live" (
    "id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stream_type" TEXT NOT NULL,
    "stream_id" INTEGER NOT NULL,
    "stream_icon" TEXT NOT NULL,
    "added" INTEGER NOT NULL,
    "is_adult" BOOLEAN NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Live_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "series_id" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "director" TEXT,
    "genre" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "last_modified" INTEGER NOT NULL,
    "rating" TEXT NOT NULL,
    "rating_5based" DOUBLE PRECISION NOT NULL,
    "backdrop_path" TEXT[],
    "youtube_trailer" TEXT NOT NULL,
    "episode_run_time" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "type" "CategoryType" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" SERIAL NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastMovieUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLiveUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeriesUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Live" ADD CONSTRAINT "Live_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

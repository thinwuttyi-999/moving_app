import { MovieType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  await prisma.movieDetail.deleteMany();
  await prisma.movie.deleteMany();       

  const moviesData = [
    {
      title: "Avengers",
      type: "MOVIE",
      poster: "https://picsum.photos/300/450?1",
      country: "Thai",
      detail: {
        description: "Action movie",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/avengers.mp4",
      },
    },
    {
      title: "Batman",
      type: "MOVIE",
      poster: "https://picsum.photos/300/450?2",
      country: "USA",
      detail: {
        description: "Superhero movie",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        downloadLink: "/movies/batman.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?3",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?4",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?5",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?6",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?7",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?8",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?9",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
    {
      title: "Kingdom",
      type: "SERIES",
      poster: "https://picsum.photos/300/450?10",
      country: "Korea",
      detail: {
        description: "Historical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadLink: "/movies/kingdom.mp4",
      },
    },
   
  ];

  for (const m of moviesData) {
    const country = await prisma.country.upsert({
      where: { countryName: m.country },
      update: {},
      create: { countryName: m.country },
    });

    const movie = await prisma.movie.create({
      data: {
        title: m.title,
        type: m.type as MovieType,
        poster: m.poster,
        countryId: country.id,
        detail: {
          create: m.detail,
        },
      },
    });

    console.log("Inserxted:", movie.title);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
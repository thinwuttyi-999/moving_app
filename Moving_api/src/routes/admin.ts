import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient, MovieType } from "@prisma/client";
import { verifyToken } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// ================= Admin Middleware =================
const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// ================= MOVIES =================

// Get all movies
router.get("/movies", verifyToken, verifyAdmin, async (_req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    include: { country: true, detail: true },
    orderBy: { id: "desc" },
  });
  res.json(movies);
});

// Create movie
router.post("/movies", verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  const { title, type, poster, countryName, description, videoUrl, downloadLink } = req.body;

  const country = await prisma.country.upsert({
    where: { countryName },
    update: {},
    create: { countryName },
  });

  const movie = await prisma.movie.create({
    data: {
      title,
      type: type as MovieType,
      poster,
      countryId: country.id,
      detail: { create: { description, videoUrl, downloadLink } },
    },
    include: { country: true, detail: true },
  });

  res.json(movie);
});

// Update movie
router.put("/movies/:id", verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);

  const { title, type, poster, countryName, description, videoUrl, downloadLink } = req.body;

  const movie = await prisma.movie.findUnique({ where: { id } });
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const country = await prisma.country.upsert({
    where: { countryName },
    update: {},
    create: { countryName },
  });

  const updatedMovie = await prisma.movie.update({
    where: { id },
    data: {
      title,
      type: type as MovieType,
      poster,
      countryId: country.id,
      detail: { update: { description, videoUrl, downloadLink } },
    },
    include: { country: true, detail: true },
  });

  res.json(updatedMovie);
});

// Delete movie
router.delete("/movies/:id", verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);

  await prisma.movieDetail.deleteMany({ where: { movieId: id } });
  await prisma.movie.delete({ where: { id } });

  res.json({ message: "Movie deleted" });
});

// ================= USERS =================

// Get all users
router.get("/users", verifyToken, verifyAdmin, async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, username: true, email: true, createdAt: true },
    orderBy: { id: "desc" },
  });
  res.json(users);
});

// Delete user
router.delete("/users/:id", verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);

  await prisma.user.delete({ where: { id } });
  res.json({ message: "User deleted" });
});

export { router};
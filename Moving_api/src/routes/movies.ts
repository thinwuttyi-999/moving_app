import express, { Request, Response } from "express";
import { PrismaClient, MovieType } from "@prisma/client";
import { verifyToken } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

// ================= GET ALL MOVIES (PUBLIC) =================
router.get("/", async (_req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      include: { country: true, detail: true },
      orderBy: { id: "desc" },
    });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});    

router.get("/search", async (req: Request, res: Response) => {
  try {
    const rawQuery = (req.query.query as string || "").trim();
    if (!rawQuery) return res.json([]);

    const query = rawQuery.replace(/[:;'"\\]/g, "").toLowerCase();

    const filteredTypes: MovieType[] = Object.values(MovieType).filter(t =>
      t.toLowerCase().includes(query)
    ) as MovieType[];

    const orConditions: any[] = [
      { title: { contains: query } },
      { country: { countryName: { contains: query } } }
    ];

    if (filteredTypes.length > 0) {
      orConditions.push({ type: { in: filteredTypes } });
    }

    const movies = await prisma.movie.findMany({
      where: { OR: orConditions },
      include: { country: true, detail: true },
      orderBy: { id: "desc" },
    });

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// ================= GET MOVIE DETAIL (PROTECTED) =================
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);

  if (isNaN(id)) return res.status(400).json({ msg: "Invalid movie ID" });

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { country: true, detail: true },
    });

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export { router };
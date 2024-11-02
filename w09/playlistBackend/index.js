// server.js

import express from "express";
import cors from "cors";
import {
  simulateDelay,
  simulateLoss,
  networkConditions,
} from "./networkMiddleware.js";

const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());

app.use(
  "/v2",
  simulateLoss(networkConditions),
  simulateDelay(networkConditions)
);

// app.use(simulateLoss(networkConditions));
app.use(simulateDelay(networkConditions));

let playlist = [
  { id: 1, artist: "Saya Gray", song: "DIZZY PPL BECOME BLURRY" },
  { id: 2, artist: "SBTRKT", song: "CLASSIC THEME" },
  { id: 3, artist: "Sally Oldfield", song: "Blue Water" },
];

let nextId = 4;

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

app.get("/v1/playlist", (req, res) => {
  res.json(shuffleArray(playlist));
});

app.get("/v2/playlist", (req, res) => {
  res.json(shuffleArray(playlist));
});

const playlistPost = (req, res) => {
  const { artist, song } = req.body;

  if (!artist || !song) {
    return res.status(400).json({ error: "Artist and song are required." });
  }

  const newTrack = { id: nextId++, artist, song };
  playlist.push(newTrack);
  res.status(201).json(newTrack);
};

app.post("/v1/playlist", playlistPost);
app.post("/v2/playlist", playlistPost);

const playlistDelete = (req, res) => {
  const trackId = parseInt(req.params.id, 10);
  const trackIndex = playlist.findIndex((track) => track.id === trackId);

  if (trackIndex === -1) {
    return res.status(404).json({ error: "Track not found." });
  }

  const deletedTrack = playlist.splice(trackIndex, 1);
  res.json(deletedTrack[0]);
};

app.delete("/v1/playlist/:id", playlistDelete);
app.delete("/v2/playlist/:id", playlistDelete);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

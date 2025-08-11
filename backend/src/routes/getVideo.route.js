import express from "express";
import { getVideo } from "../controllers/getVideo.controller.js"

const router = express.Router();

router.get('/info/:searchValue', getVideo);

export default router;
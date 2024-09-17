import express from "express";
import { getVideo } from "../controllers/getVideo.controller.js"

const router = express.Router();

router.get('/info', getVideo)

export default router;
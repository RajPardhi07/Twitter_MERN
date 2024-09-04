import express from 'express'
import { getNotifications } from '../controller/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);

router.delete("/", deleteNotifications);





export default router;
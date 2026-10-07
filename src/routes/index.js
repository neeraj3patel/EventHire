import { Router } from 'express';
import healthRoutes from './health.routes.js';
import requirementRoutes from './requirement.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/requirements', requirementRoutes);

export default router;

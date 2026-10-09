import { Router } from 'express';
import * as controller from '../controllers/requirement.controller.js';
import { validate } from '../middlewares/validate.js';
import { submitLimiter } from '../middlewares/rateLimiter.js';
import {
  createRequirementSchema, listRequirementsQuerySchema, idParamSchema,
} from '../validations/requirement.validation.js';

const router = Router();

// Static routes first so they are not captured by "/:id"
router.get('/meta/options', controller.options);
router.get('/stats', controller.stats);

router.post('/', submitLimiter, validate(createRequirementSchema, 'body'), controller.create);
router.get('/', validate(listRequirementsQuerySchema, 'query'), controller.list);
router.get('/:id', validate(idParamSchema, 'params'), controller.getById);

export default router;

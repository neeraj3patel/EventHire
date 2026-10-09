import * as service from '../services/requirement.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import {
  CATEGORY_VALUES, EVENT_TYPES, DATE_TYPES, PLANNER_SERVICES, PLANNING_STAGES,
  PERFORMER_TYPES, CREW_ROLES, EXPERIENCE_LEVELS,
} from '../constants/enums.js';

export const create = asyncHandler(async (req, res) => {
  const requirement = await service.createRequirement(req.validated.body);
  sendSuccess(res, { statusCode: 201, message: `${requirement.category} requirement created`, data: requirement });
});

export const list = asyncHandler(async (req, res) => {
  const { items, pagination } = await service.listRequirements(req.validated.query);
  sendSuccess(res, { message: 'Requirements fetched', data: items, meta: pagination });
});

export const getById = asyncHandler(async (req, res) => {
  const requirement = await service.getRequirementById(req.validated.params.id);
  sendSuccess(res, { message: 'Requirement fetched', data: requirement });
});

export const stats = asyncHandler(async (_req, res) => {
  sendSuccess(res, { message: 'Stats fetched', data: await service.getStats() });
});

// Lets the frontend build its selects/checkboxes from the server's source of truth.
export const options = (_req, res) =>
  sendSuccess(res, {
    message: 'Form options',
    data: {
      categories: CATEGORY_VALUES,
      eventTypes: EVENT_TYPES,
      dateTypes: DATE_TYPES,
      planner: { services: PLANNER_SERVICES, planningStages: PLANNING_STAGES },
      performer: { performerTypes: PERFORMER_TYPES },
      crew: { roles: CREW_ROLES, experienceLevels: EXPERIENCE_LEVELS },
    },
  });

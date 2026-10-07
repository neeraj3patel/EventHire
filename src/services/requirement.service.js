import { Requirement, REQUIREMENT_MODELS } from '../models/requirement.model.js';
import { CATEGORY_VALUES } from '../constants/enums.js';
import { ApiError } from '../utils/ApiError.js';

export const createRequirement = async (payload) => {
  const { category, details, ...basics } = payload;
  const Model = REQUIREMENT_MODELS[category];
  if (!Model) throw ApiError.badRequest(`Unsupported category: ${category}`);

  return Model.create({
    ...basics,
    endDate: basics.dateType === 'single' ? basics.startDate : basics.endDate,
    details,
  });
};

export const listRequirements = async ({ category, eventType, page, limit }) => {
  const filter = {};
  if (category) filter.category = category;
  if (eventType) filter.eventType = eventType;

  const [items, total] = await Promise.all([
    Requirement.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Requirement.countDocuments(filter),
  ]);

  return { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

export const getRequirementById = async (id) => {
  const doc = await Requirement.findById(id).lean();
  if (!doc) throw ApiError.notFound('Requirement not found');
  return doc;
};

export const getStats = async () => {
  const rows = await Requirement.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
  const stats = Object.fromEntries(CATEGORY_VALUES.map((c) => [c, 0]));
  rows.forEach((r) => { stats[r._id] = r.count; });
  return { ...stats, total: Object.values(stats).reduce((a, b) => a + b, 0) };
};

import AppError from "../utils/AppError.js";

export const validateSupplier = (req, res, next) => {
  const { name, country, reliabilityScore } = req.body;

  if (!name || !country) {
    return next(new AppError("Supplier name and country are required", 400));
  }

  if (
    reliabilityScore !== undefined &&
    (reliabilityScore < 0 || reliabilityScore > 100)
  ) {
    return next(
      new AppError("Reliability score must be between 0 and 100", 400)
    );
  }

  next();
};

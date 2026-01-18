import AppError from "../utils/AppError.js";

export const validateShipment = (req, res, next) => {
  const { supplier, origin, destination, expectedDelivery } = req.body;

  if (!supplier || !origin || !destination || !expectedDelivery) {
    return next(new AppError("Missing required shipment fields", 400));
  }

  if (
    !origin.lat ||
    !origin.lng ||
    !destination.lat ||
    !destination.lng
  ) {
    return next(
      new AppError("Origin and destination coordinates are required", 400)
    );
  }

  next();
};

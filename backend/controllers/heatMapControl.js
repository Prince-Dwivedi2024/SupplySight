import shipmentModel from "../models/shipmentModel.js";

export const getRiskHeatmap = async (req, res, next) => {
  try {
    const shipments = await shipmentModel.find({
      latestRiskScore: { $gt: 0 },
    }).select("origin destination latestRiskScore");

    const heatmapPoints = [];

    shipments.forEach((shipment) => {
      const intensity = shipment.latestRiskScore / 100;

      // Origin point
      heatmapPoints.push({
        lat: shipment.origin.lat,
        lng: shipment.origin.lng,
        intensity,
      });

      // Destination point
      heatmapPoints.push({
        lat: shipment.destination.lat,
        lng: shipment.destination.lng,
        intensity,
      });
    });

    res.status(200).json({
      success: true,
      count: heatmapPoints.length,
      data: heatmapPoints,
    });
  } catch (error) {
    next(error);
  }
};

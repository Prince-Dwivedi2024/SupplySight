import supplierModel from "../models/supplierModel.js";

export const createSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierModel.create(req.body);

    res.status(201).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierModel.find();

    res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    next(error);
  }
};



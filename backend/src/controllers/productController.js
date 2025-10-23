import * as ProductService from "../services/productService.js";

export const getProduct = async (_req, res, next) => {
  try {
    const response = await ProductService.getAllProduct();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await ProductService.getProductById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const response = await ProductService.createProduct(req.body);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await ProductService.updateProductById(id, req.body);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await ProductService.deleteProductById(id);

    res.status(200).json({
      status: "success",
      message: "Products successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

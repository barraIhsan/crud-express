import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { productModel } from "../model/product.js";
import { validateType } from "../validation/validateType.js";

export const getAllProduct = async () => {
  const [products] = await pool.query("SELECT * FROM products");

  return products;
};

export const getProductById = async (id) => {
  const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [
    id,
  ]);

  if (products.length === 0) {
    throw new ResponseError(404, "Product not found");
  }

  return products[0];
};

export const createProduct = async (req) => {
  const { user_id, name, description, price, stock } = req;

  validateType(req, productModel);

  const [products] = await pool.query(
    `INSERT INTO products (user_id,name,description,price,stock)
        VALUES (?,?,?,?,?)`,
    [user_id, name, description, price, stock],
  );

  return {
    id: products.insertId,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

export const updateProductById = async (id, req) => {
  const { user_id, name, description, price, stock } = req;

  const [products] = await pool.query(
    "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
    [user_id, name, description, price, stock, id],
  );

  if (products.affectedRows === 0) {
    throw new ResponseError(404, "Product not found");
  }

  return {
    id,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

export const deleteProductById = async (id) => {
  const [products] = await pool.query("DELETE FROM products WHERE id=?", [id]);

  if (products.affectedRows == 0) {
    throw new ResponseError(400, "Product not found");
  }
};

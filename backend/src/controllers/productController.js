import { pool } from "../config/db.js";
import { validateProduct } from "../middleware/validateProduct.js";
import { validateUserId } from "../middleware/validateUser.js";

export const getProducts = async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No such table exist",
    });
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No such product exist with the given id",
    });
  }
};

export const createProducts = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  if (!validateProduct(req, res)) return;
  if (!(await validateUserId(pool, user_id, res))) return;

  try {
    await pool.query(
      `INSERT INTO products (user_id,name,description,price,stock)
        VALUES (?,?,?,?,?)`,
      [user_id, name, description, price, stock],
    );
    res.status(200).json({
      status: "success",
      message: "Product successfully created",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Failed to create product: " + err.sqlMessage,
    });
  }
};

export const updateProductsById = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;

  if (!validateProduct(req, res)) return;
  if (!(await validateUserId(pool, user_id, res))) return;

  try {
    await pool.query(
      "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
      [user_id, name, description, price, stock, id],
    );
    res.status(200).json({
      status: "success",
      message: "Product successfully updated",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteProductsById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("DELETE FROM products WHERE id=?", [id]);
    if (rows.affectedRows == 0) {
      res.status(400).json({
        status: "fail",
        message: "No such products exist with the given id",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Products successfully deleted",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

import { pool } from "../config/db.js";
import {
  checkEmailUnique,
  checkUsernameUnique,
} from "../middleware/checkUnique.js";
import { validateUser } from "../middleware/validateUser.js";

export const getUsers = async (_, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id,fullname,username,email,role,address,phone_number,age FROM users",
    );
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

export const getUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT fullname,username,email,role,address,phone_number,age FROM users WHERE id = ?",
      [id],
    );
    res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No such user exist with the given id",
    });
  }
};

export const createUsers = async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;

  if (!(await checkUsernameUnique(pool, res, username))) return;
  if (!(await checkEmailUnique(pool, res, email))) return;
  if (!validateUser(req, res)) return;

  try {
    await pool.query(
      `INSERT INTO users (fullname,username,email,password,role,address,phone_number,age)
        VALUES (?,?,?,?,?,?,?,?)`,
      [fullname, username, email, password, role, address, phone_number, age],
    );
    res.status(200).json({
      status: "success",
      message: "User successfully created",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Failed to create user: " + err.sqlMessage,
    });
  }
};

export const updateUsersById = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;

  try {
    // fetch current user
    const [[rows]] = await pool.query(
      "SELECT username,email FROM users WHERE id=?",
      [id],
    );
    if (username != rows.username) {
      if (!(await checkUsernameUnique(pool, res, username))) return;
    }
    if (email != rows.email) {
      if (!(await checkEmailUnique(pool, res, email))) return;
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No such user exist with the given id",
    });
    return;
  }

  if (!validateUser(req, res)) return;

  try {
    await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ],
    );
    res.status(200).json({
      status: "success",
      message: "User successfully updated",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteUsersById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("DELETE FROM users WHERE id=?", [id]);
    if (rows.affectedRows == 0) {
      res.status(400).json({
        status: "fail",
        message: "No such user exist with the given id",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User successfully deleted",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

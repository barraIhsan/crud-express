import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/userValidation.js";
import validate from "../validation/validate.js";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id,fullname,username,email,role,address,phone_number,age FROM users",
  );

  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id,fullname,username,email,role,address,phone_number,age FROM users WHERE id = ?",
    [id],
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

export const createUser = async (req) => {
  const validated = validate(createUserSchema, req);
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const [users] = await pool.query(
    `INSERT INTO users (fullname,username,email,password,role,address,phone_number,age)
        VALUES (?,?,?,?,?,?,?,?)`,
    [fullname, username, email, password, role, address, phone_number, age],
  );

  return {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};

export const updateUserById = async (id, req) => {
  const validated = validate(updateUserSchema, req);
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const [users] = await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
    [fullname, username, email, password, role, address, phone_number, age, id],
  );

  if (users.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return {
    id,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};

export const deleteUserById = async (id) => {
  const [products] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (products.affectedRows == 0) {
    throw new ResponseError(400, "User not found");
  }
};

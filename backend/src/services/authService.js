import { pool } from "../config/db.js";
import { registerSchema } from "../validation/authValidation.js";
import validate from "../validation/validate.js";
import bcrypt from "bcrypt";

export const register = async (req) => {
  const validated = validate(registerSchema, req);

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

  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ],
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

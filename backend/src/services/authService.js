import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
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

export const login = async (request) => {
  const { email, password } = validate(loginSchema, request);

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  if (rows.length === 0) {
    throw new ResponseError(401, "Email atau password salah");
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ResponseError(401, "Email atau password salah");
  }

  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    role: user.role,
    addresss: user.address,
    phone_number: user.phone_number,
    age: user.age,
  };
};

import { ResponseError } from "../errors/responseError.js";

export const validateType = (req, dataType) => {
  for (const key in dataType) {
    // check if field is empty
    if (!req.hasOwnProperty(key)) {
      throw new ResponseError(400, `${key} is required`);
    }

    // check if data type is correct
    const expectedType = dataType[key];
    const actualType = typeof req[key];

    if (actualType != expectedType) {
      throw new ResponseError(400, `${key} must be a ${expectedType}`);
    }
  }
};

export const validateUserId = async (pool, id, res) => {
  const [rows] = await pool.query("SELECT 1 FROM users WHERE id=?", [id]);
  if (rows.length == 0) {
    res.status(400).json({
      status: "fail",
      message: "User with the given id doesn't exist",
    });
    return false;
  }
  return true;
};

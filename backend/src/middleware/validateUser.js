const dataType = {
  fullname: "string",
  username: "string",
  email: "string",
  password: "string",
  address: "string",
  phone_number: "number",
  age: "number",
};

export const validateUser = (req, res) => {
  for (const key in dataType) {
    // check if field is empty
    if (!req.body.hasOwnProperty(key)) {
      res.status(400).json({
        status: "fail",
        message: `${key} is required`,
      });
      return false;
    }

    // check if data type is correct
    const expectedType = dataType[key];
    const actualType = typeof req.body[key];

    if (actualType != expectedType) {
      res.status(400).json({
        status: "fail",
        message: `${key} must be a ${expectedType}`,
      });
      return false;
    }
  }
  return true;
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

export const checkUsernameUnique = async (pool, res, username) => {
  const [rows] = await pool.query("SELECT 1 FROM users WHERE username=?", [
    username,
  ]);
  if (rows.length > 0) {
    res.status(400).json({
      status: "fail",
      message: "Username already exist",
    });
    return false;
  }
  return true;
};

export const checkEmailUnique = async (pool, res, email) => {
  const [rows] = await pool.query("SELECT 1 FROM users WHERE email=?", [email]);
  if (rows.length == 1) {
    res.status(400).json({
      status: "fail",
      message: "Email already exist",
    });
    return false;
  }
  return true;
};

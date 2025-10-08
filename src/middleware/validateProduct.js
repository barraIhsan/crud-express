const dataType = {
  user_id: "number",
  name: "string",
  description: "string",
  price: "number",
  stock: "number",
};

export const validateProduct = (req, res) => {
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

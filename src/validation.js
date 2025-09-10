export const checkAllNotEmpty = (obj, item, res) => {
  for (const key in obj) {
    if (!obj[key] || (typeof obj[key] == "string" && !obj[key].trim())) {
      res.status(400).json({
        status: "fail",
        message: `${item} ${key} cannot be empty`,
      });
      return false;
    }
  }
  return true;
};

export const checkPrice = (price, res) => {
  if (typeof price != "number") {
    res.status(400).json({
      status: "fail",
      message: "Product price must be a number",
    });
    return false;
  } else if (price <= 0) {
    res.status(400).json({
      status: "fail",
      message: "Product price cannot be negative or zero",
    });
    return false;
  }
  return true;
};

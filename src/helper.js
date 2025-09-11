const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkType = (typeMap, type, res) => {
  if (!typeMap[type]) {
    res.status(400).json({
      status: "fail",
      message: `Unknown type: ${type}`,
    });
    return false;
  }
  return true;
};

export const getItemById = (items, id, type, res) => {
  const item = items.find((b) => b.id === Number(id));

  if (!item) {
    res.status(404).json({
      status: `No such ${type} found`,
    });
    return;
  }

  return item;
};

export const grabBody = (reqBody, typeMap, type, res) => {
  const data = {};

  for (const field of typeMap[type]) {
    // check if it exist
    if (!reqBody.hasOwnProperty(field.name)) {
      res.status(400).json({
        status: "fail",
        message: `${capitalize(type)} ${field.name} is required`,
      });
    }
    const reqValue = reqBody[field.name];

    // check data type
    if (typeof reqValue != field.type) {
      res.status(400).json({
        message: `${capitalize(type)} ${field.name} must be a ${field.type}`,
      });
      return;
    }

    // check if number field above 0
    if (typeof reqValue == "number" && reqValue <= 0) {
      res.status(400).json({
        message: `${capitalize(type)} ${field.name} cannot be zero or negative`,
      });
      return;
    }

    data[field.name] = reqBody[field.name];
  }

  return data;
};

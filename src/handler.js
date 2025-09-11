import { items, typeMap } from "./data.js";
import { checkType, getItemById, grabBody } from "./helper.js";

export const getAllHandler = (req, res) => {
  const { type } = req.params;

  res.status(200).json({
    status: "success",
    data: items[type],
  });
};

export const addHandler = (req, res) => {
  const { type } = req.params;

  if (!checkType(typeMap, type, res)) return;

  const data = grabBody(req.body, typeMap, type, res);
  if (!data) return;

  const newData = { id: Date.now(), ...data };
  items[type].push(newData);

  res.status(201).json({
    status: "success",
    data: newData,
  });
};

export const getByIdHandler = (req, res) => {
  const { type, id } = req.params;

  if (!checkType(typeMap, type, res)) return;

  const item = getItemById(items[type], id, type, res);
  if (!item) return;

  res.status(200).json({
    status: "success",
    data: item,
  });
};

export const updateByIdHandler = (req, res) => {
  const { type, id } = req.params;

  if (!checkType(typeMap, type, res)) return;

  const item = getItemById(items[type], id, type, res);
  if (!item) return;

  const newItem = grabBody(req.body, typeMap, type, res);
  if (!newItem) return;

  const newData = { id: item.id, ...newItem };

  for (const key in item) {
    item[key] = newData[key];
  }

  res.status(200).json({
    status: "success",
    data: item,
  });
};

export const deleteByIdHandler = (req, res) => {
  const { type, id } = req.params;

  if (!checkType(typeMap, type, res)) return;

  const item = getItemById(items[type], id, type, res);
  if (!item) return;

  const index = items[type].indexOf(item);
  items[type].splice(index, 1);

  res.status(200).json({
    status: "success",
  });
};

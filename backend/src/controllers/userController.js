import * as UserService from "../services/userService.js";

export const getUser = async (_req, res, next) => {
  try {
    const response = await UserService.getAllUser();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await UserService.getUserById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await UserService.updateUserById(id, req.body);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await UserService.deleteUserById(id);

    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

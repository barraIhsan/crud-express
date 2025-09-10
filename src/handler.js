import { books, products } from "./data.js";
import { checkAllNotEmpty, checkPrice } from "./validation.js";

// book handler
export const getAllBooksHandler = (_, res) => {
  res.status(200).json({
    status: "success",
    data: books,
  });
};

export const addBookHandler = (req, res) => {
  const { name, author } = req.body;

  if (!checkAllNotEmpty({ name, author }, "Book", res)) return;

  const id = Date.now();

  const newBook = { id, name, author };

  books.push(newBook);
  res.status(201).json({
    status: "success",
    data: newBook,
  });
};

export const getBookByIdHandler = (req, res) => {
  const { bookId } = req.params;

  const book = books.find((b) => b.id === Number(bookId));

  if (!book) {
    res.status(404).json({
      status: "No such book found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: book,
  });
};

export const updateBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const { name, author } = req.body;

  if (!checkAllNotEmpty({ name, author }, "Book", res)) return;

  const book = books.find((b) => b.id === Number(bookId));

  if (!book) {
    res.status(400).json({
      status: "fail",
      message: "No such book found",
    });
    return;
  }

  book.name = name;
  book.author = author;

  res.status(200).json({
    status: "success",
    data: book,
  });
};

export const deleteBookByIdHandler = (req, res) => {
  const { bookId } = req.params;

  const book = books.find((b) => b.id === Number(bookId));

  if (!book) {
    res.status(400).json({
      status: "fail",
      message: "No such book found",
    });
    return;
  }

  const index = books.indexOf(book);
  books.slice(index, 1);

  res.status(200).json({
    status: "success",
  });
};

// product handler
export const getAllProductsHandler = (_, res) => {
  res.status(200).json({
    status: "success",
    data: products,
  });
};

export const addProductHandler = (req, res) => {
  const { name, deskripsi, price } = req.body;

  if (!checkAllNotEmpty({ name, deskripsi }, "Product", res)) return;
  if (!checkPrice(price, res)) return;

  const id = Date.now();

  const newProduct = { id, name, deskripsi, price };

  products.push(newProduct);
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

export const getProductByIdHandler = (req, res) => {
  const { productId } = req.params;

  const product = products.find((b) => b.id === Number(productId));

  if (!product) {
    res.status(404).json({
      status: "No such product found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
};

export const updateProductByIdHandler = (req, res) => {
  const { productId } = req.params;

  const { name, deskripsi, price } = req.body;

  if (!checkAllNotEmpty({ name, deskripsi }, "Product", res)) return;
  if (!checkPrice(price, res)) return;

  const product = products.find((b) => b.id === Number(productId));

  if (!product) {
    res.status(400).json({
      status: "fail",
      message: "No such product found",
    });
    return;
  }

  product.name = name;
  product.deskripsi = deskripsi;
  product.price = price;

  res.status(200).json({
    status: "success",
    data: product,
  });
};

export const deleteProductByIdHandler = (req, res) => {
  const { productId } = req.params;

  const product = products.find((b) => b.id === Number(productId));

  if (!product) {
    res.status(400).json({
      status: "fail",
      message: "No such product found",
    });
    return;
  }

  const index = products.indexOf(product);
  products.slice(index, 1);

  res.status(200).json({
    status: "success",
  });
};

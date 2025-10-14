import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
    return true;
  } catch (error) {
    console.log(error);
  }
};


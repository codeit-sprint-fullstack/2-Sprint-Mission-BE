import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
  timeout: 5000,
});

async function getProductList(params = {}) {
  try {
    const res = await instance.get(`/`, { params });
    return res.data;
  } catch (e) {
    console.log(`Error: ${res.status} ${res.statusText} ${res.message}`);
  }
}

async function getProduct(id) {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (e) {
    console.log(`Error: ${res.status} ${res.statusText} ${res.message}`);
  }
}

async function createProduct(productDada) {
  try {
    const res = await instance.post(`/`, productDada);
    return res.data;
  } catch (e) {
    console.log(`Error: ${res.status} ${res.statusText} ${res.message}`);
  }
}

async function patchProduct(id, productDada) {
  try {
    const res = await instance.patch(`/${id}`, productDada);
    return res.data;
  } catch (e) {
    console.log(`Error: ${res.status} ${res.statusText} ${res.message}`);
  }
}

async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/${id}`);
    return `${res.status} ${res.statusText} ${res.message}`;
  } catch (e) {
    console.log(`Error: ${res.status} ${res.statusText} ${res.message}`);
  }
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};

import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/articles",
  timeout: 5000,
});

async function getArticleList(params = {}) {
  return instance
    .get(`/`, { params })
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function getArticle(id) {
  return instance
    .get(`/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function createArticle(articleData) {
  return instance
    .post(`/`, articleData)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function pathArticle(id, articleData) {
  return instance
    .patch(`/${id}`, articleData)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function deleteArticle(id) {
  return instance
    .delete(`/${id}`)
    .then((res) => `${res.status} ${res.statusText} ${res.message}`)
    .catch((error) => console.log("Request failed:", error.message));
}

export {
  getArticleList,
  getArticle,
  createArticle,
  pathArticle,
  deleteArticle,
};

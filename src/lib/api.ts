import axios from "axios";
import RowTypes from "../types/RowTypes";

const API_URL = "https://be-size-container-api.onrender.com";

const BATCH_SIZE: number = 3;

export const fetchData = async (category: string, query?: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${category}?limit=null${query ?? ""}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    return [];
  }
};

export const getItem = async (category: string, id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${category}/${id}`);
    return response;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    return [];
  }
};

export const addItem = async (category: string, data: object) => {
  const res = await axios.post(`${API_URL}/${category}`, data);
  return res.data;
};

export const cancelItem = async (category: string, id: string) => {
  await axios.post(`${API_URL}/${category}/${id}`);
};

export const updateItem = async (
  category: string,
  id: string,
  data: object
) => {
  const req = await axios.put(`${API_URL}/${category}/${id}`, data);
  return req.data;
};

export const deleteItem = async (category: string, id: string) => {
  await axios.delete(`${API_URL}/${category}/${id}`);
};

const spiltArray = (array: any[]) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += BATCH_SIZE) {
    chunks.push(array.slice(i, i + BATCH_SIZE));
  }
  return chunks;
};

export const batchAddItem = async (category: string, data: RowTypes[]) => {
  const errors: { rowID: number; error: unknown }[] = [];
  const successes: { rowID: number; data: object }[] = [];
  for (const i of spiltArray(data)) {
    const promises = i.map(async ({ _id, rowID, ...Rdata }) => {
      try {
        const data = await addItem(category, Rdata);
        successes.push({ rowID, data }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID, error }); // Lưu request lỗi
      }
    });
    await Promise.allSettled(promises);
  }
  console.log({ successes, errors });
  return { successes, errors };
};

export const batchUpdateItem = async (category: string, data: RowTypes[]) => {
  console.log(data);
  const errors: { rowID: number; error: unknown }[] = [];
  const successes: { rowID: number; data: object }[] = [];
  for (const i of spiltArray(data)) {
    const promises = i.map(async ({ _id, rowID, ...Rdata }) => {
      try {
        const data = await updateItem(category, _id, Rdata);
        successes.push({ rowID, data }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID, error }); // Lưu request lỗi
      }
    });
    await Promise.allSettled(promises);
  }
  return { successes, errors };
};

export const batchDeleteItem = async (category: string, list: RowTypes[]) => {
  const errors: { rowID: number; error: unknown }[] = [];
  const successes: { rowID: number }[] = [];
  for (const i of spiltArray(list)) {
    const promises = i.map(async ({ _id, rowID }) => {
      try {
        await deleteItem(category, _id);
        successes.push({ rowID }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID, error }); // Lưu request lỗi
      }
    });
    await Promise.allSettled(promises);
  }
  return { successes, errors };
};

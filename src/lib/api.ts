import axios from "axios";

const API_URL = "https://be-size-container-api.onrender.com";

const BATCH_SIZE: number = 3;

export const fetchData = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/${category}?limit=null`);
    return response.data.data.results;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    return [];
  }
};

export const addItem = async (category: string, data: object) => {
  const res = await axios.post(`${API_URL}/${category}`, data)
  return res.data;
};

export const updateItem = async (
  category: string,
  id: string,
  data: object
) => {
  const req = await axios.put(`${API_URL}/${category}/${id}`, data)
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

export const batchAddItem = async (
  category: string,
  data: { rowID: number; data: object }[]
) => {
  const errors: { rowID: number, data: object, error: unknown }[] = [];
  const successes: { rowID: number; data: object }[] = [];
  for (const i of spiltArray(data)) {
    const promises = i.map(async (item) => {
      try {
        const data = await addItem(category, item.data);
        successes.push({ rowID: item.rowID, data }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID: item.rowID, data, error }); // Lưu request lỗi
      }
    })
    await Promise.allSettled(promises);
  };
  return ({ successes, errors });
};

export const batchUpdateItem = async (
  category: string,
  data: { id: string; rowID: number; data: object }[]
) => {
  const errors: { rowID: number, data: object, error: unknown }[] = [];
  const successes: { rowID: number; data: object }[] = [];
  for (const i of spiltArray(data)) {
    const promises = i.map(async (item) => {
      try {
        const data = await updateItem(category, item.id, item.data);
        successes.push({ rowID: item.rowID, data }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID: item.rowID, data, error }); // Lưu request lỗi
      }
    })
    await Promise.allSettled(promises);
  };
  return ({ successes, errors });
};

export const batchDeleteItem = async (
  category: string,
  list: { id: string; rowID: number }[]
) => {
  const errors: { rowID: number; error: unknown }[] = [];
  const successes: { rowID: number }[] = [];
  for (const i of spiltArray(list)) {
    const promises = i.map(async (item) => {
      try {
        await deleteItem(category, item.id);
        successes.push({ rowID: item.rowID }); // Lưu request thành công
      } catch (error) {
        errors.push({ rowID: item.rowID, error }); // Lưu request lỗi
      }
    })
    await Promise.allSettled(promises);
  };
  return { successes, errors };
};

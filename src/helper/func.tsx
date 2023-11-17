import axios from "axios";
import { LOCAL_URL, LOCAL_URL_STORE } from "../config";

export const ajaxGet = async () => {
  const _url = LOCAL_URL;

  let res = await axios.get(_url);
  return res.data;
};

export const ajaxInsert = async (val: string) => {
  const _url = LOCAL_URL_STORE + val;
  console.log(_url)
  let res = await axios.get(_url);
  return res.data;
};

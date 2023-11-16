import axios from "axios";
import { LOCAL_URL } from "../config";

export const ajaxGet = async (url: string) => {
  const _url = LOCAL_URL ;

  let res = await axios.get(_url);
  return res.data;
};

import request from "utils/request";
import { BASE_URL } from "../../utils/constants";

export const getProductsList = () => {
    return request(`${BASE_URL}/getproductlist`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    });
}

export const createOrder = (payload) => {
    return request(`${BASE_URL}/createOrder`, {
        method: "POST",
        body:JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    });
}
  
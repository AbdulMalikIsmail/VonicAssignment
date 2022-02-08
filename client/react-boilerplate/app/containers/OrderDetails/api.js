import request from "utils/request";
import { BASE_URL } from "../../utils/constants";

export const fetchOrder = () => {
    return request(`${BASE_URL}/fetchOrder`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    });
}


  
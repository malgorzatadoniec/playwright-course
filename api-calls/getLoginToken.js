import { errors } from "@playwright/test";
import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
   const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({
        "username": username, 
        "password": password})
   });
   if (response.status !== 200){
    throw new Error("An error occured while trying to retrieve thie login token")
   }
   const responseBody = await response.json();
   return responseBody.token
};
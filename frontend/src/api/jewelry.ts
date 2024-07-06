import { client } from "./index";

export const getAllJewelry = async () => {
    try {
        const response = await client.get("jewelry/")
        return response.data
    } catch (error) {
        throw(error);
    } 
  };

export const getJewelryById = async (id:number) => {
    try {
        const response = await client.get(`jewelry/${id}`)
        return response.data
    } catch (error) {
        throw(error);
    } 
}
import axios from "axios";
const client = axios.create({
    baseURL: "https://toy.pequla.com/api",
    headers: {
        "Accept": "application/json",
    },
})

export class ToyService {

   static async getToys() {
        const response = await client.get("/toy");
        return response.data;
     
    }
     static async getToyById(id: number) {
    const response = await client.get(`/toy/${id}`);
    return await response.data
    
  }
  static async getToysCategory(){
    const response = await client.get("/type");
    return await response.data
  }
}
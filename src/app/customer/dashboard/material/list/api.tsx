import axios from "axios"
interface APIResponse {
    success: boolean,
    status: number,
    message: string,
}
export interface CombinedData {
    orderNumber: string, remarks: string, heading: string
}
export const getMaterialData = async () => {
    try {
        const response = await axios.get("/api/material");
        return response.data.materials
    } catch (error) {
    }
}
export const getSingleMaterialData = async (materialId: string) => {
    try {
        const response = await axios.get(`/api/material/${materialId}`)
    }
    catch {
    }
}
export const postMaterialReview = async (combinedData: CombinedData): Promise<APIResponse> => {
    const response = await axios.post("/api/material/orderReview", combinedData);
    console.log(response);
    return response.data;
}
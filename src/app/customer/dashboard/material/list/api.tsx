import axios from "axios"
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
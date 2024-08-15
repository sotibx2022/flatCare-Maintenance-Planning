import axios from "axios";
import { PreviewSubmitProps } from ".";
import { APIResponse } from ".";
export const postMaterial = async (materialData: PreviewSubmitProps): Promise<APIResponse> => {
    const response = await axios.post("/customer/dashboard/material/list", materialData);
    return response.data;
};

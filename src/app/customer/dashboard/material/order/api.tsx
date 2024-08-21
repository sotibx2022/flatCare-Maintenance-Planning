import axios from "axios";
import { PreviewSubmitProps } from ".";
import { APIResponse } from ".";
import { resetForm } from "../../../../../Redux/formSlice";
export const postMaterial = async (
    materialData: PreviewSubmitProps,
): Promise<APIResponse> => {
    const response = await axios.post("/api/material", materialData);
    return response.data;
};

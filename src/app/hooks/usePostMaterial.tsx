import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postMaterial } from "../customer/dashboard/material/order/api";
import { toast } from "react-toastify";
import { APIResponse, PreviewSubmitProps } from "../customer/dashboard/material/order";
import { AxiosError } from "axios";
export const usePostMaterial = (): UseMutationResult<APIResponse, AxiosError, PreviewSubmitProps> => {
    return useMutation<APIResponse, AxiosError, PreviewSubmitProps>({
        mutationFn: postMaterial,
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message || "Materials Data Posted Successfully.");
            } else {
                toast.error(result.message || "Problem sending Details.");
            }
        },
        onError: (error) => {
            toast.error("unExpected Error");
        }
    });
};

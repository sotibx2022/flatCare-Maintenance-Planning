import { PreviewSubmitProps } from "../order";
export interface ExtendedPreviewSubmitProps extends PreviewSubmitProps {
    _id: string;
    materialOrderNumber: string;
    createdAt: string;
    updatedAt: string;
    materialRequestNumber: string
}
export const formatOrderRequestNumber = (orderRequestNumber: string) => {
    return orderRequestNumber.split("-")[0]
}
export const formatCreatedDate = (createdDate: string) => {
    return createdDate.split("T")[0]
}
export interface Materials {
    materialName: string,
    materialDescription: string,
    materialQuantity: string,
    unitOfMeasure: string,
    materialRequestNumber: string,
}
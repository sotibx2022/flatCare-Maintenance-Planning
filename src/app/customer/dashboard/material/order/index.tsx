interface unitOfMeasureOptions {
    value: string,
    label: string,
}
export const unitOfMeasureOptions: unitOfMeasureOptions[] = [
    { value: '', label: 'Select One' },
    { value: 'box', label: 'Box' },
    { value: 'meter', label: 'Meter' },
    { value: 'kilogram', label: 'Kilogram' },
    { value: 'unit', label: 'Unit' },
    { value: 'liter', label: 'Liter' },
    { value: 'piece', label: 'Piece' },
    { value: 'roll', label: 'Roll' },
    { value: 'square_meter', label: 'Square Meter' },
    { value: 'foot', label: 'Foot' },
];
export interface MaterialDetailsData {
    materialName: string,
    materialDescription: string,
    materialQuantity: string,
    unitOfMeasure: string,
}
export interface OrderedForData {
    receipentName: string,
    receipentEmail: string,
    receipentPhone: number,
}
export interface DeliveryDetailsData {
    roomNumber: string,
    buildingNumber: string,
    floorNumber: String,
}
export interface DeliveryMethodData {
    deliveryOption: string
}
export interface PaymentDetailsData {
    cardNumber: string,
    cardHolderName: string,
    expiryDate: Date,
    cvvNumber: number,
}
export interface PreviewSubmitProps {
    materials: [{
        materialName: string,
        materialDescription: string,
        materialQuantity: string,
        unitOfMeasure: string,
    }],
    orderedBy: {
        orderedByName: string,
        orderedByPhone: number,
        orderedByEmail: string,
    },
    orderedFor: {
        receipentName: string,
        receipentEmail: string,
        receipentPhone: number
    },
    deliveryDetails: {
        buildingNumber: string,
        floorNumber: string,
        roomNumber: string,
    },
    deliveryMethod: "paymentOnDelivery" | "pickupFromStore" | "debitCard",
    paymentDetails: {
        cardNumber: string,
        cardHolderName: string,
        cvvNumber: string,
        expiryDate: Date
    }
}
export interface APIResponse {
    success: boolean,
    message: string,
    status: number
}
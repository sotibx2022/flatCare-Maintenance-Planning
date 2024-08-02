export const initialState = {
    materials: [
        {
            materialName: '',
            materialDescription: '',
            materialQuantity: '',
            unitOfMeasure: '',
        }],
    orderedBy: {
        orderedByName: '',
        orderedByPhone: '',
        orderedByEmail: '',
    },
    orderedFor: {
        orderedForName: '',
        orderedForPhone: '',
        orderedForEmail: '',
    },
    deliveryDetails: {
        buildingNumber: '',
        floorNumber: '',
        roomNumber: '',
    },
    deliveryMethod: {
        deliveryOption: '',
    },
    paymentDetails: {
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvvNumber: '',
    },
    nextValue: 1
};

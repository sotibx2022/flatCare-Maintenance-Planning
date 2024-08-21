import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./formSliceInitialState";
const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setMaterial: (state, action) => {
            const { data } = action.payload;
            state.materials.push({
                materialName: data.materialName, materialDescription: data.materialDescription,
                materialQuantity: data.materialQuantity, unitOfMeasure: data.unitOfMeasure
            });
        },
        addMaterial: (state, action) => {
            const { data } = action.payload;
            state.materials.push({
                materialName: data.materialName, materialDescription: data.materialDescription,
                materialQuantity: data.materialQuantity, unitOfMeasure: data.unitOfMeasure
            });
        },
        editMaterial: (state, action) => {
            const { data, index } = action.payload;
            state.materials[index + 1] = {
                materialName: data.materialName,
                materialDescription: data.materialDescription,
                materialQuantity: data.materialQuantity,
                unitOfMeasure: data.unitOfMeasure
            }
        },
        removeMaterial: (state, action) => {
            const { index } = action.payload;
            state.materials.splice(index, 1)
        },
        setOrderBy: (state, action) => {
            const data = action.payload;
            state.orderedBy = data;
        },
        setOrderFor: (state, action) => {
            const data = action.payload;
            state.orderedFor = data;
        },
        setDeliveryDetails: (state, action) => {
            const { deliveryDetailsData } = action.payload;
            state.deliveryDetails = deliveryDetailsData;
        },
        setDeliveryMethod: (state, action) => {
            const { deliveryOption } = action.payload;
            state.deliveryMethod = deliveryOption;
        },
        setPaymentDetails: (state, action) => {
            const { paymentDetailsData } = action.payload;
            state.paymentDetails = paymentDetailsData
        },
        setNextValue: (state, action) => {
            const { data } = action.payload;
            state.nextValue = data;
        },
        resetForm: (state) => {
            return { ...initialState };
        }
    }
});
export const { setMaterial, addMaterial, removeMaterial, setOrderBy, setOrderFor,
    setDeliveryDetails, setDeliveryMethod, setPaymentDetails, setNextValue, editMaterial, resetForm } =
    formSlice.actions
export default formSlice.reducer;
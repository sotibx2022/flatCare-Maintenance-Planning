import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
interface MaterialSchemaDocument extends Document {
    materialOrderNumber: string;
    materials: Array<{
        materialRequestNumber: string;
        materialName: string;
        materialDescription: string;
        materialQuantity: string;
        unitOfMeasure: string;
    }>;
    orderedBy: {
        orderedByName: string;
        orderedByEmail: string;
        orderedByPhone: string;
    };
    orderedFor: {
        receipentName: string;
        receipentEmail: string;
        receipentPhone: string;
    };
    deliveryDetails: {
        buildingNumber: string;
        floorNumber: string;
        roomNumber: string;
    };
    deliveryMethod: {
        deliveryOption: string;
    };
    paymentDetails?: {
        cardNumber: string;
        cardHolderName: string;
        cvvNumber: number;
        expiryDate: Date;
    };
}
const materialSchema = new Schema<MaterialSchemaDocument>({
    materialOrderNumber: {
        type: String,
        required: true,
        default: uuidv4,
    },
    materials: [
        {
            materialRequestNumber: {
                type: String,
                required: true,
                default: uuidv4,
            },
            materialName: {
                type: String,
                required: true,
            },
            materialDescription: {
                type: String,
                required: true,
            },
            materialQuantity: {
                type: String,
                required: true,
            },
            unitOfMeasure: {
                type: String,
                required: true,
            },
        },
    ],
    orderedBy: {
        orderedByName: {
            type: String,
            required: true,
        },
        orderedByEmail: {
            type: String,
            required: true,
        },
        orderedByPhone: {
            type: String,
            required: true,
        },
    },
    orderedFor: {
        receipentName: {
            type: String,
            required: true,
        },
        receipentEmail: {
            type: String,
            required: true,
        },
        receipentPhone: {
            type: String,
            required: true,
        },
    },
    deliveryDetails: {
        buildingNumber: {
            type: String,
            required: true,
        },
        floorNumber: {
            type: String,
            required: true,
        },
        roomNumber: {
            type: String,
            required: true,
        },
    },
    deliveryMethod: {
        deliveryOption: {
            type: String,
            required: true,
            enum: ['paymentOnDelivery', 'pickupFromStore', 'debitCard'],
        },
    },
    paymentDetails: {
        cardNumber: {
            type: String,
            required: function (this: MaterialSchemaDocument) {
                return this.deliveryMethod.deliveryOption === 'debitCard';
            },
        },
        cardHolderName: {
            type: String,
            required: function (this: MaterialSchemaDocument) {
                return this.deliveryMethod.deliveryOption === 'debitCard';
            },
        },
        expiryDate: {
            type: Date,
            required: function (this: MaterialSchemaDocument) {
                return this.deliveryMethod.deliveryOption === 'debitCard';
            },
        },
        cvvNumber: {
            type: Number,
            required: function (this: MaterialSchemaDocument) {
                return this.deliveryMethod.deliveryOption === 'debitCard';
            },
        },
    },
}, { timestamps: true });
export const Material = mongoose.models.Material || mongoose.model<MaterialSchemaDocument>('Material', materialSchema);

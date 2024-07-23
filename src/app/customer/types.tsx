export interface CustomerData {
  fullName: string;
  imageUrl: string;
  email: string;
  password: string;
  confirmPassword: string;
  buildingNumber: string;
  floorNumber: string;
  roomNumber: string;
  phoneNumber: string;
  file?: File | null; // Define phoneNumber as string consistently
}

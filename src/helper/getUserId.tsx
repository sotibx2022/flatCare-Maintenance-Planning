import axios from 'axios';
import { Customer } from '../models/customer.models';
import { ConnectToDb } from './connectToDb';

export const getUserId = async () => {
  try {
    await ConnectToDb(); // Assuming ConnectToDb() returns a promise or is properly awaited

    // Fetch token from API
    const response = await axios.get('/api/customer/findToken');
    const result = response.data.decodedToken.Id;

    // Find user in MongoDB using result as query criteria
    const user = await Customer.findOne({ _id: result });

    return user; // Return the user found, or null if not found (handle appropriately)
  } catch (error) {
    console.error('Error in getUserId function:', error);
    throw new Error('Failed to get user ID'); // Throw an error or handle differently as per your application's error handling strategy
  }
};

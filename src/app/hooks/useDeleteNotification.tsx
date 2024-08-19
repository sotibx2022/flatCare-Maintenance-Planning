import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
export interface APIResponse {
    success: boolean;
    message: string;
    status: number;
    data?: Notification[]
}
export interface Notification {
    notificationTitle: string;
    notificationDescription: string;
    createdAt: Date;
    updatedAt: Date;
    notificationPriority: string;
    notificationCategory: string;
    _id: string;
}
export const calculateTurnAroundTime = (d: Date) => {
    const referenceDate = new Date(d);
    const currentDate = new Date();
    const timeDifferenceInMillis = currentDate.getTime() - referenceDate.getTime();
    const timeDifferenceInDays = Math.floor(timeDifferenceInMillis / 86400000);
    return timeDifferenceInDays;
};
export const truncate_title = (title: string) => {
    const words = title.split(' ');
    if (words.length > 6) {
        const truncatedTitle = words.slice(0, 3).join(' ') + '...';
        return truncatedTitle.toUpperCase();
    } else return title.toUpperCase();
};
export const deleteNotificationRequest = async (id: string): Promise<APIResponse> => {
    const response = await axios.delete(`/api/notification/${id}`);
    return response.data;
};
export const findNotifications = async (): Promise<Notification[]> => {
    const response = await axios.get('/api/notification');
    return response.data.notifications;
};
export const useDeleteNotification = () => {
    const queryClient = useQueryClient()
    return useMutation<APIResponse, AxiosError, string>({
        mutationFn: deleteNotificationRequest,
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message || "Notification deleted successfully.");
                queryClient.invalidateQueries({ queryKey: ['notifications'] });
            } else {
                toast.error(result.message || "Problem deleting the notification.");
            }
        },
        onError: () => {
            toast.error("Unexpected Error occurred.");
        },
    });
};
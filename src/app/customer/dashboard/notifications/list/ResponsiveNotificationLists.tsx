'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingComponent from '../../../../ui/LoadingComponent';
import { calculateTurnAroundTime, findNotifications, truncate_title, useDeleteNotification } from '../../../../hooks/useDeleteNotification';
import { Notification } from '../../../../hooks/useDeleteNotification';
import Search from '../../../../ui/search/Search';
import { useState } from 'react';
const ResponsiveNotificationLists = () => {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState('');
    const [selectedPriorities, setSelectedPriorities] = useState('');
    const { data: notifications = [], isPending: isFetching } = useQuery({
        queryKey: ['notifications'],
        queryFn: findNotifications,
        // Optionally add staleTime or cacheTime to control when data is considered stale
    });
    const router = useRouter();
    const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification()
    const handleDelete = async (id: string) => {
        deleteNotification(id)
    };
    const getSearchResults = ({ searchValue, categoryValue, priorityValue }: { searchValue: string, categoryValue: string, priorityValue: string }) => {
        setSearchText(searchValue);
        setSelectedCategories(categoryValue);
        setSelectedPriorities(priorityValue);
        console.log(searchValue, categoryValue, priorityValue);
    };
    const filteredNotifications = notifications.filter((notification) => {
        return (
            (searchText === "" || notification.notificationTitle.toLowerCase().includes(searchText.toLowerCase())) &&
            (selectedCategories === "" || notification.notificationCategory === selectedCategories) &&
            (selectedPriorities === "" || notification.notificationPriority === selectedPriorities)
        );
    })
    return (
        <>
            {isDeleting || isFetching ? <LoadingComponent /> : <div className=" flex flex-wrap w-full justify-between gap-4">
                <h1 className='subHeading'>Notifications</h1>
                <Search searchResults={getSearchResults} />
                {filteredNotifications && filteredNotifications.map((notification: Notification, index: number) => (
                    <div key={index} className=" min-w-[300px] justify-between">
                        <div className="">
                            <div className="flex justify-between items-center border-t-[1px] border-b-[1px] border-helper">
                                <span className="text-primaryDark">{index + 1}.</span>
                                <div className="">
                                    <span
                                        onClick={() => {
                                            router.push(
                                                `/customer/dashboard/notifications/${notification._id}`
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            style={{ cursor: 'pointer', color: '#28a745', marginRight: '1rem' }}
                                        />
                                    </span>
                                    <span onClick={() => handleDelete(notification._id)}>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ cursor: 'pointer', color: '#dc3545' }}
                                        />
                                    </span>
                                </div>
                            </div>
                            <h3 className=" text-primaryDark">
                                {truncate_title(notification.notificationTitle)}
                            </h3>
                        </div>
                        <div className="flex justify-between my-4">
                            <p className="">
                                {notification.notificationCategory}
                            </p>
                            <p >
                                <span
                                    className={
                                        notification.notificationPriority === "Normal"
                                            ? "bg-green-500 text-green-100 px-4 py-1"
                                            : notification.notificationPriority === "Urgent"
                                                ? "bg-orange-500 text-orange-100 px-4 py-1"
                                                : notification.notificationPriority === "Emergency"
                                                    ? "bg-red-500 text-red-100 px-4 py-1"
                                                    : ""
                                    }
                                >
                                    {notification.notificationPriority}
                                </span>
                            </p>
                            <p className="">
                                {calculateTurnAroundTime(notification.createdAt)} Days Old
                            </p>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
}
export default ResponsiveNotificationLists;

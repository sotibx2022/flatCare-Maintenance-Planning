import { faTachometerAlt, faUser, faEdit, faKey, faBell, faBox, faThList, faTools } from '@fortawesome/free-solid-svg-icons';
const navigationItems = [
    {
        path: '/customer/dashboard/main',
        icon: faTachometerAlt,
        NavigationTitle: 'Dashboard'
    },
    {
        path: '/customer/dashboard/profile/view',
        icon: faUser,
        NavigationTitle: 'View Profile'
    },
    {
        path: '/customer/dashboard/profile/edit',
        icon: faEdit,
        NavigationTitle: 'Edit Profile'
    },
    {
        path: '/customer/dashboard/profile/changepassword',
        icon: faKey,
        NavigationTitle: 'Change Password'
    },
    {
        path: '/customer/dashboard/notifications/create',
        icon: faBell,
        NavigationTitle: 'Create Notification'
    },
    {
        path: '/customer/dashboard/notifications/list',
        icon: faThList,
        NavigationTitle: 'List Notifications'
    },
    {
        path: '/customer/dashboard/material/order',
        icon: faBox,
        NavigationTitle: 'Order Material'
    },
    {
        path: '/customer/dashboard/material/list',
        icon: faThList,
        NavigationTitle: 'List Material'
    },
    {
        path: '/customer/dashboard/technician/list',
        icon: faTools,
        NavigationTitle: 'Check Technicians'
    }
];
export default navigationItems;
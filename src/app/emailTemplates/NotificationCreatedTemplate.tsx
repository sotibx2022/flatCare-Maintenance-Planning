const NotificationCreatedTemplate = (notificationTitle: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Notification Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5e0e3;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f5e0e3;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        h1 {
            color: #a73754;;
        }
        p {
            color: #333333;
            line-height: 1.5;
        }
        a {
            color: white;
            background-color:#a73754;
            text-decoration: none;
            padding:0.1rem 0.5rem;
        }
             .logo{
            width:100px;
            height:100px;
            }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Notification Created</h1>
        <p>You created a new notification with the title: <strong>${notificationTitle}</strong>.</p>
        <p>You may visit <a href="http://localhost:3000/customer/dashboard/notifications/list">this link</a> to edit the notification.</p>
        </div>
</body>
</html>
`;
};
export default NotificationCreatedTemplate;

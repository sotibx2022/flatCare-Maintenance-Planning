const EmailVerificationTemplate = (verificationLink: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5e0e3;
            text-align: center;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f5e0e3;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #a73754;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
            p{
            color:#a73754;
            }
            .logo{
            width:100px;
            height:100px;
            }
    </style>
</head>
<body>
    <div class="container">
        <h1>Registration Successful</h1>
        <p>Dear User,</p>
        <p>Thank you for registering with us. We look forward to serving you!</p>
        <p><a href="${verificationLink}" class="button">click </a>Verify your email</p>
        <div class="footer">
            <p>Regards,<br>FlatCare Maintenance Planner.</p>
        </div>
    </div>
</body>
</html>
`;
};
export default EmailVerificationTemplate;

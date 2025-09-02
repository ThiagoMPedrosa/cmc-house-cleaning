export function getContactEmailHtml({
  name,
  email,
  phone,
  service,
  message,
}: {
  name: string
  email: string
  phone: string
  service: string
  message: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Quote Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      color: #333;
    }
    h2 {
      color: #2c3e50;
      margin-top: 0;
    }
    .label {
      font-weight: bold;
      margin-top: 15px;
    }
    .value {
      margin: 5px 0 15px;
    }
    .message-box {
      background-color: #f2f2f2;
      padding: 15px;
      border-radius: 5px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📩 New Quote Request Received</h2>
    <div>
      <div class="label">Name:</div>
      <div class="value">${name}</div>
      <div class="label">Email:</div>
      <div class="value">${email}</div>
      <div class="label">Phone:</div>
      <div class="value">${phone}</div>
      <div class="label">Service Requested:</div>
      <div class="value">${service}</div>
      <div class="label">Message:</div>
      <div class="message-box">${message}</div>
    </div>
  </div>
</body>
</html>`;
}
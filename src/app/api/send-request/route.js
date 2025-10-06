import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();

  // Create transporter using your Gmail or SMTP credentials
  const transporter = nodemailer.createTransport({
    service: "gmail", // or other SMTP provider
    auth: {
      user: process.env.FROM_EMAIL,           // Your email address
      pass: process.env.FROM_EMAIL_PASSWORD,  // App password or real password (recommend app password)
    },
  });

  const recipients = [
    "hrushikeshreddy4561@gmail.com",
    
  ];

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: recipients,
    subject: `Blood Donor Request from ${body.Name}`,
    html: `
      <h3>New Blood Donor Request</h3>
      <p><strong>Name:</strong> ${body.Name}</p>
      <p><strong>Age:</strong> ${body.Age}</p>
      <p><strong>Phone Number:</strong> ${body['Phone-Number']}</p>
      <p><strong>Blood Group:</strong> ${body['Blood-Group']}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to send email", error }), { status: 500 });
  }
}

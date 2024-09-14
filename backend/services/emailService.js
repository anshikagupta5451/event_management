const nodemailer = require("nodemailer");

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email reminder
const sendReminderEmail = (recipientEmail, eventDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipientEmail,
    subject: `Reminder: ${eventDetails.title}`,
    text: `Hello, this is a reminder for the event "${eventDetails.title}" happening on ${eventDetails.date}. Location: ${eventDetails.location}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendReminderEmail };

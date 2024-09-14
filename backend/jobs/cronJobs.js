const cron = require("node-cron");
const { sendReminderEmail } = require("../services/emailService");
const Event = require("../models/Event");

// Schedule a cron job to send event reminders
const scheduleEventReminder = (event) => {
  if (event.reminderTime) {
    const reminderDate = new Date(event.reminderTime);

    cron.schedule(
      `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${
        reminderDate.getMonth() + 1
      } *`,
      () => {
        sendReminderEmail(event.email, event); // Send reminder email
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata", // Adjust based on your timezone
      }
    );

    console.log(
      `Reminder scheduled for event: ${event.title} at ${reminderDate}`
    );
  }
};

module.exports = { scheduleEventReminder };

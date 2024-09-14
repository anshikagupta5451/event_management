const cron = require("node-cron");
const { sendReminderEmail } = require("../services/emailService");
const Event = require("../models/Event");

const scheduleEventReminder = (event) => {
  if (event.reminderTime) {
    const reminderDate = new Date(event.reminderTime);

    cron.schedule(
      `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${
        reminderDate.getMonth() + 1
      } *`,
      () => {
        sendReminderEmail(event.email, event); 
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata", 
      }
    );

    console.log(
      `Reminder scheduled for event: ${event.title} at ${reminderDate}`
    );
  }
};

module.exports = { scheduleEventReminder };

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container, Typography, List, ListItem } from "@mui/material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000"); // Backend server

  useEffect(() => {
    // Listen for notification events
    socket.on("notification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notif, index) => (
          <ListItem key={index}>{notif.message}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Notifications;

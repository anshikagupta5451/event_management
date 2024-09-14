import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import EventList from "../components/EventList";
import Sidebar from "../components/Sidebar";
import AddEventModal from "../components/AddEventModal";
import { fetchEvents } from "../api/api"; 
import { useTheme } from "@mui/material/styles";

const HomePage = () => {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 


  const loadEvents = async () => {
    try {
      const { data } = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    loadEvents(); 
  }, []);

  
  const handleEventAdded = () => {
    loadEvents(); 
  };

  const handleOpenAddEvent = () => setOpenAddEvent(true);
  const handleCloseAddEvent = () => setOpenAddEvent(false);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <Container
        sx={{
          paddingTop: "40px",
          paddingBottom: "40px",
          marginLeft: 0,
          width: isMobile ? "100%" : `calc(100% - 240px)`, 
          transition: "margin 0.3s ease", 
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between", 
            alignItems: "center",
            marginBottom: "30px",
            flexDirection: isMobile ? "column" : "row",
            textAlign: isMobile ? "center" : "left", 
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"} 
            fontWeight="bold"
            gutterBottom
          >
            Welcome to Event Management System
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleOpenAddEvent}
            sx={{
              backgroundColor: "#6A1B9A",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4A148C",
              },
              padding: "10px 20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              marginTop: isMobile ? "20px" : "0",
            }}
          >
            Add Event
          </Button>
        </Box>


        <EventList events={events} />

        <AddEventModal
          open={openAddEvent}
          handleClose={handleCloseAddEvent}
          onEventAdded={handleEventAdded}
        />
      </Container>
    </Box>
  );
};

export default HomePage;

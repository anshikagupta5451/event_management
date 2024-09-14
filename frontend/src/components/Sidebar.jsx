import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Event, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Sidebar = () => {
  // Define breakpoints using useMediaQuery
  const isMobile = useMediaQuery("(max-width:600px)"); // For mobile view

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMobile ? 70 : 240, // Adjust the drawer width based on screen size
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isMobile ? 70 : 240, // Adjust the drawer paper width
          boxSizing: "border-box",
          backgroundColor: "#4A148C",
        },
      }}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{ color: "#ffffff", cursor: "pointer" }}
        >
          <ListItemIcon>
            <Home style={{ color: "#ffffff" }} />
          </ListItemIcon>
          {/* Only show text if not in mobile view */}
          {!isMobile && <ListItemText primary="Home" />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/events"
          sx={{ color: "#ffffff", cursor: "pointer" }}
        >
          <ListItemIcon>
            <Event style={{ color: "#ffffff" }} />
          </ListItemIcon>
          {/* Only show text if not in mobile view */}
          {!isMobile && <ListItemText primary="Events" />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/add-event"
          sx={{ color: "#ffffff", cursor: "pointer" }}
        >
          <ListItemIcon>
            <AddCircle style={{ color: "#ffffff" }} />
          </ListItemIcon>
          {/* Only show text if not in mobile view */}
          {!isMobile && <ListItemText primary="Add Event" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

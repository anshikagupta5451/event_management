import { useState } from "react";
import AddEventModal from "../components/AddEventModal";

const AddEventPage = () => {
  const [open, setOpen] = useState(true); // Keep the modal open initially

  const handleClose = () => {
    setOpen(false); // Close the modal after adding event
  };

  return (
    <div>
      <h1>Add New Event</h1>
      <AddEventModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default AddEventPage;

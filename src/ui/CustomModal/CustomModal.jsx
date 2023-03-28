import { Box, Modal } from "@mui/material";
import React from "react";

const CustomModal = ({ children, open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: window.screen.width < 768 ? "90%" : "40%",
    height: "fitContent",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 2,
    outline: 'none'
    // overflow: 'auto',
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="mobile-modal" sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;

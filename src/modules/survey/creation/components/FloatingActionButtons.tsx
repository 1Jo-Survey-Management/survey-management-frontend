import { Box, Fab } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";

const styles = {
  fabBox: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    display: "flex",
    flexDirection: "column",
  },
  fabStyles: {
    width: "44px",
    height: "44px",
    marginBottom: "8px",
  },
};

const FloatingActionButtons: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={styles.fabBox}>
      <Fab
        color="primary"
        aria-label="add"
        sx={styles.fabStyles}
        onClick={scrollToTop}
      >
        <ArrowDropUpIcon></ArrowDropUpIcon>
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        sx={styles.fabStyles}
        onClick={scrollToBottom}
      >
        <ArrowDropDownIcon></ArrowDropDownIcon>
      </Fab>
      <Fab color="primary" aria-label="add" sx={styles.fabStyles}>
        <AddIcon></AddIcon>
      </Fab>
      <Fab color="primary" aria-label="add" sx={styles.fabStyles}>
        <VisibilityIcon></VisibilityIcon>
      </Fab>
    </Box>
  );
};

export default FloatingActionButtons;

import { Box, Fab } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';

const styles = {
  fabBox: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '1',
  },
  fabStyles: {
    width: '44px',
    height: '44px',
    marginBottom: '8px',
  },
};

interface FloatingActionButtonsProps {
  onClickAddQuestion: () => void;
}

function FloatingActionButtons({
  onClickAddQuestion,
}: FloatingActionButtonsProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
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
        <ArrowDropUpIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        sx={styles.fabStyles}
        onClick={scrollToBottom}
      >
        <ArrowDropDownIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        sx={styles.fabStyles}
        onClick={onClickAddQuestion}
      >
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add" sx={styles.fabStyles}>
        <VisibilityIcon />
      </Fab>
    </Box>
  );
}

export default FloatingActionButtons;

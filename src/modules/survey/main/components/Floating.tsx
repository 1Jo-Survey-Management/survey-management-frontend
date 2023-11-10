import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function FloatingActionButtons() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤하도록 설정
    });
  };

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
      width: '50px',
      height: '50px',
      marginBottom: '15px',
    },
  };

  return (
    <Box sx={styles.fabBox}>
      <Fab
        sx={{
          ...styles.fabStyles,
          backgroundColor: '#8ECC7E',
          marginRight: '25px',
          '&:hover': {
            backgroundColor: '#438133', // Change this to the desired color on hover
          },
        }}
        color="primary"
        aria-label="pageup"
        onClick={scrollToTop}
      >
        <ArrowDropUpIcon />
      </Fab>
      <Fab
        sx={{
          ...styles.fabStyles,
          backgroundColor: '#8ECC7E',
          marginRight: '25px',
          '&:hover': {
            backgroundColor: '#438133', // Change this to the desired color on hover
          },
        }}
        color="primary"
        onClick={() => navigate('/survey/register')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

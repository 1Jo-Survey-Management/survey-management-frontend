import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Swal from 'sweetalert2';

export default function FloatingActionButtons() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤하도록 설정
    });
  };

  const handleAddClick = () => {
    const loginUserNo = localStorage.getItem('userNo');
    if (!loginUserNo) {
      Swal.fire({
        icon: 'error',
        title: '설문 작성을 하시려면 로그인 해주세요.',
      });
      return;
    }
    navigate('/survey/register');
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
          backgroundColor: '#3E3E3E',
          marginRight: '25px',
          '&:hover': {
            backgroundColor: '#747474', // Change this to the desired color on hover
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
          backgroundColor: '#3E3E3E',
          marginRight: '25px',
          '&:hover': {
            backgroundColor: '#747474', // Change this to the desired color on hover
          },
        }}
        color="primary"
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

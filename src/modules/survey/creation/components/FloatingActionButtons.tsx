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

/**
 * 설문조사 작성 페이지 플로팅 버튼 컴포넌트 입니다.
 *
 * @component
 * @param onClickAddQuestion 설문 문항을 추가하는 메서드 입니다.
 * @returns 설문조사 작성 플로팅 버튼
 * @author 강명관
 */
function FloatingActionButtons({
  onClickAddQuestion,
}: FloatingActionButtonsProps) {
  /**
   * 화면의 스크롤을 최상단으로 보내는 메서드 입니다.
   *
   * @author 강명관
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 화면의 스크롤을 최하단으로 보내는 메서드 입니다.
   *
   * @author 강명관
   */
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  /**
   * 플로팅 버튼으로 문항을 추가하고, 스크롤을 최하단으로 보내는 메서드 입니다.
   *
   * @author 강명관
   */
  const handleAddQuestion = () => {
    scrollToBottom();
    onClickAddQuestion();
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
        onClick={handleAddQuestion}
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
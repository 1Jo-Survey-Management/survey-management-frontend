/** @jsxImportSource @emotion/react */

import { Alert, Box, Button } from '@mui/material';
import React from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ModalButtonGroupProps } from '../types/MainType';

const styles = {
  modalButtonGroupBox: css({
    marginTop: '15px',
    paddingBottom: '15px',
  }),

  surveyResultButton: css({
    width: '100%',
    marginBottom: '8px',
    backgroundColor: '#ebebeb',
    '&:hover': {
      backgroundColor: 'gray',
      color: 'white',
      fontWeight: '900',
      fontSize: '15px',
    },
    color: 'black',
    fontWeight: '600',
    '@media (min-height: 801px) and (max-height: 1000px)': {
      marginTop: '90px',
    },
    '@media (max-width: 375px)': {
      marginTop: '50px',
    },
  }),

  surveyAttendButton: css({
    width: '100%',
    marginBottom: '8px',
    backgroundColor: '#ebebeb',
    '&:hover': {
      backgroundColor: 'gray',
      color: 'white',
      fontWeight: '900',
      fontSize: '15px',
    },
    color: 'black',
    fontWeight: '600',
  }),
};

export default function ClosingModalButtoonGroup({
  numUser,
  selectedCard,
  showSwalAlert,
}: ModalButtonGroupProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Box css={styles.modalButtonGroupBox}>
        {selectedCard?.openStatusName === '비공개' &&
          (numUser() !== selectedCard.userNo ? (
            <Alert severity="warning">설문 작성자만 볼 수 있습니다.</Alert>
          ) : (
            <Alert severity="success">해당 비공개 설문의 작성자입니다.</Alert>
          ))}

        {selectedCard?.openStatusName === '회원 공개' && numUser() === null && (
          <Alert severity="error">결과를 보시려면 로그인해주세요.</Alert>
        )}
      </Box>
      {/* 결과보기, 참여하기 버튼 */}
      {/* 결과보기 버튼 */}
      {(!selectedCard?.openStatusName ||
        selectedCard?.openStatusName === '전체 공개' ||
        (selectedCard?.openStatusName === '비공개' &&
          numUser() !== null &&
          numUser() === selectedCard?.userNo) ||
        (selectedCard?.openStatusName === '회원 공개' &&
          numUser() !== null)) && (
        <Button
          onClick={() => {
            if (selectedCard?.surveyAttendCount === 0) {
              showSwalAlert();
            } else {
              navigate(`/survey/statistics/${selectedCard?.surveyNo}`);
            }
          }}
          css={styles.surveyResultButton}
        >
          설문 결과보기
        </Button>
      )}
    </div>
  );
}
/** @jsxImportSource @emotion/react */

import { Box, Chip, Fade, Modal, Typography, Divider } from '@mui/material';
import React from 'react';
import './Modal.css';
import FaceIcon from '@mui/icons-material/Face';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Avatar from '@mui/material/Avatar';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '../../../../global.css';
import { css } from '@emotion/react';
import Swal from 'sweetalert2';
import Sharing from '../../../utils/Sharing';
import { ModalProps } from '../types/MainType';
import AttendModalButtonGroup from './AttendModalButtonGroup';
import ClosingModalButtoonGroup from './ClosingModalButtonGroup';
import {
  SURVEY_STATUS_DEADLINE,
  SURVEY_STATUS_PROGRESS,
  tagColor,
} from '../constant/MainConstant';

const fontFamily = 'nanumsquare';

const styles = {
  modalContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  modalShareAndCloseBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  textStyle: css({
    fontFamily,
    textOverflow: 'ellipsis',
  }),

  modalSubText: css({
    fontSize: '15px',
    marginBottom: '10px',
    color: '#858585',
    display: 'flex',
    alignItems: 'center',
  }),

  openStatusChip: css({
    fontSize: 14,
    marginRight: 1,
    height: '25px',
    backgroundColor: tagColor('0'),
    opacity: 0.7,
  }),

  sharingBox: css({
    display: 'flex',
    alignItems: 'center',
  }),

  closeIcon: css({
    '&:hover': {
      cursor: 'pointer',
    },
  }),

  userInfoBox: css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),

  userAvatar: css({
    width: 28,
    height: 28,
    marginRight: '8px',
  }),

  userNickname: css({
    display: 'flex',
    alignItems: 'center',
    color: '#393939',
    height: '45px',
    fontWeight: '700',
  }),

  surveyTitleBox: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '80px',
  }),

  surveyTitle: css({
    fontFamily,
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    marginBottom: '15px',
  }),

  surveyOptionContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  }),

  surveyAvailableDate: css({
    fontSize: '18px',
    marginRight: '4px',
  }),

  surveyAttendNumBox: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }),

  surveyAttendIconBox: css({
    color: '#808080',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),

  surveyAttendIcon: css({
    fontSize: '20px',
    marginRight: '8px',
  }),

  surveyTagBox: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),

  surveyTagChip: css({
    fontSize: 12,
    marginRight: '8px',
    height: '25px',
    opacity: 0.7,
  }),

  modalDivider: css({
    marginBottom: '10px',
    marginTop: '10px',
  }),

  modalScrollBox: css({
    overflow: 'auto',
    height: '28vh',
    '@media screen and (min-height: 1000px)': {
      overflow: 'auto',
      height: '36vh',
    },

    '@media screen and (min-width: 374px) and (max-width: 600px) and (min-height: 800px) and (max-height: 1000px)':
      {
        height: '23vh',
      },

    '@media screen and  (max-width: 376px) and (max-width: 600px)': {
      height: '24vh',
    },
    '@media screen and (min-width: 374px) and (max-width: 600px) and (min-height: 500px) and (max-height: 700px)':
      {
        overflow: 'auto',
        height: '20vh',
      },
    '@media screen and (min-width: 374px) and (max-width: 600px) and (min-height: 801px) and (max-height: 1000px)':
      {
        overflow: 'auto',
        height: '16vh',
      },
  }),

  surveyImageBox: css({
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '15px',
  }),

  surveyImage: css({
    width: '100%',
    height: 'auto',
  }),

  surveyDescription: css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'start',
    paddingBottom: '15px',
    fontFamily,
  }),
};

export default function MainModal({
  openModal,
  closeCardModal,
  selectedCard,
}: ModalProps) {
  const numUser = () => {
    const loginUserNo = localStorage.getItem('userNo');
    const numUserNo =
      loginUserNo !== null && loginUserNo !== undefined
        ? Number(loginUserNo)
        : null;
    return numUserNo;
  };

  const showSwalAlert = () => {
    Swal.fire({
      icon: 'warning',
      title: '설문 참여자가 아직 없습니다.',
      customClass: {
        popup: 'swal-custom-popup',
        container: 'swal-custom-container',
      },
    });
  };

  const handleIconClick = () => {
    closeCardModal();
  };

  return (
    <Modal
      open={openModal}
      onClose={closeCardModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      css={styles.modalContainer}
    >
      <Fade in={openModal}>
        <div className="modal">
          <Box>
            <Box css={styles.modalShareAndCloseBox}>
              <div>
                <Chip
                  key="0"
                  label={selectedCard?.openStatusName}
                  size="small"
                  css={[styles.textStyle, styles.openStatusChip]}
                />
                {numUser() === selectedCard?.userNo && (
                  <Chip
                    label="본인 작성"
                    size="small"
                    css={[styles.textStyle, styles.openStatusChip]}
                  />
                )}
              </div>

              <Box css={styles.sharingBox}>
                {selectedCard && (
                  <Sharing
                    shareTitle={selectedCard.surveyTitle}
                    shareUrl={`${process.env.REACT_APP_FRONT_BASE_URL}/survey/attend/${selectedCard.surveyNo}`}
                    shareImageUrl={selectedCard.surveyImage}
                  />
                )}

                <ClearTwoToneIcon
                  onClick={handleIconClick}
                  css={styles.closeIcon}
                />
              </Box>
            </Box>
            <Box css={styles.userInfoBox}>
              <Avatar src={selectedCard?.userImage} css={styles.userAvatar} />
              <Typography css={styles.userNickname}>
                {selectedCard.userNickName}
              </Typography>
            </Box>
            {/* 설문 조사 타이틀 */}
            <Box className="titleStyle" css={styles.surveyTitleBox}>
              <Typography
                variant="h6"
                id="modal-title"
                css={styles.surveyTitle}
              >
                {selectedCard.surveyTitle}
              </Typography>
            </Box>

            {/* 작성자, 참여자수, 태그들 */}
            <Box css={styles.surveyOptionContainer}>
              {/* 설문 조사 기간 */}
              <Typography css={styles.modalSubText}>
                <EventAvailableIcon css={styles.surveyAvailableDate} />
                {` ${selectedCard.surveyPostAt.slice(0, 10)} ~ ${
                  selectedCard.surveyClosingAt
                }`}
              </Typography>
              <Box css={styles.surveyAttendNumBox}>
                <Typography css={styles.surveyAttendIconBox}>
                  <FaceIcon css={styles.surveyAttendIcon} />
                  {selectedCard.surveyAttendCount}
                </Typography>
                <Box css={styles.surveyTagBox}>
                  {selectedCard?.tagName.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      css={[styles.textStyle, styles.surveyTagChip]}
                      sx={{ backgroundColor: tagColor(tag) }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            <Divider css={styles.modalDivider} />
            <Box className="modal-scroll-box" css={styles.modalScrollBox}>
              {/* 설문조사 사진 */}
              <Box css={styles.surveyImageBox}>
                <img
                  src={selectedCard?.surveyImage}
                  alt="Survey"
                  css={styles.surveyImage}
                />{' '}
              </Box>
              <Typography id="modal-description" css={styles.surveyDescription}>
                {`설문 설명: ${selectedCard.surveyDescription}`}
              </Typography>
            </Box>
            <Divider css={styles.modalDivider} />

            {selectedCard.surveyStatusName === SURVEY_STATUS_PROGRESS && (
              <AttendModalButtonGroup
                numUser={numUser}
                selectedCard={selectedCard}
                showSwalAlert={showSwalAlert}
              />
            )}

            {selectedCard.surveyStatusName === SURVEY_STATUS_DEADLINE && (
              <ClosingModalButtoonGroup
                numUser={numUser}
                selectedCard={selectedCard}
                showSwalAlert={showSwalAlert}
              />
            )}
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}

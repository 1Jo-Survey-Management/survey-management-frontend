import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import './Modal.css';
import FaceIcon from '@mui/icons-material/Face';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Modal,
  Fade,
  Divider,
  Alert,
} from '@mui/material';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '../../../../global.css';
import { CardDataListProps, CardDataProps } from '../types/MainType';

const customStyles = `
    .swal-custom-popup {
      z-index: 1500; // 필요한 z-index 값
    }
    .swal-custom-container {
      z-index: 1500; // 필요한 z-index 값
    }
  `;

const styles = {
  CardSwiper: {
    width: '100%',
    height: '100%',
  },
  Slide: {
    width: '100%',
    height: '200px',
  },
};
const fontFamily = 'nanumsquare';
const textStyle = {
  fontFamily,
  textOverflow: 'ellipsis',
};
const modalSubText = {
  fontSize: '15px',
  marginBottom: '10px',
  color: '#858585',
};

const titleStyle = {
  display: 'flex',
  fontFamily,
  textOverflow: 'ellipsis',
  justifyContent: 'center',
};

function RecentSurvey({ cardList }: CardDataListProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardDataProps | null>(null);

  const navigate = useNavigate();

  const getChipColor = (surveyStatusName: string) => {
    switch (surveyStatusName) {
      case '진행':
        return '#000000';
      case '작성':
        return 'secondary';
      default:
        return 'default';
    }
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

  const openCardModal = (card: CardDataProps) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const numUser = () => {
    const loginUserNo = localStorage.getItem('userNo');
    const numUserNo =
      loginUserNo !== null && loginUserNo !== undefined
        ? Number(loginUserNo)
        : null;
    return numUserNo;
  };

  const swiperParams: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 3,
    breakpoints: {
      920: {
        slidesPerView: 6,
        spaceBetween: 3,
      },
      750: {
        slidesPerView: 4,
        spaceBetween: 3,
      },

      540: {
        slidesPerView: 3,
        spaceBetween: 3,
      },

      500: {
        slidesPerView: 2,
        spaceBetween: 3,
      },

      0: {
        slidesPerView: 1.8,
        spaceBetween: 3,
      },
    },
  };

  const tagColor = (tagName: string) => {
    switch (tagName) {
      case '공지':
        return '#F8E5E5';
      case '중요':
        return '#F5F9DE';
      case '업무':
        return '#F9ECDF';
      case '기타':
        return '#E5ECF5';
      case '일상':
        return '#EDEBF6';
      default:
        return 'default';
    }
  };

  const handleIconClick = () => {
    closeCardModal();
  };

  return (
    <div>
      <div>
        <style>{customStyles}</style>
        <Box sx={{ height: '200px' }}>
          <Swiper style={styles.CardSwiper} {...swiperParams}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
                height: '100%',
                alignItems: 'center',
              }}
            >
              {cardList &&
                cardList.map((card) => (
                  <div key={card.surveyNo}>
                    {/* 카드를 클릭하면 해당 카드 정보를 전달하여 모달 열기 */}
                    <SwiperSlide
                      key={`slide_${card.surveyNo}`}
                      style={styles.Slide}
                    >
                      <Card
                        variant="elevation"
                        sx={{
                          width: '156px',
                          height: '180px',
                          borderRadius: 2,
                          backgroundColor: '#FBFBFB',
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                          marginLeft: '5px',
                        }}
                        style={textStyle}
                        onClick={() => openCardModal(card)}
                        role="button"
                      >
                        <CardContent
                          sx={{
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* 카드 내용 */}
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-between"
                            paddingBottom="12px"
                          >
                            <Chip
                              label={card.surveyAttendCount}
                              sx={{
                                fontSize: '12px',
                                width: '60px',
                                height: '20px',
                                fontWeight: 600,
                                justifyContent: 'space-between',
                                backgroundColor: '#F9F9F9',
                                boxShadow:
                                  'inset 0px 0px 3px rgba(0, 0, 0, 0.3)',
                              }}
                              style={textStyle}
                              icon={
                                <FaceIcon
                                  sx={{
                                    fontSize: '15px',
                                  }}
                                />
                              }
                            />

                            <Chip
                              label={card.surveyStatusName}
                              variant="outlined"
                              sx={{
                                width: '40px',
                                height: '20px',
                                fontSize: '10px',
                                fontWeight: 600,
                                '& .MuiChip-label': {
                                  padding: 0,
                                },
                                backgroundColor: '#F9F9F9',

                                color: getChipColor(card.surveyStatusName),
                              }}
                              style={textStyle}
                            />
                          </Stack>
                          {/* </Stack> */}

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'stretch',
                              fontSize: 12,
                              color: 'text.secondary',
                              fontWeight: 600,
                              marginBottom: '5px',
                              fontFamily,
                            }}
                          >
                            <EventAvailableIcon
                              sx={{
                                fontSize: '15px',
                                marginRight: '4px',
                              }}
                            />
                            {card.surveyClosingAt}
                          </div>

                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              fontSize: 18,
                              fontWeight: 600,
                              marginBottom: '8px',
                              cursor: 'pointer',
                              maxHeight: '47px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              height: '47px',
                              WebkitBoxOrient: 'vertical',
                            }}
                            style={textStyle}
                          >
                            {card.surveyTitle}
                          </Typography>
                          {/* 태그 등 카드에 관한 내용 표시 */}
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: '30px' }}
                          >
                            {card.tagName.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                style={textStyle}
                                sx={{
                                  fontSize: 11,
                                  marginRight: 1,
                                  height: '20px',
                                  backgroundColor: tagColor(tag),
                                  // opacity: 0.7,
                                }}
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  </div>
                ))}
            </Box>
          </Swiper>
        </Box>

        <Modal
          open={openModal}
          onClose={closeCardModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={openModal}>
            <div className="modal">
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Chip
                      key="0"
                      label={selectedCard?.openStatusName}
                      size="small"
                      style={textStyle}
                      sx={{
                        fontSize: 14,
                        marginRight: 1,
                        height: '25px',
                        backgroundColor: tagColor('0'),
                        opacity: 0.7,
                      }}
                    />
                    {numUser() === selectedCard?.userNo && (
                      <Chip
                        label="본인 작성"
                        size="small"
                        style={textStyle}
                        sx={{
                          fontSize: 14,
                          marginRight: 1,
                          height: '25px',
                          backgroundColor: tagColor('0'),
                          opacity: 0.7,
                        }}
                      />
                    )}
                  </div>
                  <ClearTwoToneIcon onClick={handleIconClick} />

                  {/* 닫기 아이콘 */}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={selectedCard?.userImage}
                    sx={{
                      width: 28,
                      height: 28,
                      marginRight: '8px',
                    }}
                  />
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#393939',

                      height: '45px',
                      fontWeight: '700',
                    }}
                  >
                    {selectedCard ? selectedCard.userNickName : ''}
                  </Typography>
                </Box>
                {/* 설문 조사 타이틀 */}
                <Box sx={titleStyle}>
                  <Typography
                    variant="h6"
                    id="modal-title"
                    style={{
                      fontFamily,
                      textOverflow: 'ellipsis',
                      fontWeight: 'bold',
                      paddingBottom: '30px',
                    }}
                  >
                    {selectedCard ? selectedCard.surveyTitle : ''}
                  </Typography>
                </Box>

                {/* 작성자, 참여자수, 태그들 */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
                >
                  {/* 설문 조사 기간 */}
                  <Typography
                    style={modalSubText}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <EventAvailableIcon
                      sx={{
                        fontSize: '18px',
                        marginRight: '4px',
                      }}
                    />{' '}
                    {selectedCard
                      ? ` ${selectedCard.surveyPostAt.slice(0, 10)} ~ ${
                          selectedCard.surveyClosingAt
                        }`
                      : ''}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#808080',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <FaceIcon
                        sx={{
                          fontSize: '20px',
                          marginRight: '8px',
                        }}
                      />{' '}
                      {selectedCard ? selectedCard.surveyAttendCount : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {selectedCard?.tagName.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          style={textStyle}
                          sx={{
                            fontSize: 12,
                            marginRight: 1,
                            height: '25px',
                            backgroundColor: tagColor(tag),
                            opacity: 0.7,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
                <div className="modal-scroll-box">
                  {/* 설문조사 사진 */}
                  <Typography
                    id="modal-description"
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      textAlign: 'start',
                      paddingBottom: '15px',
                      fontFamily,
                    }}
                  >
                    {selectedCard
                      ? `설문 설명: ${selectedCard.surveyDescription}`
                      : ''}
                  </Typography>
                </div>
                <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

                <Box
                  sx={{
                    marginTop: '15px',
                    paddingBottom: '15px',
                  }}
                >
                  {/* 참여하기 제한 조건 */}
                  {selectedCard?.attendCheckList &&
                    selectedCard.attendCheckList.includes(false) && (
                      <Alert severity="info">이미 참여한 설문입니다.</Alert>
                    )}

                  {selectedCard?.userNo === numUser() &&
                    selectedCard?.openStatusName === '전체 공개' && (
                      <Alert severity="success">
                        본인이 작성한 설문입니다.
                      </Alert>
                    )}
                  {selectedCard?.userNo === numUser() &&
                    selectedCard?.openStatusName === '회원 공개' && (
                      <Alert severity="success">
                        본인이 작성한 설문입니다.
                      </Alert>
                    )}

                  {selectedCard?.openStatusName === '비공개' &&
                    (numUser() !== selectedCard.userNo ? (
                      <Alert severity="warning">
                        설문 작성자만 볼 수 있습니다.
                      </Alert>
                    ) : (
                      <Alert severity="success">
                        해당 비공개 설문의 작성자입니다.
                      </Alert>
                    ))}

                  {selectedCard?.openStatusName === '회원 공개' &&
                    numUser() === null && (
                      <Alert severity="error">
                        설문 결과를 보시려면 로그인해주세요.
                      </Alert>
                    )}

                  {numUser() === null &&
                    selectedCard?.openStatusName === '전체 공개' && (
                      <Alert severity="error">
                        설문 참여를 원하시면 로그인해주세요
                      </Alert>
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
                        navigate(
                          `/survey/statistics/${selectedCard?.surveyNo}`
                        );
                      }
                    }}
                    sx={{
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
                    }}
                  >
                    설문 결과보기
                  </Button>
                )}

                {/* 참여하기 버튼 */}
                {numUser() !== null &&
                  (!selectedCard?.attendCheckList ||
                    (!selectedCard.attendCheckList.some(
                      (item) => item === false
                    ) &&
                      selectedCard?.userNo !== numUser())) && (
                    <Button
                      onClick={() =>
                        navigate(`/survey/attend/${selectedCard?.surveyNo}`)
                      }
                      sx={{
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
                      }}
                    >
                      설문 참여하기
                    </Button>
                  )}
              </Box>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default RecentSurvey;

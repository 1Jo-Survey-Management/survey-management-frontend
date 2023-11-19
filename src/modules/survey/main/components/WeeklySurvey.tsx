/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import FaceIcon from '@mui/icons-material/Face';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Modal,
  Divider,
  Alert,
} from '@mui/material';
import Swal from 'sweetalert2';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import axios from '../../../login/components/customApi';
import '../../../../global.css';

function WeeklySurvey() {
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

  // style 태그를 사용해 커스텀 스타일 정의
  const customStyles = `
  .swal-custom-popup {
    z-index: 1500; /* 필요한 z-index 값 */
  }
  .swal-custom-container {
    z-index: 1500; /* 필요한 z-index 값 */
  }
`;
  const styles = {
    CardSwiper: {
      width: '100%',
      height: '100%',
    },
    Slide: {
      width: '100%',
      height: '170px',
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

  type CardData = {
    surveyNo: number;
    surveyTitle: string;
    surveyDescription: string;
    surveyImage: string;
    surveyPostAt: string;
    surveyClosingAt: string;
    userNo: number;
    userNickName: string;
    userImage: string;
    attendUserNo: Array<number>;
    surveyStatusName: string;
    openStatusName: string;
    tagName: string[];
    surveyAttendCount: number;
    isDeleted: boolean;
    attendCheckList: boolean[];
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CardData[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weeklyResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/surveys/weekly`
        );

        if (weeklyResponse.data.length > 0) {
          setCardList(weeklyResponse.data);
          setIsDataAvailable(true);
        } else {
          setIsDataAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const numUser = () => {
    const loginUserNo = localStorage.getItem('userNo');
    const numUserNo =
      loginUserNo !== null && loginUserNo !== undefined
        ? Number(loginUserNo)
        : null;
    return numUserNo;
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const tagColor = (tag: string) => {
    switch (tag) {
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

  const swiperParams: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 3,
    breakpoints: {
      920: {
        slidesPerView: 5,
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

  const handleIconClick = () => {
    closeCardModal();
  };

  return (
    <div>
      <style>{customStyles}</style>
      <Box
        sx={{
          height: '180px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isDataAvailable ? (
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
                          width: '150px',
                          height: '160px',

                          borderRadius: 2,
                          backgroundColor: '#FBFBFB',
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        style={textStyle}
                        onClick={() => openCardModal(card)}
                        role="button"
                      >
                        <CardContent
                          sx={{
                            padding: '8px',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* 카드 내용 */}
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-around"
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
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: 12,
                              color: 'text.secondary',
                              fontWeight: 600,
                              marginBottom: 'Zpx',
                              fontFamily,
                            }}
                          >
                            {card.surveyClosingAt}
                          </div>

                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              fontSize: 15,
                              fontWeight: 600,
                              marginBottom: '8px',
                              cursor: 'pointer',
                              maxHeight: '43px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              height: '41px',
                              WebkitBoxOrient: 'vertical',
                            }}
                            style={textStyle}
                          >
                            {card.surveyTitle}
                          </Typography>
                          {/* 태그 등 카드에 관한 내용 표시 */}
                          <Stack direction="row" spacing={1}>
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
        ) : (
          <Typography variant="h5">인기설문이 없습니다🥲</Typography>
        )}
      </Box>

      {/* -------------------------------------------------------- 모달 창 생성 ------------------- */}
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
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            width: '375px',
            height: '800px',
            padding: '16px',
            outline: 0,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Chip
                key="0"
                label={selectedCard?.openStatusName}
                size="small"
                style={textStyle}
                sx={{
                  fontSize: 16,
                  marginRight: 1,
                  height: '35px',
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
                    fontSize: 16,
                    marginRight: 1,
                    height: '35px',
                    backgroundColor: tagColor('0'),
                    opacity: 0.7,
                  }}
                />
              )}
              {/* 닫기 아이콘 */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ClearTwoToneIcon onClick={handleIconClick} />
              </Box>
            </Box>

            {/* 설문 조사 타이틀 */}
            <Box sx={titleStyle} style={{ height: '94.03px' }}>
              <Typography
                variant="h5"
                id="modal-title"
                style={{
                  fontFamily,
                  textOverflow: 'ellipsis',
                  fontWeight: 'bold',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                }}
              >
                {selectedCard ? selectedCard.surveyTitle : ''}
              </Typography>
            </Box>

            {/* 작성자, 참여자수, 태그들 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'left',
                    color: '#808080',
                  }}
                >
                  작성자: {selectedCard ? selectedCard.userNickName : ''}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'left',
                    color: '#808080',
                  }}
                >
                  참석자 수:{' '}
                  {selectedCard ? selectedCard.surveyAttendCount : ''}
                </Typography>
                {/* 설문 조사 기간 */}
                <Typography style={modalSubText}>
                  {' '}
                  {selectedCard
                    ? `기간: ${selectedCard.surveyPostAt.slice(0, 10)} ~ ${
                        selectedCard.surveyClosingAt
                      }`
                    : ''}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {selectedCard?.tagName.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    style={textStyle}
                    sx={{
                      fontSize: 16,
                      marginRight: 1,
                      height: '35px',
                      backgroundColor: tagColor(tag),
                      opacity: 0.7,
                    }}
                  />
                ))}
              </Stack>
            </Box>
            <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
            <div
              style={{
                overflow: 'auto',
                height: '400px',
              }}
            >
              {/* 설문조사 사진 */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: '15px',
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/LoginFig.png`}
                  alt="Naver Button"
                  style={{ width: '100%', height: 'auto' }}
                />{' '}
              </Box>

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
                  <Alert severity="success">본인이 작성한 설문입니다.</Alert>
                )}
              {selectedCard?.userNo === numUser() &&
                selectedCard?.openStatusName === '회원 공개' && (
                  <Alert severity="success">본인이 작성한 설문입니다.</Alert>
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
                    navigate(`/survey/statistics/${selectedCard?.surveyNo}`);
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
                (!selectedCard.attendCheckList.some((item) => item === false) &&
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
      </Modal>
      {/* ----------------------------------------------------------------------------------- */}
    </div>
  );
}

export default WeeklySurvey;

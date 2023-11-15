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
} from '@mui/material';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import axios from '../../../login/components/customApi';
import '../../../../global.css';

function WeeklySurvey() {
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
    surveyDiscription: string;
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
        return '#3D882B';
      case '작성':
        return 'secondary';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // weekly 데이터
        const weeklyResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/surveys/weekly`
        );
        console.log(`weekly 데이터 확인 : ${weeklyResponse.data}`);

        if (weeklyResponse.data.length > 0) {
          // weekly 데이터가 존재하면 그 데이터를 사용
          setCardList(weeklyResponse.data);
          setIsDataAvailable(true);
        } else {
          // weekly 데이터가 없으면 recent 데이터
          const recentResponse = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/surveys/recent`
          );
          setCardList(recentResponse.data);
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
    // numUserNo를 사용하거나 처리하는 코드 추가
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
    spaceBetween: 5,
    breakpoints: {
      920: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      750: {
        slidesPerView: 4,
        spaceBetween: 5,
      },

      540: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      500: {
        slidesPerView: 2,
        spaceBetween: 5,
      },

      0: {
        slidesPerView: 1.8,
        spaceBetween: 5,
      },
    },
  };

  const handleIconClick = () => {
    closeCardModal();
  };

  return (
    <div>
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

                          borderRadius: 5,
                          backgroundColor: '#B8DDA6',
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
                                backgroundColor: '#FFFDF8',
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
                              variant="filled"
                              sx={{
                                width: '40px',
                                height: '20px',
                                fontSize: '10px',
                                fontWeight: 600,
                                '& .MuiChip-label': {
                                  padding: 0,
                                },
                                backgroundColor: '#FFFDF8',
                                boxShadow:
                                  'inset 0px 0px 3px rgba(0, 0, 0, 0.3)',
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
                              maxHeight: '43px', // 원하는 높이 설정
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
                                  opacity: 0.7,
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
            width: '350px',
            height: 'auto',
            padding: '16px',
            outline: 0,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Box>
            {/* 닫기 아이콘 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ClearTwoToneIcon onClick={handleIconClick} />
            </Box>

            {/* 설문 조사 타이틀 */}
            <Box sx={titleStyle}>
              <Typography
                variant="h4"
                id="modal-title"
                style={{
                  fontFamily,
                  textOverflow: 'ellipsis',
                  fontWeight: 'bold',
                }}
              >
                {selectedCard ? selectedCard.surveyTitle : ''}
              </Typography>
            </Box>

            {/* 설문 조사 기간 */}
            <Typography style={modalSubText}>
              {' '}
              {selectedCard
                ? `${selectedCard.surveyPostAt.slice(0, 10)} ~ ${
                    selectedCard.surveyClosingAt
                  }`
                : ''}
            </Typography>

            {/* 작성자, 참여자수, 태그들 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
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
              </Box>
            </Box>
            <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

            {/* 설문조사 사진 */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <img
                src={`${process.env.PUBLIC_URL}/LoginFig.png`}
                alt="Naver Button"
                style={{ width: '100%', height: 'auto' }}
              />{' '}
            </Box>

            <Typography id="modal-description" style={textStyle}>
              {selectedCard ? selectedCard.surveyDiscription : ''}
            </Typography>

            <Box>
              {/* 참여하기 제한 조건 */}
              {selectedCard?.attendCheckList &&
                selectedCard.attendCheckList.includes(false) && (
                  <Typography
                    variant="body2"
                    style={{ color: 'red', marginBottom: '8px' }}
                    fontSize="12px"
                  >
                    이미 참여한 설문에는 다시 참여할 수 없습니다.
                  </Typography>
                )}
              {selectedCard?.userNo === numUser() && (
                <Typography
                  variant="body2"
                  style={{ color: 'red', marginBottom: '8px' }}
                  fontSize="12px"
                >
                  본인이 작성한 설문에는 참여할 수 없습니다.
                </Typography>
              )}
            </Box>
            {/* 결과보기, 참여하기 버튼 */}
            <Button
              onClick={() =>
                navigate(`/survey/statistics/${selectedCard?.surveyNo}`)
              }
              sx={{
                width: '100%',
                marginBottom: '8px',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
                color: 'black',
              }}
            >
              결과보기
            </Button>
            <Button
              onClick={() =>
                navigate(`/survey/attend/${selectedCard?.surveyNo}`)
              }
              disabled={
                !selectedCard?.attendCheckList ||
                selectedCard.attendCheckList.some((item) => item === false) ||
                selectedCard?.userNo === numUser()
              }
              sx={{
                width: '100%',
                marginBottom: '8px',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
                color: 'black',
              }}
            >
              참여하기
            </Button>
          </Box>
        </div>
      </Modal>
      {/* ----------------------------------------------------------------------------------- */}
    </div>
  );
}

export default WeeklySurvey;

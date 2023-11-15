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
} from '@mui/material';

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
        // weekly 데이터
        const weeklyResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/surveys/weekly`
        );

        if (weeklyResponse.data.length > 0) {
          // weekly 데이터가 존재하면 그 데이터를 사용
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
    console.log(cardList);
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
                                // boxShadow:
                                //   'inset 0px 0px 3px rgba(0, 0, 0, 0.3)',
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
        ) : (
          <Typography variant="h5">인기설문이 없습니다🥲</Typography>
        )}
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
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            width: '350px',
            height: '500px',
            padding: '16px',
            outline: 0,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2 id="modal-title" style={textStyle}>
            {selectedCard ? selectedCard.surveyTitle : ''}
          </h2>
          <p style={textStyle}>
            날짜:
            {selectedCard ? selectedCard.surveyPostAt.slice(0, 10) : ''}~{' '}
            {selectedCard ? selectedCard.surveyClosingAt : ''}
          </p>

          <p style={textStyle}>
            작성자: {selectedCard ? selectedCard.userNickName : ''}
          </p>
          <p style={textStyle}>
            태그: {selectedCard ? selectedCard.tagName : ''}
          </p>
          <p style={textStyle}>
            참석자 수: {selectedCard ? selectedCard.surveyAttendCount : ''}
          </p>
          <p id="modal-description" style={textStyle}>
            {selectedCard ? selectedCard.surveyDiscription : ''}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Button
              onClick={() =>
                navigate(`/survey/statistics/${selectedCard?.surveyNo}`)
              }
            >
              결과보기
            </Button>

            <Button
              onClick={() =>
                navigate(`/survey/attend/${selectedCard?.surveyNo}`)
              }
              disabled={
                !selectedCard?.attendCheckList ||
                selectedCard.attendCheckList.some(
                  (item: boolean) => item === false
                ) ||
                selectedCard?.userNo === numUser()
              }
            >
              참여하기
            </Button>
            {selectedCard?.attendCheckList &&
              selectedCard.attendCheckList.includes(false) && (
                <Typography
                  variant="body2"
                  style={{ color: 'red' }}
                  fontSize="12px"
                >
                  이미 참여한 설문에는 다시 참여할 수 없습니다.
                </Typography>
              )}

            {selectedCard?.userNo === numUser() && (
              <Typography
                variant="body2"
                style={{ color: 'red' }}
                fontSize="12px"
              >
                본인이 작성한 설문에는 참여할 수 없습니다.
              </Typography>
            )}

            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WeeklySurvey;

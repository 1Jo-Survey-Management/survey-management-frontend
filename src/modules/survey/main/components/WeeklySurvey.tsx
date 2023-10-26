import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../login/components/customApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import GroupsIcon from '@mui/icons-material/Groups';
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
  const fontFamily = "'Sunflower', sans-serif";
  const textStyle = {
    fontFamily,
    textOverflow: 'ellipsis',
  };

  const userInfo = {
    loginUserNo: 1,
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
    tag: Array<string>;
    surveyAttendCount: number;
    isDeleted: boolean;
    attendCheckList: boolean;
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CardData[]>([]);
  const getChipColor = (surveyStatusName: string) => {
    switch (surveyStatusName) {
      case '진행':
        return '#7F81B4';
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
          'http://localhost:8080/surveys/weekly'
        );

        if (weeklyResponse.data.length > 0) {
          // weekly 데이터가 존재하면 그 데이터를 사용
          setCardList(weeklyResponse.data);
        } else {
          // weekly 데이터가 없으면 recent 데이터
          const recentResponse = await axios.get(
            'http://localhost:8080/surveys/recent'
          );
          setCardList(recentResponse.data);
        }
        setCardList((prevCardList) =>
          prevCardList
            .slice()
            .sort((a, b) => b.surveyAttendCount - a.surveyAttendCount)
        );
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

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const swiperParams: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 5,
    breakpoints: {
      1050: {
        slidesPerView: 5,
      },
      870: {
        slidesPerView: 4,
      },

      730: {
        slidesPerView: 3,
      },

      511: {
        slidesPerView: 2,
      },

      0: {
        slidesPerView: 1.8,
      },
    },
  };

  // const cardColor = () => {
  //   if (
  //     !selectedCard?.attendCheckList ||
  //     selectedCard.attendCheckList.some((item) => item === false) ||
  //     selectedCard?.userNo === userInfo.loginUserNo
  //   ) {
  //     return '#FFEAEA';
  //   }
  //   return '#D3D4F5';
  // };

  return (
    <div>
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
                <SwiperSlide style={styles.Slide}>
                  <Card
                    variant="outlined"
                    sx={{
                      width: '150px',
                      height: '160px',
                      border: 2.5,
                      borderColor: '#FFEAEA',
                      borderRadius: 5,
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
                          icon={
                            <GroupsIcon
                              sx={{
                                fontSize: '15px',
                              }}
                            />
                          }
                          label={card.surveyAttendCount}
                          sx={{
                            fontSize: '12px',
                            width: '60px',
                            height: '20px',
                            fontWeight: 600,
                            justifyContent: 'space-between',
                          }}
                          style={textStyle}
                        />

                        <Chip
                          label={card.surveyStatusName}
                          variant="outlined"
                          sx={{
                            width: '50px',
                            height: '20px',
                            fontSize: '10px',
                            fontWeight: 600,
                            '& .MuiChip-label': {
                              padding: 0,
                            },
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
                          marginBottom: '0px',
                          fontFamily,
                        }}
                      >
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
                        }}
                        style={textStyle}
                      >
                        {/* {card.surveyNo} */}
                      </Typography>

                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: 17,
                          fontWeight: 600,
                          marginBottom: '8px',
                          cursor: 'pointer',
                          maxHeight: '45px', // 원하는 높이 설정
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                        style={textStyle}
                      >
                        {card.surveyTitle}
                      </Typography>
                      {/* 태그 등 카드에 관한 내용 표시 */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 11,
                          '& > span:not(:last-child)': {
                            marginRight: '8px',
                          },
                        }}
                        style={textStyle}
                      >
                        {card.tag.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              </div>
            ))}
        </Box>
      </Swiper>

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
          <p style={textStyle}>태그: {selectedCard ? selectedCard.tag : ''}</p>
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
            <Button onClick={() => navigate('/survey/Search')}>결과보기</Button>
            <Button
              onClick={() => navigate('/survey/Search')}
              disabled={
                !selectedCard?.attendCheckList ||
                selectedCard.attendCheckList.some((item) => item === false) ||
                selectedCard?.userNo === userInfo.loginUserNo
              }
            >
              참여하기
            </Button>
            {selectedCard?.attendCheckList &&
              selectedCard.attendCheckList.includes(false) && (
                <Typography variant="body2" style={{ color: 'red' }}>
                  이미 참여한 설문에는 다시 참여할 수 없습니다.
                </Typography>
              )}

            {selectedCard?.userNo === userInfo.loginUserNo && (
              <Typography variant="body2" style={{ color: 'red' }}>
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

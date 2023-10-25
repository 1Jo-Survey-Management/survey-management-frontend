import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  Fade,
} from '@mui/material';

import '../../../../global.css';

function ClosingSurvey() {
  const styles = {
    CardSwiper: {
      width: '100%',
      height: '100%',
    },
    Slide: {
      width: '100%',
      height: '150px',
    },
  };

  type CardData = {
    surveyNo: number;
    surveyTitle: string;
    surveyDiscription: string;
    surveyImage: string;
    surveyPostAt: string;
    surveyClosingAt: string;
    userNickName: string;
    userImage: string;
    userNo: Array<number>;
    surveyStatusName: string;
    openStatusName: string;
    tag: Array<string>;
    surveyAttendCount: number;
    isDeleted: boolean;
  };

  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily,
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    const data = async () => {
      const card = await axios.get('http://localhost:8000/surveys/closing');

      setCardList(card.data);
    };
    data();
  }, []);

  const getChipColor = (surveyStatusName: string) => {
    switch (surveyStatusName) {
      case '진행':
        return 'primary';
      case '작성':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  // const reParticipation = () => {
  //   if(    ) {
  //     alert('본인이 작성한 설문에는 참여할 수 없습니다.')
  //   } else {
  //     (() => navigate('/survey/Search'))
  //   }
  // }

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

  return (
    <div>
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
                <div
                  key={card.surveyNo}
                  onClick={() => setOpenModal(true)}
                  onKeyPress={() => openCardModal(card)}
                  role="button"
                  tabIndex={0}
                >
                  <SwiperSlide style={styles.Slide}>
                    <Card
                      variant="outlined"
                      sx={{
                        minWidth: 100,
                        maxWidth: 150,
                        height: '130px',
                        border: 2,
                        borderColor: '#BCBCBC',
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
                            color={getChipColor(card.surveyStatusName)}
                            variant="outlined"
                            sx={{
                              width: '50px',
                              height: '20px',
                              fontSize: '10px',
                              fontWeight: 600,
                              '& .MuiChip-label': {
                                padding: 0,
                              },
                            }}
                          />
                        </Stack>

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
                          {card.surveyClosingAt.slice(0, 10)}
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
                          {/* {card.userNo} */}
                          {/* {card.surveyNo} */}
                        </Typography>
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
                            <span key={tag}>{tag}</span>
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
          <Fade in={openModal}>
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
                {selectedCard
                  ? selectedCard.surveyPostAt.slice(0, 10)
                  : ''}~{' '}
                {selectedCard ? selectedCard.surveyClosingAt.slice(0, 10) : ''}
              </p>

              <p>작성자: {selectedCard ? selectedCard.userNickName : ''}</p>
              <p>태그: {selectedCard ? selectedCard.tag : ''}</p>
              <p>
                참석자 수: {selectedCard ? selectedCard.surveyAttendCount : ''}
              </p>
              <p id="modal-description">
                {selectedCard ? selectedCard.surveyDiscription : ''}
              </p>
              <Button onClick={() => navigate('/survey/Search')}>
                결과보기
              </Button>
              <Button
              // onClick={(reParticipation)}
              >
                참여하기
              </Button>
              <Button onClick={closeCardModal}>닫기</Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ClosingSurvey;

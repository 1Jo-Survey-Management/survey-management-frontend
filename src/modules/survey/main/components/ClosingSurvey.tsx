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
  Fade,
} from '@mui/material';

import axios from '../../../login/components/customApi';

import '../../../../global.css';

function ClosingSurvey() {
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
    attend_check: boolean;
  };
  const fontFamily = 'nanumsquare';
  const textStyle = {
    fontFamily,
    textOverflow: 'ellipsis',
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    const data = async () => {
      const card = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/surveys/closing`
      );

      setCardList(card.data);
    };
    data();
  }, []);

  const getChipColor = (surveyStatusName: string) => {
    switch (surveyStatusName) {
      case '진행':
        return '#7F81B4';
      case '작성':
        return 'secondary';
      default:
        return '#D7D3D3';
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
  return (
    <div>
      <div>
        <Box sx={{ height: '180px' }}>
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
                          backgroundColor: '#F2F2F2',
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
                                color: '#D7D3D3',
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
                              color: '#8B8B8B',
                              fontWeight: 600,
                              marginBottom: '5px',
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
                              color: '#8B8B8B',
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
                  : ''}~ {selectedCard ? selectedCard.surveyClosingAt : ''}
              </p>

              <p>작성자: {selectedCard ? selectedCard.userNickName : ''}</p>
              <p>태그: {selectedCard ? selectedCard.tagName : ''}</p>
              <p>
                참석자 수: {selectedCard ? selectedCard.surveyAttendCount : ''}
              </p>
              <p id="modal-description">
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
                <Button onClick={() => navigate('/survey/Search')} disabled>
                  참여하기
                </Button>
                <Typography
                  variant="body2"
                  style={{ color: 'red' }}
                  fontSize="12px"
                >
                  마감된 설문입니다.
                </Typography>
                <Button onClick={closeCardModal}>닫기</Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ClosingSurvey;

import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import axios from 'axios';
import Content from './Content';

function SurveyCard() {
  type CardData = {
    surveyNo: number;
    surveyTitle: string;
    surveyDiscription: string;
    surveyImage: string;
    surveyPostAt: string;
    surveyClosingAt: string;
    userNickName: string;
    userImage: string;
    surveyStatusName: string;
    openStatusName: string;
    tag: string;
    surveyAttendCount: number;
    isDeleted: boolean;
    // 기타 카드에 필요한 속성들을 추가로 정의
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    const data = async () => {
      const card = await axios.get('http://localhost:8081/test/closing');
      console.log(card);
      setCardList(card.data);
    };
    data();
  }, []);

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  return (
    // <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
    <div>
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
              key={card.surveyNo} // 수정된 부분: 배열 인덱스 대신 고유한 값을 key로 사용
              onClick={() => openCardModal(card)}
              onKeyPress={() => openCardModal(card)}
              role="button"
              tabIndex={0}
            >
              {/* 카드를 클릭하면 해당 카드 정보를 전달하여 모달 열기 */}
              <Card
                sx={{
                  minWidth: 100,
                  maxWidth: 150,
                  // minHeight: 80,
                }}
              >
                <CardContent
                  sx={{
                    padding: '8px',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* 카드 내용 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12,
                      color: 'text.secondary',
                      marginBottom: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {card.surveyClosingAt}
                    <Stack spacing={1} alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="진행중"
                          color="primary"
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
                    </Stack>
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
                  >
                    {card.tag}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </Box>

      {/* 선택된 카드에 대한 모달 */}
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
            <p id="modal-description">
              {selectedCard ? selectedCard.surveyImage : ''}
            </p>
            <h2 id="modal-title">
              {selectedCard ? selectedCard.surveyTitle : ''}
            </h2>
            <p id="modal-description">
              {selectedCard ? selectedCard.surveyDiscription : ''}
            </p>
            <p>
              {selectedCard ? selectedCard.surveyPostAt : ''}-
              {selectedCard ? selectedCard.surveyClosingAt : ''}
            </p>
            <p>{selectedCard ? selectedCard.userImage : ''}</p>
            <p>{selectedCard ? selectedCard.userNickName : ''}</p>
            <p>{selectedCard ? selectedCard.tag : ''}</p>
            <p>{selectedCard ? selectedCard.surveyAttendCount : ''}</p>
            <Button onClick={closeCardModal}>닫기</Button>
            <Button onClick={() => navigate('/survey/Search')}>결과보기</Button>
            <Button onClick={() => navigate('/survey/Search')}>참여하기</Button>
          </div>
        </Fade>
      </Modal>
    </div>
    // </Container>
  );
}

export default SurveyCard;

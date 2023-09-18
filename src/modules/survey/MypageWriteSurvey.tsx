import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

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

type CardData = {
  date: string;
  title: string;
  tag: string[];
  description: string;
};

function Mypage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const cardData = [
    {
      id: 1,
      date: '~2023-09-13',
      title: 'WEHAGO 만족도 조사',
      tag: ['#WEHAGO', '#플랫폼'],
      description: '모달 시험 문구.',
    },
    {
      id: 2,
      date: '~2023-09-13',
      title: 'Word of the Day 2',
      tag: ['#WEHAGO', '#플랫폼'],
      description: '이 설문에 대한 설명 문구입니다.',
    },
    {
      id: 3,
      date: '~2023-09-13',
      title: 'Word of the Day 2',
      tag: ['#WEHAGO', '#플랫폼'],
      description: '이 설문에 대한 설명 문구입니다.',
    },
    // 나머지 데이터 생략...
  ];

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1
        style={{
          fontSize: '25px',
        }}
      >
        내가 작성한 설문 목록
      </h1>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          height: '100%',
        }}
      >
        {cardData.map((card) => (
          <div
            key={card.id} // 수정된 부분: 배열 인덱스 대신 고유한 값을 key로 사용
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
                minHeight: 80,
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
                  {card.date}
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
                  {card.title}
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
                  {card.tag.map((tag, index, array) => (
                    <React.Fragment key={tag}>
                      {tag}
                      {index !== array.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Box>

      <Button onClick={() => navigate('/survey/main')}>돌아가기</Button>

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
            <h2 id="modal-title">{selectedCard ? selectedCard.title : ''}</h2>
            <p id="modal-description">
              {selectedCard ? selectedCard.description : ''}
            </p>
            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Mypage;

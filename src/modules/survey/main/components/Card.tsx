import * as React from 'react';
import { useState } from 'react';
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
  tag: string[]; // 문자열 배열로 수정
  description: string;
  // 기타 카드에 필요한 속성들을 추가로 정의
};

function SurveyCard() {
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

  // 동적으로 생성할 카드 데이터 배열
  const cardData = [
    {
      date: '2023-09-13',
      title: 'WEHAGO 만족도 조사',
      tag: ['#WEHAGO', '#플랫폼'],
      description: '모달 시험 문구.',
    },
  ];

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
        }}
      >
        {cardData.map((card, index) => (
          <div key={index} onClick={() => openCardModal(card)}>
            {' '}
            <Card
              sx={{
                minWidth: 100,
                maxWidth: 180,
                // marginRight: '0',
                minHeight: 80,
                height: '95%',
                boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardContent>
                {/* 카드 내용 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 12,
                    color: 'text.secondary',
                    marginBottom: '16px',
                  }}
                >
                  {card.date}
                  <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                      <Chip label="진행중" color="primary" />
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
                      marginRight: '8px', // 여백 크기 조절
                    },
                  }}
                >
                  {card.tag.map((tag, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <h1 key={index}>{tag}</h1>
                  ))}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">상세보기</Button>
              </CardActions> */}
            </Card>
          </div>
        ))}
      </Box>
      {/* <Button onClick={() => navigate('/survey/main')}>돌아가기</Button> */}

      {/* 선택된 카드에 대한 모달 */}
      <Modal
        open={openModal}
        onClose={closeCardModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
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
              width: '350px', // 너비 조정
              height: '500px', // 높이 조정
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
    </div>
    // </Container>
  );
}

export default SurveyCard;

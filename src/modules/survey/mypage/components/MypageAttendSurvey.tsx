/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 사용자의 마이페이지를 위한 컴포넌트입니다. 사용자가 참여한 설문 목록을 보여주고,
 * 각 설문에 대해 상태를 필터링하거나 검색할 수 있는 기능을 제공합니다.
 *
 * @component
 * @author 박창우
 */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

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
import FaceIcon from '@mui/icons-material/Face';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import axios from '../../../login/components/customApi';

interface CardData {
  userNo: any;
  surveyNo: number;
  surveyTitle: string;
  tagNames: string[];
  surveyDescription: string;
  attendeeCount: number;
  surveyStatusNo: number;
  surveyCreatedAt: string;
  surveyClosingAt: string;
  surveyPostAt: string;
  openStatusNo: number;
  userNickname: string;
}

/**
 * 설문의 상태 번호에 따라 해당하는 상태 텍스트를 반환합니다.
 *
 * @param {number} surveyStatusNo 설문의 상태 번호
 * @returns {string} 설문 상태를 나타내는 텍스트
 */
function getStatusText(surveyStatusNo: number) {
  switch (surveyStatusNo) {
    case 1:
      return '작성 중';
    case 2:
      return '진행 중';
    case 3:
      return '마감';
    default:
      return '';
  }
}

/**
 * 설문의 상태 번호에 따라 해당하는 칩 색상을 반환합니다.
 *
 * @param {number} surveyStatusNo 설문의 상태 번호
 * @returns {string} Material UI 칩 컴포넌트에 사용될 색상
 */
function getChipColor(surveyStatusNo: number) {
  switch (surveyStatusNo) {
    case 1:
      return 'primary';
    case 2:
      return 'secondary';
    default:
      return 'default';
  }
}

/**
 * 설문의 상태 번호에 따라 해당하는 카드 색상을 반환합니다.
 *
 * @param {number} surveyStatusNo 설문의 상태 번호
 * @returns {string} 카드 배경에 사용될 색상
 */
function getCardColor(surveyStatusNo: number) {
  switch (surveyStatusNo) {
    case 1:
      return 'rgba(51, 122, 255, 0.1)';
    case 2:
      return 'rgba(153, 102, 255, 0.1)';
    case 3:
      return 'rgba(128, 128, 128, 0.1)';
    default:
      return 'rgba(0, 0, 0, 0.5)';
  }
}

function Mypage() {
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const [state, setState] = useState('전체');

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  /**
   * 서버로부터 사용자가 참여한 설문 데이터를 가져와 상태를 업데이트합니다.
   */
  const fetchCardData = () => {
    const loggedInUserNo = localStorage.getItem('userNo');

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/my-surveys/attend-surveys`)
      .then((response) => {
        const cardData: CardData[] = response.data.content || [];

        let filtered = cardData.filter(
          (card) => card.userNo.toString() === loggedInUserNo
        );
        if (state !== '전체') {
          const filterStatus = parseInt(state, 10);
          filtered = cardData.filter(
            (card) => card.surveyStatusNo === filterStatus
          );
        }

        if (searchQuery) {
          const lowercaseQuery = searchQuery.toLowerCase();

          filtered = filtered.filter((card) => {
            const lowercaseTitle = card.surveyTitle.toLowerCase();
            const lowercaseTags = card.tagNames.map((tag) => tag.toLowerCase());

            let allCharsFound = true;

            lowercaseQuery.split('').forEach((char) => {
              if (
                !lowercaseTitle.includes(char) &&
                !lowercaseTags.some((tag) => tag.includes(lowercaseQuery))
              ) {
                allCharsFound = false;
              }
            });

            return allCharsFound;
          });
        }

        setFilteredData(filtered);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchCardData();
  }, [state, searchQuery]);

  /**
   * 사용자가 검색 입력란에 입력할 때마다 호출되어 검색 쿼리 상태를 업데이트합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event 입력 이벤트
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    fetchCardData();
  };

  /**
   * 카드를 클릭했을 때 모달을 열어 해당 설문의 상세 정보를 보여줍니다.
   *
   * @param {CardData} card 사용자가 클릭한 설문 데이터
   */
  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  /**
   * 모달을 닫고 선택된 설문의 상태를 초기화합니다.
   */
  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1
        style={{
          fontSize: '25px',
        }}
      >
        내가 참여한 설문 목록
      </h1>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '15px',
          marginTop: '15px',
          gap: { xs: 1, sm: 1 }, // 간격 일관성 유지
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '100px', // 모든 화면 크기에서 너비 100px 고정
            height: '35px',
          }}
          onClick={() => {
            setState('전체');
            setSearchQuery('');
            fetchCardData();
          }}
        >
          초기화
        </Button>
        <FormControl sx={{ width: '100px', height: '35px' }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={state}
            onChange={handleChange}
            sx={{ width: '100%', height: '100%' }}
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value={1}>작성 중</MenuItem>
            <MenuItem value={2}>진행 중</MenuItem>
            <MenuItem value={3}>마감</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50px',
          marginBottom: '20px',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="제목 또는 태그를 입력해주세요"
            inputProps={{ 'aria-label': '제목 또는 태그를 입력해주세요' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      </div>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: { xs: 2, sm: 4, md: 10.5 },
          height: '100%',
        }}
      >
        {filteredData.map((card) => (
          <div
            key={card.surveyNo}
            onClick={() => openCardModal(card)}
            onKeyPress={() => openCardModal(card)}
            role="button"
            tabIndex={0}
          >
            <Card
              sx={{
                minWidth: 100,
                maxWidth: 150,
                minHeight: 80,
                backgroundColor: getCardColor(card.surveyStatusNo),
              }}
            >
              <CardContent
                sx={{
                  padding: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  paddingBottom="12px"
                  width="140px"
                  height="30px"
                >
                  <Chip
                    icon={
                      <FaceIcon
                        sx={{
                          fontSize: '15px',
                        }}
                      />
                    }
                    label={card.attendeeCount}
                    variant="outlined"
                    sx={{
                      fontSize: '12px',
                      width: '60px',
                      height: '20px',
                      fontWeight: 600,
                      justifyContent: 'space-between',
                    }}
                  />

                  <Chip
                    label={getStatusText(card.surveyStatusNo)}
                    color={getChipColor(card.surveyStatusNo)}
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
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}
                >
                  마감: {card.surveyClosingAt}
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: '8px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {card.surveyTitle}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 11,
                    '& > span:not(:last-child)': {
                      marginRight: '8px',
                    },
                  }}
                >
                  {card.tagNames.map((tag, index, array) => (
                    <React.Fragment key={tag}>
                      #{tag}
                      {index !== array.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    paddingTop: '12px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  작성자: {card.userNickname}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
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
            <h2 id="modal-title">
              {selectedCard ? selectedCard.surveyTitle : ''}
            </h2>
            <p>
              날짜:{' '}
              {selectedCard
                ? `${selectedCard.surveyCreatedAt.replace(
                    '~',
                    ''
                  )} ~ ${selectedCard.surveyClosingAt.replace('~', '')}`
                : ''}
            </p>

            <p>작성자: {selectedCard ? selectedCard.userNickname : ''}</p>
            <p>태그: {selectedCard ? selectedCard.tagNames.join(', ') : ''}</p>
            <p>참석자 수: {selectedCard ? selectedCard.attendeeCount : ''}</p>
            <p id="modal-description">
              {selectedCard ? selectedCard.surveyDescription : ''}
            </p>

            {selectedCard && selectedCard.surveyStatusNo === 1 && (
              <>
                <Button>수정하기</Button>
                <Button>게시하기</Button>
              </>
            )}

            {selectedCard &&
              (selectedCard.surveyStatusNo === 2 ||
                selectedCard.surveyStatusNo === 3) && <Button>통계보기</Button>}

            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Mypage;

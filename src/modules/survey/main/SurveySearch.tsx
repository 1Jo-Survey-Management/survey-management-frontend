import Container from '@mui/material/Container';
import Floating from './components/Floating';
import SurveyCard from './components/Card';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import '.global.css';
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
import { useNavigate } from 'react-router-dom';
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

function SurveySearch() {
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [selectedState, setSelectedState] = useState<string>('전체(모든 카드)');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
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
  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily: fontFamily,
  };

  const [cardList, setCardList] = useState<CardData[]>([]);
  useEffect(() => {
    const data = async () => {
      const card = await axios.get('http://localhost:8080/survey/surveyall');
      console.log(card);
      setCardList(card.data);
    };
    data();
  }, []);

  const handleSearchOptionChange = (
    event: SelectChangeEvent<string | string[]>
  ) => {
    const newValue = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value];
    setSearchOptions(newValue);
  };

  const handleSearch = () => {
    const filtered = cardList.filter((card) => {
      const includesOption =
        searchOptions.length === 0 ||
        searchOptions.some((option) => card.tag.includes(option));
      const includesSearchTerm =
        card.surveyTitle.includes(searchTerm) ||
        card.userNickName.includes(searchTerm);
      const matchesState =
        selectedState === '전체(모든 카드)' ||
        card.surveyStatusName === selectedState;

      return includesOption && includesSearchTerm && matchesState;
    });

    const sortedCardData = [...filtered].sort((a, b) => {
      const dateA = new Date(a.surveyPostAt).getTime();
      const dateB = new Date(b.surveyPostAt).getTime();

      if (dateA === dateB) {
        return 0;
      }
      return dateA > dateB ? -1 : 1;
    });

    setFilteredData(sortedCardData);
  };

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1 style={textStyle}>전체 설문</h1>
      {/* <SurveyCard /> */}

      {/* 검색어 입력란 */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 300,
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
          }}
          aria-label="제목, 작성자를 입력해주세요"
          placeholder="제목, 작성자를 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* 상태 선택 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '300px',
          marginBottom: '15px',
          marginTop: '15px',
        }}
      >
        <Select
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value as string)}
          inputProps={{
            'aria-label': '상태 선택',
          }}
          sx={{
            height: '35px',
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom', // 메뉴 박스가 Select 아래에 표시
              horizontal: 'left', // 메뉴 박스가 Select 왼쪽에 표시
            },
            transformOrigin: {
              vertical: 'top', // 메뉴 박스가 메뉴 아이템 위에 표시
              horizontal: 'left', // 메뉴 박스가 메뉴 아이템 왼쪽에 표시
            },
          }}
        >
          <MenuItem value="전체(모든 카드)">전체</MenuItem>
          <MenuItem value="진행">진행중</MenuItem>
          <MenuItem value="작성">작성중</MenuItem>
          <MenuItem value="마감">마감</MenuItem>
        </Select>

        <Button
          variant="outlined"
          sx={{
            height: '35px',
          }}
          onClick={() => {
            // 초기화 버튼 클릭 시 검색 옵션 및 검색어 초기화
            setSearchOptions([]);
            setSearchTerm('');
            setSelectedState('전체(모든 카드)');

            // 모든 카드 데이터로 필터링 초기화
            const sortedCardData = [...cardList].sort((a, b) => {
              const dateA = new Date(a.surveyPostAt).getTime();
              const dateB = new Date(b.surveyPostAt).getTime();

              if (dateA === dateB) {
                return 0;
              }
              return dateA > dateB ? -1 : 1;
            });

            setFilteredData(sortedCardData);
          }}
        >
          초기화
        </Button>
      </div>

      {/* 카드 목록 */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '8px',
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
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-around"
                  paddingBottom="12px"
                >
                  <Chip
                    icon={
                      <FaceIcon
                        sx={{
                          fontSize: '15px',
                        }}
                      />
                    }
                    label={card.surveyAttendCount}
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
                    label={card.surveyStatusName}
                    color={getChipColor(card.surveyStatusName)} // 상태에 따른 색상 사용
                    sx={{
                      width: '50px',
                      height: '20px',
                      fontSize: '10px',
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        padding: 0,
                      },
                    }}
                    style={textStyle}
                  />
                </Stack>
                {/* 카드 내용 */}
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
                  {card.surveyPostAt}
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
                {/* 작성자 표시 */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 11,
                    '& > span:not(:last-child)': {
                      marginRight: '8px',
                    },
                  }}
                />
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
                  {/* {card.tag.map((tag, index, array) => (
                    <React.Fragment key={tag}>
                      {tag}
                      {index !== array.length - 1 && ', '}
                    </React.Fragment>
                  ))} */}
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
              날짜:
              {selectedCard ? selectedCard.surveyPostAt : ''}~{' '}
              {selectedCard ? selectedCard.surveyClosingAt : ''}
            </p>

            <p>작성자: {selectedCard ? selectedCard.userNickName : ''}</p>
            <p>태그: {selectedCard ? selectedCard.tag : ''}</p>
            <p>
              참석자 수: {selectedCard ? selectedCard.surveyAttendCount : ''}
            </p>
            <p id="modal-description">
              {selectedCard ? selectedCard.surveyDiscription : ''}
            </p>
            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>

      <Floating />
    </Container>
  );
}

export default SurveySearch;

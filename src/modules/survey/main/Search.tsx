import Container from '@mui/material/Container';
import Floating from './components/Floating';
import SurveyCard from './components/Card';
import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import '../../../global.css';

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
import GroupsIcon from '@mui/icons-material/Groups';
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
  tag: Array<string>;
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

  const [ref, isView] = useInView();
  const [page, setPage] = useState(1);

  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily: fontFamily,
  };
  const [cardList, setCardList] = useState<CardData[]>([]);
  const getData = useCallback(async () => {
    // 서버에서는 한 페이지당 3개의 데이터를 보내준다
    await axios
      .get(`http://localhost:8080/survey/surveyall?_page=${page}&_limit=3`)
      .then((res) => {
        // 기존 데이터에 새로 불러온 데이터를 합치고 page를 + 1시킴
        setCardList([...res.data, ...cardList]);
        setPage(page + 1);
      });
  }, [isView]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isView) {
      getData();
    }
  }, [isView]);
  // useEffect(() => {
  //   const data = async () => {
  //     if (selectedState === '전체(모든 카드)') {
  //       const card = await axios.get(`http://localhost:8080/survey/surveyall`);

  //       setCardList(card.data);
  //       setFilteredData(card.data);
  //       console.log(card.data);
  //     } else if (selectedState === '진행') {
  //       const card = await axios.get(
  //         `http://localhost:8080/survey/select-post`
  //       );

  //       setCardList(card.data);
  //       setFilteredData(card.data);
  //       console.log(card.data);
  //     } else if (selectedState === '마감') {
  //       const card = await axios.get(
  //         `http://localhost:8080/survey/select-closing`
  //       );

  //       setCardList(card.data);
  //       setFilteredData(card.data);
  //       console.log(card.data);
  //     }
  //   };
  //   data();
  // }, [selectedState]);

  useEffect(() => {
    const sortedCardData = [...cardList].sort((a, b) => {
      // 날짜 형식을 startDate 객체로 변환
      const dateA = new Date(a.surveyPostAt.replace('~', ''));
      const dateB = new Date(b.surveyPostAt.replace('~', ''));

      if (a.surveyStatusName === '마감' && b.surveyStatusName !== '마감') {
        return 1; // a가 "마감"이고 b가 "마감"이 아닌 경우, a가 b보다 뒤에 위치
      }
      if (a.surveyStatusName !== '마감' && b.surveyStatusName === '마감') {
        return -1; // a가 "마감"이 아니고 b가 "마감"인 경우, a가 b보다 앞에 위치
      }

      // startDate 객체를 비교하여 정렬
      if (dateA === dateB) {
        return 0;
      }
      return dateA < dateB ? -1 : 1;
    });

    setFilteredData(sortedCardData);
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
      const includesSearchTerm =
        card.surveyTitle.includes(searchTerm) ||
        card.userNickName.includes(searchTerm) ||
        card.tag.includes(searchTerm);
      const matchesState =
        selectedState === '전체(모든 카드)' ||
        card.surveyStatusName === selectedState;

      return includesSearchTerm && matchesState;
    });

    const filteredWithoutInProgress =
      selectedState === '마감'
        ? filtered.filter((card) => card.surveyStatusName !== '진행')
        : filtered;

    const sortedCardData = [...filteredWithoutInProgress].sort((a, b) => {
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
          <MenuItem value="진행">진행</MenuItem>
          <MenuItem value="마감">마감</MenuItem>
        </Select>

        <Button
          style={textStyle}
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
              const dateA = a.surveyPostAt;
              const dateB = b.surveyPostAt;

              // 문자열로 된 날짜를 직접 비교
              if (dateA === dateB) {
                return 0;
              }
              return dateA < dateB ? -1 : 1;
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
              variant="outlined"
              sx={{
                minWidth: 100,
                maxWidth: 150,
                minHeight: 80,
                border: 2,
                borderColor: '#BCBCBC',
                borderRadius: 5,
              }}
              style={textStyle}
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
                      <GroupsIcon
                        sx={{
                          fontSize: '15px',
                        }}
                      />
                    }
                    label={card.surveyAttendCount}
                    // variant="outlined"
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
                    color={getChipColor(card.surveyStatusName)} // 상태에 따른 색상 사용
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
                    fontFamily: fontFamily,
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
                  {card.surveyNo}
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
                  style={textStyle}
                >
                  {card.tag &&
                    card.tag.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}
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
            <h2 id="modal-title" style={textStyle}>
              {selectedCard ? selectedCard.surveyTitle : ''}
            </h2>
            <p style={textStyle}>
              날짜:
              {selectedCard ? selectedCard.surveyPostAt.slice(0, 10) : ''}~{' '}
              {selectedCard ? selectedCard.surveyClosingAt.slice(0, 10) : ''}
            </p>

            <p style={textStyle}>
              작성자: {selectedCard ? selectedCard.userNickName : ''}
            </p>
            <p style={textStyle}>
              태그: {selectedCard ? selectedCard.tag : ''}
            </p>
            <p style={textStyle}>
              참석자 수: {selectedCard ? selectedCard.surveyAttendCount : ''}
            </p>
            <p id="modal-description" style={textStyle}>
              {selectedCard ? selectedCard.surveyDiscription : ''}
            </p>
            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>
      <div ref={ref}></div>
      <Floating />
    </Container>
  );
}

export default SurveySearch;

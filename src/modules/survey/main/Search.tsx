import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import '../../../global.css';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import Floating from './components/Floating';

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

function SurveySearch(this: any) {
  const navigate = useNavigate();
  // const [searchOptions, setSearchOptions] = useState<string[]>([]);
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
    fontFamily,
  };
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const next = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedState === '전체(모든 카드)') {
        const response = await axios.get(
          `http://localhost:8080/surveys/surveyall?page=${page}`
        );
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }

        if (page === 0) {
          setFilteredData(response.data);
        } else {
          setFilteredData((prevData) => [...prevData, ...response.data]);
        }
      } else if (selectedState === '진행') {
        const response = await axios.get(
          `http://localhost:8080/surveys/select-post?page=${page}`
        );

        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }

        if (page === 0) {
          setFilteredData(response.data);
        } else {
          setFilteredData((prevData) => [...prevData, ...response.data]);
        }
      } else if (selectedState === '마감') {
        const response = await axios.get(
          `http://localhost:8000/surveys/select-closing?page=${page}`
        );

        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }

        if (page === 0) {
          setFilteredData(response.data);
        } else {
          setFilteredData((prevData) => [...prevData, ...response.data]);
        }
      }
    };

    fetchData();
  }, [page, selectedState]);

  // useEffect(() => {
  //   const sortedCardData = [...filteredData].sort((a, b) => {
  //     // 날짜 형식을 startDate 객체로 변환
  //     const dateA = new Date(a.surveyPostAt.replace('~', ''));
  //     const dateB = new Date(b.surveyPostAt.replace('~', ''));

  //     if (a.surveyStatusName === '마감' && b.surveyStatusName !== '마감') {
  //       return 1; // a가 "마감"이고 b가 "마감"이 아닌 경우, a가 b보다 뒤에 위치
  //     }
  //     if (a.surveyStatusName !== '마감' && b.surveyStatusName === '마감') {
  //       return -1; // a가 "마감"이 아니고 b가 "마감"인 경우, a가 b보다 앞에 위치
  //     }

  //     // startDate 객체를 비교하여 정렬
  //     if (dateA === dateB) {
  //       return 0;
  //     }
  //     return dateA < dateB ? -1 : 1;
  //   });

  //   setFilteredData(sortedCardData);
  // }, []);

  // const handleSearchOptionChange = (
  //   event: SelectChangeEvent<string | string[]>
  // ) => {
  //   const newValue = Array.isArray(event.target.value)
  //     ? event.target.value
  //     : [event.target.value];
  //   setSearchOptions(newValue);
  // };

  const removePage = () => {
    setPage(0);
    setHasMore(true);
  };

  const handleSearch = () => {
    const filtered = filteredData.filter((card) => {
      const includesSearchTerm =
        card.surveyTitle.includes(searchTerm) ||
        card.userNickName.includes(searchTerm) ||
        card.tag.includes(searchTerm);
      const matchesState =
        selectedState === '전체(모든 카드)' ||
        card.surveyStatusName === selectedState;

      return includesSearchTerm && matchesState;
    });

    // const filteredWithoutInProgress =
    //   selectedState === '마감'
    //     ? filtered.filter((card) => card.surveyStatusName !== '진행')
    //     : filtered;

    // const sortedCardData = [...filteredWithoutInProgress].sort((a, b) => {
    //   const dateA = new Date(a.surveyPostAt);
    //   const dateB = new Date(b.surveyPostAt);

    //   if (dateA === dateB) {
    //     return 0;
    //   }
    //   return dateA > dateB ? -1 : 1;
    // });

    // setFilteredData(sortedCardData);
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
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          <MenuItem value="전체(모든 카드)" onClick={removePage}>
            전체
          </MenuItem>
          <MenuItem value="진행" onClick={removePage}>
            진행
          </MenuItem>
          <MenuItem value="마감" onClick={removePage}>
            마감
          </MenuItem>
        </Select>

        <Button
          style={textStyle}
          variant="outlined"
          sx={{
            height: '35px',
          }}
          onClick={() => {
            // 초기화 버튼 클릭 시 검색 옵션 및 검색어 초기화
            // setSearchOptions([]);/
            setSearchTerm('');
            removePage();
            setSelectedState('전체(모든 카드)');

            // 모든 카드 데이터로 필터링 초기화
            const sortedCardData = [...filteredData].sort((a, b) => {
              const dateA = a.surveyPostAt;
              const dateB = b.surveyPostAt;

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
      <InfiniteScroll
        dataLength={filteredData.length}
        next={next}
        hasMore={hasMore}
        loader={<h4>loading</h4>}
      >
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
                      card.tag.map((tag) => <span key={tag}>#{tag}</span>)}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      </InfiniteScroll>
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
              {selectedCard ? selectedCard.surveyPostAt : ''}~{' '}
              {selectedCard ? selectedCard.surveyClosingAt : ''}
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
            <Button onClick={() => navigate('/survey/Search')}>결과보기</Button>
            <Button onClick={() => navigate('/survey/Search')}>참여하기</Button>
            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>

      <Floating />
    </Container>
  );
}

export default SurveySearch;

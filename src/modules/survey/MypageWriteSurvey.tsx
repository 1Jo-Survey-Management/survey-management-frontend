import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';

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
  id: number;
  startDate: string;
  finishDate: string;
  title: string;
  tag: string[];
  description: string;
  people: number;
  writer: string;
  state: string;
};

function Mypage() {
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [selectedState, setSelectedState] = useState<string>('전체(모든 카드)');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const getChipColor = (state: string) => {
    switch (state) {
      case '진행중':
        return 'primary';
      case '작성중':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const cardData: CardData[] = [
    {
      id: 1,
      startDate: '~2023-08-23',
      finishDate: '~2023-09-11',
      title: 'WEHAGO 만족도 조사',
      tag: ['#태그1', '#태그5'],
      description: '모달 시험 문구.',
      people: 50,
      writer: 'John Doe',
      state: '진행중',
    },
    {
      id: 2,
      startDate: '~2023-09-13',
      finishDate: '~2023-09-17',
      title: 'Word of the Day 2',
      tag: ['#태그2', '#태그4'],
      description: '이 설문에 대한 설명 문구입니다.',
      people: 100,
      writer: 'Alice Smith',
      state: '마감',
    },
    {
      id: 3,
      startDate: '~2023-08-29',
      finishDate: '~2023-09-13',
      title: 'Word of the Day 2',
      tag: ['#태그2'],
      description: '이 설문에 대한 설명 문구입니다.',
      people: 2,
      writer: 'Alice Smith',
      state: '진행중',
    },
    {
      id: 4,
      startDate: '~2023-08-21',
      finishDate: '~2023-09-12',
      title: 'Word of the Day 2',
      tag: ['#태그3', '#태그1'],
      description: '이 설문에 대한 설명 문구입니다.',
      people: 2,
      writer: 'Galio',
      state: '작성중',
    },
    // 나머지 데이터 생략...
  ];

  // 페이지가 로드될 때 모든 카드 데이터를 최신 날짜순으로 정렬하고 filteredData에 설정
  useEffect(() => {
    const sortedCardData = [...cardData].sort((a, b) => {
      // 날짜 형식을 startDate 객체로 변환
      const dateA = new Date(a.startDate.replace('~', ''));
      const dateB = new Date(b.startDate.replace('~', ''));

      if (a.state === '마감' && b.state !== '마감') {
        return 1; // a가 "마감"이고 b가 "마감"이 아닌 경우, a가 b보다 뒤에 위치
      }
      if (a.state !== '마감' && b.state === '마감') {
        return -1; // a가 "마감"이 아니고 b가 "마감"인 경우, a가 b보다 앞에 위치
      }

      // startDate 객체를 비교하여 정렬
      if (dateA.getTime() === dateB.getTime()) {
        return 0;
      }
      return dateA.getTime() > dateB.getTime() ? 1 : -1;
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
    const filtered = cardData.filter((card) => {
      const includesOption =
        searchOptions.length === 0 ||
        searchOptions.some((option) => card.tag.includes(option));
      const includesSearchTerm =
        card.title.includes(searchTerm) || card.writer.includes(searchTerm);
      const matchesState =
        selectedState === '전체(모든 카드)' || card.state === selectedState;

      return includesOption && includesSearchTerm && matchesState;
    });

    const sortedCardData = [...filtered].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

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
      <h1
        style={{
          fontSize: '25px',
        }}
      >
        내가 작성한 설문 목록
      </h1>

      {/* 검색 옵션 선택 */}
      <Select
        multiple
        value={searchOptions}
        onChange={handleSearchOptionChange}
        inputProps={{
          'aria-label': '검색 옵션',
        }}
        renderValue={(selected) => (selected as string[]).join(', ')}
        sx={{
          fontSize: '13px',
          height: '30px',
          minWidth: '300px',
          '& .MuiSelect-select.MuiSelect-multiple': {
            minWidth: '150px',
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              minWidth: '300px',
              minHeight: '250px',
            },
          },
        }}
      >
        {/* 옵션 메뉴 아이템들 */}
        <MenuItem value="#태그1" sx={{ height: '40px' }}>
          태그1
        </MenuItem>
        <MenuItem value="#태그2" sx={{ height: '40px' }}>
          태그2
        </MenuItem>
        <MenuItem value="#태그3" sx={{ height: '40px' }}>
          태그3
        </MenuItem>
        <MenuItem value="#태그4" sx={{ height: '40px' }}>
          태그4
        </MenuItem>
        <MenuItem value="#태그5" sx={{ height: '40px' }}>
          태그5
        </MenuItem>
      </Select>

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
          <MenuItem value="진행중">진행중</MenuItem>
          <MenuItem value="작성중">작성중</MenuItem>
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
            const sortedCardData = [...cardData].sort((a, b) => {
              const dateA = new Date(a.startDate).getTime();
              const dateB = new Date(b.startDate).getTime();

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
            key={card.id}
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
                    label={card.people}
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
                    label={card.state}
                    color={getChipColor(card.state)} // 상태에 따른 색상 사용
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
                  {card.startDate}
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

      {/* 돌아가기 버튼 */}
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
            <p>
              날짜:{' '}
              {selectedCard
                ? `${selectedCard.startDate.replace(
                    '~',
                    ''
                  )} ~ ${selectedCard.finishDate.replace('~', '')}`
                : ''}
            </p>

            <p>작성자: {selectedCard ? selectedCard.writer : ''}</p>
            <p>태그: {selectedCard ? selectedCard.tag.join(', ') : ''}</p>
            <p>참석자 수: {selectedCard ? selectedCard.people : ''}</p>
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

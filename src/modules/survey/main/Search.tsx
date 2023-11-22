import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import '../../../global.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
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
  Divider,
  Alert,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import FaceIcon from '@mui/icons-material/Face';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import Swal from 'sweetalert2';
import axios from '../../login/components/customApi';
import Floating from './components/Floating';

type CardData = {
  surveyNo: number;
  surveyTitle: string;
  surveyDescription: string;
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
  attendCheckList: boolean[];
};

function SurveySearch() {
  const showSwalAlert = () => {
    Swal.fire({
      icon: 'warning',
      title: '설문 참여자가 아직 없습니다.',
      customClass: {
        popup: 'swal-custom-popup',
        container: 'swal-custom-container',
      },
    });
  };

  // style 태그를 사용해 커스텀 스타일 정의
  const customStyles = `
    .swal-custom-popup {
      z-index: 1500; // 필요한 z-index 값
    }
    .swal-custom-container {
      z-index: 1500; // 필요한 z-index 값
    }
  `;

  const navigate = useNavigate();
  // const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [selectedState, setSelectedState] = useState<string>('전체(모든 카드)');
  const [openModal, setOpenModal] = useState(false);
  const [allData, setAllData] = useState<CardData[]>([]);

  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const getChipColor = (surveyStatusName: string) => {
    switch (surveyStatusName) {
      case '진행':
        return '#000000';
      case '작성':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const fontFamily = 'nanumsquare';
  const contentFont = 'GmarketSansMedium';
  const textStyle = {
    fontFamily,
    contentFont,
  };

  const modalSubText = {
    fontSize: '15px',
    marginBottom: '10px',
    color: '#858585',
  };

  const titleStyle = {
    display: 'flex',
    fontFamily,
    textOverflow: 'ellipsis',
    justifyContent: 'center',
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
          `${process.env.REACT_APP_BASE_URL}/api/surveys/surveyall?page=${page}`
        );
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }

        const newData = response.data;

        if (page === 0) {
          setFilteredData(newData);
          setAllData(newData); // 전체 데이터 업데이트
        } else {
          setFilteredData((prevData) => [...prevData, ...newData]);
          setAllData((prevData) => [...prevData, ...newData]);
        }
      } else if (selectedState === '진행') {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/surveys/select-post?page=${page}`
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
          `${process.env.REACT_APP_BASE_URL}/api/surveys/select-closing?page=${page}`
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

  const removePage = () => {
    setPage(0);
    setHasMore(true);
  };

  const numUser = () => {
    const loginUserNo = localStorage.getItem('userNo');
    const numUserNo =
      loginUserNo !== null && loginUserNo !== undefined
        ? Number(loginUserNo)
        : null;
    // numUserNo를 사용하거나 처리하는 코드 추가
    return numUserNo;
  };
  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
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
  const handleSearch = () => {
    if (!searchTerm) {
      // 검색어가 비어있으면 전체 설문을 다시 불러옵니다.
      removePage();
      setFilteredData(allData); // 전체 데이터로 초기화
      return;
    }

    // 검색어가 있는 경우, 로컬에서 필터링합니다.
    const filteredResults = allData.filter(
      (card: CardData) =>
        card.surveyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tagName.includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredResults);
    setPage(0); // 검색 결과가 변경되면 페이지를 초기화합니다.
  };

  const handleIconClick = () => {
    closeCardModal();
  };

  const resetData = async () => {
    // Reset data to initial state
    setPage(0);
    setHasMore(true);

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/surveys/surveyall?page=0`
    );

    if (response.data.length === 0) {
      setHasMore(false);
      return;
    }

    const sortedCardData = [...response.data].sort((a, b) => {
      const dateA = new Date(a.surveyPostAt);
      const dateB = new Date(b.surveyPostAt);

      if (dateA === dateB) {
        return 0;
      }
      return dateA > dateB ? -1 : 1;
    });

    setFilteredData(sortedCardData);
  };

  return (
    <div>
      <style>{customStyles}</style>

      <Typography
        component="div"
        sx={{
          marginTop: '30px',
          fontSize: 30,
          fontWeight: 600,
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          fontFamily: contentFont,
          '@media (max-width: 600px)': {
            fontSize: 24,
          },
        }}
      >
        전체 설문
      </Typography>
      <div className="search-container">
        {/* 검색어 입력란 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '35px',
            marginBottom: '20px',
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
              borderColor: '#747474',
              borderRadius: '5px',
              color: '#3e3e3e',
              marginRight: '10px',
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
            <MenuItem
              style={textStyle}
              value="전체(모든 카드)"
              onClick={removePage}
              sx={{ fontStyle: textStyle.fontFamily }}
            >
              전체
            </MenuItem>
            <MenuItem style={textStyle} value="진행" onClick={removePage}>
              진행
            </MenuItem>
            <MenuItem style={textStyle} value="마감" onClick={removePage}>
              마감
            </MenuItem>
          </Select>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              height: '35px',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, height: '35px' }}
              placeholder="제목, 작성자를 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // 기본 엔터 동작 막기
                  handleSearch();
                }
              }}
            />
            <IconButton
              type="button"
              sx={{
                p: '10px',
                '&:hover': {
                  backgroundColor: '#747474',
                  color: '#FFFFFF',
                },
              }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '15px',
            marginTop: '15px',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              height: '35px',
              border: 1,
              borderColor: '#c5c5c5',
              color: '#3e3e3e',
              borderRadius: '5px',
              width: '75px',
              fontSize: '15px',
              padding: 0,
              '&:hover': {
                backgroundColor: '#747474',
                borderColor: '#3E3E3E',
                color: '#ffffff',
              },
            }}
            onClick={() => {
              // 초기화 버튼 클릭 시 검색 옵션 및 검색어 초기화
              // setSearchOptions([]);
              setSearchTerm('');
              removePage();
              setSelectedState('전체(모든 카드)');
              resetData();
            }}
          >
            초기화
          </Button>
        </div>
      </div>

      {/* 카드 목록 */}
      <InfiniteScroll
        dataLength={filteredData.length}
        next={next}
        hasMore={hasMore}
        loader={null}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: '31px',
            height: '100%',
            marginBottom: '5px',
            '@media (max-width: 600px)': {
              gap: '15px',
              justifyContent: 'space-between', // 작은 화면 크기일 때의 gap 크기
            },
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
                className="card-size"
                variant="elevation"
                sx={{
                  marginLeft: '5px',
                  width: '160px',
                  height: '180px',
                  borderRadius: 2,
                  backgroundColor: '#F9F9F9',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  '@media (max-width: 600px)': {
                    width: '152px',
                    height: '170px',
                    marginRight: '7px',
                  },
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
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    paddingBottom="12px"
                  >
                    <Chip
                      label={card.surveyAttendCount}
                      sx={{
                        fontSize: '12px',
                        width: '60px',
                        height: '20px',
                        fontWeight: 600,
                        justifyContent: 'space-between',
                        backgroundColor: '#F9F9F9',
                        boxShadow: 'inset 0px 0px 3px rgba(0, 0, 0, 0.3)',
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
                      variant="outlined"
                      sx={{
                        width: '40px',
                        height: '20px',
                        fontSize: '10px',
                        fontWeight: 600,
                        '& .MuiChip-label': {
                          padding: 0,
                        },
                        backgroundColor: '#F9F9F9',
                        // boxShadow: 'inset 0px 0px 3px rgba(0, 0, 0, 0.3)',
                        color: getChipColor(card.surveyStatusName),
                      }}
                      style={textStyle}
                    />
                  </Stack>
                  {/* 카드 내용 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      fontSize: 12,
                      color: 'text.secondary',
                      fontWeight: 600,
                      marginBottom: '5px',
                      fontFamily,
                    }}
                  >
                    <EventAvailableIcon
                      sx={{
                        fontSize: '15px',
                        marginRight: '4px',
                      }}
                    />
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
                      maxHeight: '47px', // 원하는 높이 설정
                      overflow: 'hidden',
                      display: '-webkit-box',
                      height: '47px',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
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
                  <Stack direction="row" spacing={1} sx={{ marginTop: '30px' }}>
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
                          // opacity: 0.7,
                        }}
                      />
                    ))}
                  </Stack>
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
          <div className="modal">
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Chip
                    key="0"
                    label={selectedCard?.openStatusName}
                    size="small"
                    style={textStyle}
                    sx={{
                      fontSize: 14,
                      marginRight: 1,
                      height: '25px',
                      backgroundColor: tagColor('0'),
                      opacity: 0.7,
                    }}
                  />
                  {numUser() === selectedCard?.userNo && (
                    <Chip
                      label="본인 작성"
                      size="small"
                      style={textStyle}
                      sx={{
                        fontSize: 14,
                        marginRight: 1,
                        height: '25px',
                        backgroundColor: tagColor('0'),
                        opacity: 0.7,
                      }}
                    />
                  )}
                </div>
                <ClearTwoToneIcon onClick={handleIconClick} />

                {/* 닫기 아이콘 */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src=""
                  sx={{
                    width: 28,
                    height: 28,
                    marginRight: '8px',
                  }}
                />
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#393939',

                    height: '45px',
                    fontWeight: '700',
                  }}
                >
                  {selectedCard ? selectedCard.userNickName : ''}
                </Typography>
              </Box>
              {/* 설문 조사 타이틀 */}
              <Box sx={titleStyle}>
                <Typography
                  variant="h5"
                  id="modal-title"
                  style={{
                    fontFamily,
                    textOverflow: 'ellipsis',
                    fontWeight: 'bold',
                    paddingBottom: '30px',
                  }}
                >
                  {selectedCard ? selectedCard.surveyTitle : ''}
                </Typography>
              </Box>

              {/* 작성자, 참여자수, 태그들 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                {/* 설문 조사 기간 */}
                <Typography
                  style={modalSubText}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <EventAvailableIcon
                    sx={{
                      fontSize: '18px',
                      marginRight: '4px',
                    }}
                  />{' '}
                  {selectedCard
                    ? ` ${selectedCard.surveyPostAt.slice(0, 10)} ~ ${
                        selectedCard.surveyClosingAt
                      }`
                    : ''}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#808080',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <FaceIcon
                      sx={{
                        fontSize: '20px',
                        marginRight: '8px',
                      }}
                    />{' '}
                    {selectedCard ? selectedCard.surveyAttendCount : ''}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {selectedCard?.tagName.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        style={textStyle}
                        sx={{
                          fontSize: 12,
                          marginRight: 1,
                          height: '25px',
                          backgroundColor: tagColor(tag),
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
              <div className="modal-scroll-box">
                {/* 설문조사 사진 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingBottom: '15px',
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/LoginFig.png`}
                    alt="Naver Button"
                    style={{ width: '100%', height: 'auto' }}
                  />{' '}
                </Box>

                <Typography
                  id="modal-description"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'start',
                    paddingBottom: '15px',
                    fontFamily,
                  }}
                >
                  {selectedCard
                    ? `설문 설명: ${selectedCard.surveyDescription}`
                    : ''}
                </Typography>
              </div>
              <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

              <Box
                sx={{
                  marginTop: '15px',
                  paddingBottom: '15px',
                }}
              >
                {/* 참여하기 제한 조건 */}
                {selectedCard?.attendCheckList &&
                  selectedCard.attendCheckList.includes(false) && (
                    <Alert severity="info">이미 참여한 설문입니다.</Alert>
                  )}

                {selectedCard?.userNo === numUser() &&
                  selectedCard?.openStatusName === '전체 공개' && (
                    <Alert severity="success">본인이 작성한 설문입니다.</Alert>
                  )}
                {selectedCard?.userNo === numUser() &&
                  selectedCard?.openStatusName === '회원 공개' && (
                    <Alert severity="success">본인이 작성한 설문입니다.</Alert>
                  )}

                {selectedCard?.openStatusName === '비공개' &&
                  (numUser() !== selectedCard.userNo ? (
                    <Alert severity="warning">
                      설문 작성자만 볼 수 있습니다.
                    </Alert>
                  ) : (
                    <Alert severity="success">
                      해당 비공개 설문의 작성자입니다.
                    </Alert>
                  ))}

                {selectedCard?.openStatusName === '회원 공개' &&
                  numUser() === null && (
                    <Alert severity="error">
                      설문 결과를 보시려면 로그인해주세요.
                    </Alert>
                  )}

                {numUser() === null &&
                  selectedCard?.openStatusName === '전체 공개' && (
                    <Alert severity="error">
                      설문 참여를 원하시면 로그인해주세요
                    </Alert>
                  )}
              </Box>
              {/* 결과보기, 참여하기 버튼 */}
              {/* 결과보기 버튼 */}
              {(!selectedCard?.openStatusName ||
                selectedCard?.openStatusName === '전체 공개' ||
                (selectedCard?.openStatusName === '비공개' &&
                  numUser() !== null &&
                  numUser() === selectedCard?.userNo) ||
                (selectedCard?.openStatusName === '회원 공개' &&
                  numUser() !== null)) && (
                <Button
                  onClick={() => {
                    if (selectedCard?.surveyAttendCount === 0) {
                      showSwalAlert();
                    } else {
                      navigate(`/survey/statistics/${selectedCard?.surveyNo}`);
                    }
                  }}
                  sx={{
                    width: '100%',
                    marginBottom: '8px',
                    backgroundColor: '#ebebeb',
                    '&:hover': {
                      backgroundColor: 'gray',
                      color: 'white',
                      fontWeight: '900',
                      fontSize: '15px',
                    },
                    color: 'black',
                    fontWeight: '600',
                  }}
                >
                  설문 결과보기
                </Button>
              )}

              {/* 참여하기 버튼 */}
              {numUser() !== null &&
                (!selectedCard?.attendCheckList ||
                  (!selectedCard.attendCheckList.some(
                    (item) => item === false
                  ) &&
                    selectedCard?.userNo !== numUser())) && (
                  <Button
                    onClick={() =>
                      navigate(`/survey/attend/${selectedCard?.surveyNo}`)
                    }
                    sx={{
                      width: '100%',
                      marginBottom: '8px',
                      backgroundColor: '#ebebeb',
                      '&:hover': {
                        backgroundColor: 'gray',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '15px',
                      },
                      color: 'black',
                      fontWeight: '600',
                    }}
                  >
                    설문 참여하기
                  </Button>
                )}
            </Box>
          </div>
        </Fade>
      </Modal>

      <Floating />
    </div>
  );
}

export default SurveySearch;

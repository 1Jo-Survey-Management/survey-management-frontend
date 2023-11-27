/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 사용자의 마이페이지를 위한 컴포넌트입니다. 사용자가 참여한 설문 목록을 보여주고,
 * 각 설문에 대해 상태를 필터링하거나 검색할 수 있는 기능을 제공합니다.
 *
 * @component
 * @author 박창우
 */
import './MypageWriteModal.css';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

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
  Alert,
  IconButton,
  Avatar,
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import Swal from 'sweetalert2';
import axios from '../../../login/components/customApi';
import '../../../../global.css';

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

const customStyles = `
  .swal-custom-popup {
    z-index: 1500; /* 필요한 z-index 값 */
  }
  .swal-custom-container {
    z-index: 1500; /* 필요한 z-index 값 */
  }
`;

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
  surveyAttendCreatedAt: string;
}

const MAIN_PAGE = '/survey/main';
const modalSubText = {
  fontSize: '15px',
  marginBottom: '10px',
  color: '#858585',
};

const fontFamily = 'nanumsquare';
const contentFont = 'GmarketSansMedium';
const textStyle = {
  fontFamily,
  contentFont,
  textOverflow: 'ellipsis',
};

// const titleStyle = {
//   display: 'flex',
//   fontFamily,
//   textOverflow: 'ellipsis',
//   justifyContent: 'center',
// };

/**
 * 설문 상태 번호에 따라 상태 텍스트를 반환합니다.
 *
 * @param {number} surveyStatusNo - 설문의 상태 번호
 * @returns {string} 해당 상태 번호에 대한 텍스트 설명
 */
function getStatusText(surveyStatusNo: number) {
  switch (surveyStatusNo) {
    case 1:
      return '작성';
    case 2:
      return '진행';
    case 3:
      return '마감';
    default:
      return '';
  }
}

function getOpenStatusLabel(openStatusNo: number | undefined) {
  switch (openStatusNo) {
    case 1:
      return '전체 공개';
    case 2:
      return '회원 공개';
    case 3:
      return '비공개';
    default:
      return '';
  }
}

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

/**
 * 설문 상태 번호에 따라 Material UI Chip 컴포넌트의 색상을 반환합니다.
 *
 * @param {number} surveyStatusNo - 설문의 상태 번호
 * @returns {string} 해당 상태에 맞는 색상 이름
 */
function getChipColor(surveyStatusNo: number) {
  switch (surveyStatusNo) {
    case 1:
      return '#000000';
    case 2:
      return 'secondary';
    default:
      return 'default';
  }
}

/**
 * 설문 상태 번호에 따라 카드 배경색을 반환합니다.
 *
 * @param {number} surveyStatusNo - 설문의 상태 번호
 * @returns {string} 해당 상태에 맞는 배경색
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
  const [allData, setAllData] = useState<CardData[]>([]);

  const [state, setState] = useState('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isUpdateData, setIsUpdateData] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState('');

  const naviagte = useNavigate();

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredData(allData);
      return;
    }

    const filteredResults = allData.filter(
      (card: CardData) =>
        card.surveyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tagNames.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredData(filteredResults);
  };

  // const resetData = async () => {
  //   const loggedInUserNo = localStorage.getItem('userNo');

  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}/api/my-surveys/attend-surveys`
  //   );

  //   const cardData: CardData[] = response.data.content || [];

  //   let filtered = cardData.filter(
  //     (card) => card.userNo.toString() === loggedInUserNo
  //   );

  //   if (state !== '전체') {
  //     const filterStatus = parseInt(state, 10);
  //     filtered = cardData.filter(
  //       (card) => card.surveyStatusNo === filterStatus
  //     );
  //   }

  //   setFilteredData(filtered);
  // };
  const resetData = async () => {
    const loggedInUserNo = localStorage.getItem('userNo');
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/my-surveys/write-surveys`
    );

    const cardData: CardData[] = response.data.content || [];
    const filtered = cardData.filter(
      (card) => card.userNo.toString() === loggedInUserNo
    );

    setFilteredData(filtered);
    setState('전체'); // 상태를 '전체'로 설정
    setSearchTerm(''); // 검색어를 비움
  };

  /**
   * 설문수정 페이지로 리다이렉트 시키는 onClick 메서드 입니다.
   *
   * @param surveyNo 설문 번호
   * @author 강명관
   */
  const handleClickSurveyModify = (surveyNo: number) => {
    naviagte(`/survey/modify/${surveyNo}`);
  };

  /**
   * 설문을 진행 상태에서 게시 상태로 변경하는 API Call 하는 메서드 입니다.
   *
   * @param surveyNo 설문 번호
   * @author 강명관
   */
  const handleClickPostSurvey = async (surveyNo: number) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/surveys/${surveyNo}/post`
      );

      if (response.status === 200) {
        setOpenModal(false);
        setIsUpdateData(true);

        Swal.fire({
          icon: 'success',
          title: '설문 게시가 완료되었습니다!',
        });
        naviagte(MAIN_PAGE);
      } else {
        setOpenModal(false);

        Swal.fire({
          icon: 'error',
          title: '설문 게시에 실패했습니다.',
          text: `설문의 상태 혹은 설문의 마감일을 확인해주세요.`,
        });
      }
    } catch (error) {
      console.error(error);

      setOpenModal(false);
      Swal.fire({
        icon: 'error',
        title: '설문 게시에 실패했습니다.',
        text: `설문의 상태 혹은 설문의 마감일을 확인해주세요.`,
      });
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  /**
   * 선택된 상태나 검색 쿼리에 따라 필터링된 설문 데이터를 서버로부터 가져옵니다.
   */
  const fetchCardData = () => {
    const loggedInUserNo = localStorage.getItem('userNo');
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/my-surveys/attend-surveys`)
      .then((response) => {
        const cardData: CardData[] = response.data.content || [];
        console.log(`카드 데이터: ${response.data.content}`);

        let filtered = cardData.filter(
          (card) => card.userNo.toString() === loggedInUserNo
        );

        if (state !== '전체') {
          const filterStatus = parseInt(state, 10);
          filtered = cardData.filter(
            (card) => card.surveyStatusNo === filterStatus
          );
        }
        setAllData(filtered);
        setFilteredData(filtered);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (isUpdateData) {
      fetchCardData();
    }
  }, [isUpdateData]);

  useEffect(() => {
    fetchCardData();
  }, [state, searchQuery]);

  /**
   * 검색 입력란의 값이 변경될 때 호출되며, 검색 쿼리 상태를 업데이트합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 입력 변경 이벤트
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    fetchCardData();
  };

  /**
   * 설문 카드를 클릭했을 때 모달을 열어 상세 정보를 보여줍니다.
   *
   * @param {CardData} card - 선택된 카드 데이터
   */
  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  /**
   * 모달을 닫고 선택된 설문 상태를 초기화합니다.
   */
  const closeCardModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  /**
   * 삭제 버튼 클릭 시 작성 중인 설문을 삭제합니다.
   */
  const handleDeleteClick = () => {
    if (selectedCard) {
      if (window.confirm('작성 중인 설문을 삭제하시겠습니까?')) {
        const mySurveyDTO = {
          surveyStatusNo: selectedCard.surveyStatusNo,
          surveyNo: selectedCard.surveyNo,
        };
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/api/my-surveys/update-write-surveys`,
            mySurveyDTO
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '설문이 삭제 완료되었습니다!',
            });

            closeCardModal();

            fetchCardData();
          })
          .catch((error) => {
            console.error('설문 삭제 중 오류 발생:', error);
          });
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
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
        내가 참여한 설문 목록
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '15px',
          marginTop: '15px',
          gap: { xs: 1, sm: 1 },
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '100px',
            height: '35px',
          }}
          onClick={() => {
            setSearchTerm('');
            setState('전체');
            resetData();
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
            {/* <MenuItem value={1}>작성 중</MenuItem> */}
            <MenuItem value={2}>진행</MenuItem>
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
            sx={{ ml: 1, flex: 1, height: '35px' }}
            placeholder="제목, 태그를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
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

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: { xs: 2, sm: 3, md: 8.7 },
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
                width: '160px',
                height: '180px',
                borderRadius: 2,
                backgroundColor: '#F9F9F9',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
                      color: getChipColor(card.surveyStatusNo),
                    }}
                  />
                </Stack>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    fontSize: 12,
                    color: 'text.secondary',
                    marginBottom: '5px',
                    fontWeight: 600,
                  }}
                >
                  <EventAvailableIcon
                    sx={{
                      fontSize: '15px',
                      marginRight: '4px',
                    }}
                  />
                  {`참여일: ${card.surveyAttendCreatedAt.split(' ')[0]}`}
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: '8px',
                    cursor: 'pointer',
                    maxHeight: '47px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    height: '47px',
                    WebkitBoxOrient: 'vertical',
                  }}
                  style={textStyle}
                >
                  {card.surveyTitle}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: '600',
                    paddingLeft: '2px',
                  }}
                >
                  작성: {card.userNickname}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 11,
                    '& > span:not(:last-child)': {
                      marginRight: '8px',
                    },
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    marginTop: '10px',
                  }}
                >
                  {card.tagNames.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        fontSize: 11,
                        marginRight: 1,
                        height: '20px',
                        backgroundColor: tagColor(tag),
                      }}
                    />
                  ))}
                </Stack>
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
          <div className="modal">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Chip
                key="0"
                label={getOpenStatusLabel(selectedCard?.openStatusNo)}
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
              <ClearTwoToneIcon
                sx={{ cursor: 'pointer' }}
                onClick={closeCardModal}
              />
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
                {selectedCard ? selectedCard.userNickname : ''}
              </Typography>
            </Box>
            {/* 설문 조사 타이틀 */}
            <Box
              className="titleStyle"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '62.02px',
              }}
            >
              <Typography
                variant="h6"
                id="modal-title"
                style={{
                  fontFamily,
                  textOverflow: 'ellipsis',
                  fontWeight: 'bold',
                  // paddingTop: '15px',
                  marginBottom: '30px',
                  // marginBottom: '35px',
                }}
              >
                {selectedCard ? selectedCard.surveyTitle : ''}
              </Typography>
            </Box>

            {/* 참여자수, 태그들 */}
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
                  ? `기간: ${selectedCard.surveyCreatedAt.slice(0, 10)} ~ ${
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
                  {selectedCard ? selectedCard.attendeeCount : ''}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {selectedCard?.tagNames.map((tag) => (
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
            <Box
              className="modal-scroll-box"
              sx={{
                overflow: 'auto',
                height: '370px',
                '@media screen and (max-width: 600px)': {
                  overflow: 'auto',
                  height: '200px',
                },
              }}
            >
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
                />
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
            </Box>
            <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

            <Box
              sx={{
                marginTop: '15px',
                paddingBottom: '15px',
              }}
            >
              <Alert severity="success">
                {selectedCard?.surveyAttendCreatedAt}에 참여한 설문
              </Alert>
            </Box>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}
            >
              {selectedCard &&
                (selectedCard.surveyStatusNo === 2 ||
                  selectedCard.surveyStatusNo === 3) && (
                  <Button
                    onClick={() => {
                      if (selectedCard?.attendeeCount === 0) {
                        showSwalAlert();
                      } else {
                        naviagte(
                          `/survey/statistics/${selectedCard?.surveyNo}`
                        );
                      }
                    }}
                    sx={{
                      width: '100%',
                      marginBottom: '8px',
                      marginTop: '30px',
                      backgroundColor: '#ebebeb',
                      '&:hover': {
                        backgroundColor: 'gray',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '15px',
                      },
                      color: 'black',
                      fontWeight: '600',
                      '@media (max-width: 600px)': {
                        marginTop: '30px',
                      },
                    }}
                  >
                    설문 결과보기
                  </Button>
                )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '50px',
                }}
              >
                {selectedCard && selectedCard.surveyStatusNo === 1 && (
                  <Button
                    className="modify-button"
                    onClick={() =>
                      handleClickSurveyModify(selectedCard.surveyNo)
                    }
                    sx={{
                      width: '165px',
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
                      '@media (max-width: 600px)': {
                        width: '145px',
                      },
                    }}
                  >
                    수정하기
                  </Button>
                )}
                {selectedCard && selectedCard.surveyStatusNo === 1 && (
                  <Button
                    className="post-button"
                    onClick={() => handleClickPostSurvey(selectedCard.surveyNo)}
                    sx={{
                      width: '165px',
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
                      '@media (max-width: 600px)': {
                        width: '145px',
                      },
                    }}
                  >
                    게시하기
                  </Button>
                )}
              </div>
              {selectedCard && selectedCard.surveyStatusNo === 1 && (
                <Button
                  onClick={() => handleDeleteClick()}
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
                  삭제하기
                </Button>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Mypage;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 사용자의 마이페이지 컴포넌트입니다. 사용자가 작성하거나 참여한 설문의 목록을 보여주고,
 * 상태에 따라 필터링하거나 검색할 수 있는 기능을 제공합니다.
 *
 * @returns {React.ReactElement} 마이페이지 컴포넌트를 렌더링하는 React 엘리먼트
 * @author 박창우
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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

import Swal from 'sweetalert2';
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
  writer: string;
}

const MAIN_PAGE = '/survey/main';

/**
 * 설문 상태 번호에 따라 상태 텍스트를 반환합니다.
 *
 * @param {number} surveyStatusNo - 설문의 상태 번호
 * @returns {string} 해당 상태 번호에 대한 텍스트 설명
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
// function getCardColor(surveyStatusNo: number) {
//   switch (surveyStatusNo) {
//     case 1:
//       return 'rgba(51, 122, 255, 0.1)';
//     case 2:
//       return 'rgba(153, 102, 255, 0.1)';
//     case 3:
//       return 'rgba(128, 128, 128, 0.1)';
//     default:
//       return 'rgba(0, 0, 0, 0.5)';
//   }
// }

const fontFamily = 'GmarketSansMedium';

const textStyle = {
  fontFamily,
};

function Mypage() {
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const [state, setState] = useState('전체');

  const [isUpdateData, setIsUpdateData] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState('');

  const naviagte = useNavigate();

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
      .get(`${process.env.REACT_APP_BASE_URL}/api/my-surveys/write-surveys`)
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
    <Container maxWidth="md" sx={{ paddingLeft: '3px', paddingRight: '3px' }}>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '25px',
          ...textStyle,
        }}
      >
        내가 작성한 설문 목록
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
                    // justifyContent: 'space-between',
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
                    height: '70px',
                    overflow: 'hidden', // 넘치는 내용 숨김
                    whiteSpace: 'wrap', // 텍스트를 한 줄로 유지
                    textOverflow: 'ellipsis', // 넘치는 텍스트를 ...으로 표시
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
                />
                <Stack direction="row" spacing={1}>
                  {card.tagNames.map((tag, index, array) => (
                    // <React.Fragment key={tag}>
                    //   #{tag}
                    //   {index !== array.length - 1 && ', '}
                    // </React.Fragment>

                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      // style={textStyle}
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

            <p>태그: {selectedCard ? selectedCard.tagNames.join(', ') : ''}</p>
            <p>참석자 수: {selectedCard ? selectedCard.attendeeCount : ''}</p>
            <p id="modal-description">
              {selectedCard ? selectedCard.surveyDescription : ''}
            </p>

            {selectedCard && selectedCard.surveyStatusNo === 1 && (
              <>
                <Button
                  onClick={() => handleClickSurveyModify(selectedCard.surveyNo)}
                >
                  수정하기
                </Button>
                <Button onClick={handleDeleteClick}>삭제하기</Button>
                <Button
                  onClick={() => handleClickPostSurvey(selectedCard.surveyNo)}
                >
                  게시하기
                </Button>
              </>
            )}

            {selectedCard &&
              (selectedCard.surveyStatusNo === 2 ||
                selectedCard.surveyStatusNo === 3) && (
                <Button
                  onClick={() =>
                    naviagte(`/survey/statistics/${selectedCard?.surveyNo}`)
                  }
                >
                  통계보기
                </Button>
              )}

            <Button onClick={closeCardModal}>닫기</Button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Mypage;

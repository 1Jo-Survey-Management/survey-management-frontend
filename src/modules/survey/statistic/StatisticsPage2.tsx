import React, { useEffect, useState } from 'react';
import ReactWordcloud, { Options } from 'react-wordcloud';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Grid,
  Button,
} from '@mui/material';
import AnswerList from './components/AnswerList';
import '../../../global.css';
import WordCloud from './components/WordCloud';
import { GooglePie } from './components/GooglePie';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import NumOneType from './SurveyQuestionType/NumOneType';
import TitleFig from './imgs/surveyTitlepng.png';

const styles = {
  card: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
    borderRadius: '3%',
  },
  cardTitle: {
    backgroundImage: `url(${TitleFig})`, // 이미지 파일의 경로 설정
    backgroundSize: 'cover', // 배경 이미지 크기 조절 옵션
    backgroundRepeat: 'no-repeat', // 배경 이미지 반복 옵션

    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
    marginTop: '20px',
    borderRadius: '3%',
  },
  cardContent: {
    marginLeft: '30px',
  },
  typography: {
    fontSize: '25px',
    color: '#757575',
  },
  titleText: {
    fontSize: '20px',
    textAlign: 'center',
    // color: '#757575',
  },
  surveyInfo: {
    fontSize: '15px',
    textAlign: 'right',
  },
};

const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

const rankData = [
  { rank: 1, menu: '플랫화이트', num: 100 },
  { rank: 2, menu: '프라프치노', num: 90 },
  { rank: 3, menu: '우리집물', num: 80 },
  { rank: 4, menu: '바닐라라떼', num: 70 },
  { rank: 5, menu: '인삼차', num: 60 },
  { rank: 6, menu: '코카콜라', num: 60 },
  { rank: 7, menu: '환타', num: 20 },
  { rank: 8, menu: '우리집강아지가먹던물', num: 10 },
  { rank: 9, menu: '더치커피', num: 10 },
  { rank: 0, menu: '우유', num: 5 },
];

interface Selection {
  userNickname: string;
  surveyNo: number;
  surveyTitle: string;
  surveyQuestionNo: number;
  surveyQuestionTitle: string;
  questionTypeNo: number;
  selectionNo: number;
  selectionValue: string;
  selectionCount: number;
  surveySubjectiveAnswer: string;
}

export default function StatisticsPage() {
  // 전체 정보 상태 관리
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  // const [options, setOptions] = useState({
  //   legend: 'right',
  // });

  const questionAnswerCount = (data: Selection[]): number => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.selectionCount;
    });
    return sum;
  };

  const extractChartData = (data: Selection[]): [string, unknown][] =>
    data.map((item) => [item.selectionValue, item.selectionCount]);

  // 전체 설문지 페이지에 뿌려질 데이터 (맨 처음 데이터 가져옴)
  const userNickname = selectStat[0].userNickname;
  const totalSelectionCount = questionAnswerCount(selectStat);
  const surveyTitle = selectStat[0].surveyTitle;
  const surveyNo = selectStat[0].surveyNo;

  // 문항 번호로 카드를 반복해서 만들고, 문항 유형 번호로 어떤 컴포넌트를 내보낼지 정한다
  // // 문항 전체 수 계산
  // const surveyQuestionAll = (data: Selection[]): number => {
  //   let maxNum = 0;
  //   data.forEach((item, index) => {
  //     let currentNum = item.surveyQuestionNo;

  //     if (index < data.length - 1) {
  //         let nextNum = data[index + 1].surveyQuestionNo;

  //         if (nextNum > currentNum) {
  //             maxNum = nextNum;
  //         }
  //     }
  // });
  //   return maxNum;
  // };

  //-----------------------------------------------------
  const question = (data: Selection[]): any => {
    let result = new Map();

    data.forEach((item) => {
      const surveyQuestionNo = item.surveyQuestionNo;
      const questionTypeNo = item.questionTypeNo;

      if (!result.has(surveyQuestionNo)) {
        result.set(surveyQuestionNo, new Set());
      }

      result.get(surveyQuestionNo).add(questionTypeNo);
    });
    // 결과를 필요한 형식으로 변환
    const finalResult = Array.from(result).map(
      ([surveyQuestionNo, questionTypeSet]) => ({
        surveyQuestionNo,
        questionTypeNo: Array.from(questionTypeSet),
      })
    );

    return finalResult;
  };

  //--------------------------------------------------

  const surveyBranch = (data: Selection[]): any => {
    const result = question(selectStat);

    result.forEach(
      (item: { surveyQuestionNo: number; questionTypeNo: number }) => {
        item.surveyQuestionNo;

        switch (item.questionTypeNo) {
          case 1:
            // questionTypeNo가 1인 경우에 대한 작업 수행
            break;
          case 2:
            // questionTypeNo가 2인 경우에 대한 작업 수행
            break;
          // 다른 questionTypeNo case도 추가할 수 있습니다.
          default:
            // 기본 동작
            break;
        }
      }
    );
  };

  // 구글 차트에 필요한 데이터
  const chartData = extractChartData(selectStat);
  chartData.unshift(['selectionValue', 'selectionCount']);

  useEffect(() => {
    // 전체 정보 API 요청
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/survey/result?surveyno=1&questionno=1`
        );
        setSelectStat(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  // const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
  //   surveyId,
  //   surveyInfoId: new Date().getTime(),
  //   surveyTitle: '',
  //   surveyTags: [],
  //   surveyDescription: '',
  //   surveyClosingAt: '',
  //   openStatusNo: OpenStatusEnum.PUBLIC,
  //   surveyStatusNo: SurveyStatusEunm.WRITING,
  //   userNo: null,
  // });

  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const pieChartWidth = isSmallScreen ? '100%' : '500px';
  const wordCloudWidth = isSmallScreen ? '100%' : '500px';

  return (
    <>
      <Card sx={styles.cardTitle}>
        <CardContent>
          <Box>
            <Typography style={textStyle} sx={styles.titleText}>
              <h1>{}</h1>
              <Divider />
            </Typography>
            <Typography style={textStyle} sx={styles.surveyInfo}>
              <p>
                설문 번호: 1 &nbsp;&nbsp;&nbsp; 설문 작성자: 김선규
                &nbsp;&nbsp;&nbsp; 설문 개시일: 2023-10-19 &nbsp;&nbsp;&nbsp;
                설문 참여자 수: 100
              </p>
              <br />
              <br />
              <Button variant="contained">참여하기</Button>&nbsp;&nbsp;&nbsp;
              <Button variant="contained">돌아가기</Button>&nbsp;&nbsp;&nbsp;
            </Typography>
            <br />
          </Box>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Box>
            <Typography style={textStyle} sx={styles.typography}>
              <h4>1. 매장에서 가장 선호하는 음료는?</h4>
            </Typography>
            <Typography style={textStyle} sx={styles.surveyInfo}>
              <p>문항 번호: 1 &nbsp;&nbsp;&nbsp; 문항 참여자 수: 100</p>
            </Typography>
            <Divider />
            <GooglePie width={pieChartWidth} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Box>
            <Typography style={textStyle} sx={styles.typography}>
              <h4> 2. 추가했으면 하는 메뉴는? </h4>
            </Typography>
            <Typography style={textStyle} sx={styles.surveyInfo}>
              <p>문항 번호: 2 &nbsp;&nbsp;&nbsp; 문항 참여자 수: 94</p>
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            {/* 왼쪽 그리드 아이템: 이미지 */}
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ width: wordCloudWidth, margin: '0 auto' }}>
                <WordCloud />
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  marginTop: '50px',
                  maxHeight: '300px', // 원하는 최대 높이 설정
                  overflow: 'auto', // 스크롤 활성화
                }}
              >
                <NumOneType data={rankData} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Box>
            <Typography style={textStyle} sx={styles.typography}>
              <h4> 3. 매장에 대하여 바라는점?</h4>
            </Typography>
            <Typography style={textStyle} sx={styles.surveyInfo}>
              문항 번호: 3 &nbsp;&nbsp;&nbsp; 문항 참여자 수: 60
            </Typography>
            <Divider />
            <Box
              sx={{
                width: '100%',
                marginTop: '50px',
                marginBottom: '50px',
                maxHeight: '300px', // 원하는 최대 높이 설정
                overflow: 'auto', // 스크롤 활성화
              }}
            >
              <AnswerList />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

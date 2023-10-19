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

export default function StatisticsPage() {
  useEffect(() => {
    axios
      .post('/statistic/render')
      .then((response) => {
        const respData = response.data;
        console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);

        if (respData === '') {
          console.log('API 요청 실패');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [surveyImage, setSurveyImage] = useState<File>();

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
              <h1>카페 이용 조사</h1>
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

            {/* 설문 번호: 1  설문 작성자: 김선규  설문 개시일: 2023-10-19 */}
            {/* <Divider /> */}
            <br />

            {/* 설문 이미지 넣기 */}
            {/* 구분선 하나 넣기 */}
            {/* 설문지 설명 넣기 */}
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

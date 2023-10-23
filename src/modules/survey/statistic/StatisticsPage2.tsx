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

export interface Selection {
  surveyPostAt: string;
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

export default function StatisticsPage2() {
  // 전체 정보 상태 관리
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [userNickname, setUserNickname] = useState('');
  const [totalSelectionCount, setTotalSelectionCount] = useState<number>();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyNo, setSurveyNo] = useState();
  const [surveyPostAt, setSurveyPostAt] = useState('');

  useEffect(() => {
    // 전체 정보 API 요청
    const fetchData = () => {
      axios
        .get(`http://localhost:8080/survey/resultall?surveyno=1`)
        .then((response) => {
          setSelectStat(response.data.content);
          setUserNickname(response.data.content[0].userNickname);

          const count = questionAnswerCount(response.data.content);
          setTotalSelectionCount(count);
          setSurveyTitle(response.data.content[0].surveyTitle);
          setSurveyNo(response.data.content[0].surveyNo);
          setSurveyPostAt(response.data.content[0].surveyPostAt);

          console.log(`API 요청 : ${JSON.stringify(response, null, 2)}`);
          console.log('설문지 제목 : ' + response.data.content[0].surveyTitle);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    };

    fetchData();
  }, []);

  // ----------------------------------------- 전체 참여자 수
  const questionAnswerCount = (data: Selection[]): number => {
    let sum = -1;
    data.forEach((item) => {
      sum += item.selectionCount;
    });
    return sum;
  };

  //------------------- 문항 별로 지정된 타입으로 컴포넌트 불러오기
  const surveyBranch = (data: Selection[]): any => {
    data.forEach((item) => {
      const surveyQuestionNo = item.surveyQuestionNo;
      const questionTypeNo = item.questionTypeNo;

      switch (questionTypeNo) {
        case 1:
          console.log(' 케이스 1번 실행 : ' + JSON.stringify(item, null, 2));
          return <GooglePie width={pieChartWidth} />;
          break;
        case 2:
          <GooglePie width={pieChartWidth} />;
          break;
        case 3:
          <GooglePie width={pieChartWidth} />;
          break;
        case 4:
          console.log(' 케이스 4번 실행 : ' + JSON.stringify(item, null, 2));
          break;
        case 5:
          <GooglePie width={pieChartWidth} />;
          break;
        default:
          // 기본 동작
          break;
      }
    });

    // result.forEach(
    //   (item: { surveyQuestionNo: number; questionTypeNo: number }) => {
    // surveyQuestionNo가 1인 항목을 필터링하여 새로운 객체 배열을 생성
    // const filteredData = selectStat.filter(
    //   (set) => set.surveyQuestionNo === item.surveyQuestionNo
    // );
    // // 필터링된 항목을 가지고 객체 배열을 준비(보내줘야할 객체)
    // const surveyQuestionData = filteredData.map((item) => ({
    //   userNickname: item.userNickname,
    //   surveyNo: item.surveyNo,
    //   surveyTitle: item.surveyTitle,
    //   surveyQuestionNo: item.surveyQuestionNo,
    //   surveyQuestionTitle: item.surveyQuestionTitle,
    //   questionTypeNo: item.questionTypeNo,
    //   selectionNo: item.selectionNo,
    //   selectionValue: item.selectionValue,
    //   selectionCount: item.selectionCount,
    //   surveySubjectiveAnswer: item.surveySubjectiveAnswer,
    // }));
    // console.log('questionTypeNo : ' + item.questionTypeNo);

    // }
    // );
  };

  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const pieChartWidth = isSmallScreen ? '100%' : '500px';
  // const wordCloudWidth = isSmallScreen ? '100%' : '500px';

  return (
    <>
      <Card sx={styles.cardTitle}>
        <CardContent>
          <Box>
            <Typography style={textStyle} sx={styles.titleText}>
              <h1>{surveyTitle}</h1>
              <Divider />
            </Typography>
            <Typography style={textStyle} sx={styles.surveyInfo}>
              <p>
                설문 번호: {surveyNo} &nbsp;&nbsp;&nbsp; 설문 작성자:{' '}
                {userNickname}
                &nbsp;&nbsp;&nbsp; 설문 개시일: {surveyPostAt}{' '}
                &nbsp;&nbsp;&nbsp; 설문 참여자 수: {totalSelectionCount}
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

      {selectStat.map((item, index) => {
        const surveyQuestionNo = item.surveyQuestionNo;
        const questionTypeNo = item.questionTypeNo;

        switch (questionTypeNo) {
          case 1:
            return (
              <Card sx={styles.cardTitle}>
                <CardContent>
                  <Box>
                    <div key={index}>
                      <GooglePie width={pieChartWidth} />
                    </div>
                  </Box>
                </CardContent>
              </Card>
            );
          case 2:
            return (
              <div key={index}>
                <GooglePie width={pieChartWidth} />
              </div>
            );
          case 3:
            return (
              <div key={index}>
                <GooglePie width={pieChartWidth} />
              </div>
            );
          case 4:
            console.log(' 케이스 4번 실행 : ' + JSON.stringify(item, null, 2));
            return <div key={index}>{/* 추가 작업 수행 */}</div>;
          case 5:
            return (
              <div key={index}>
                <GooglePie width={pieChartWidth} />
              </div>
            );
          default:
            // 기본 동작
            return null;
        }
      })}
    </>
  );
}

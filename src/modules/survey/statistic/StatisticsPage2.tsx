import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Grid,
  Button,
} from '@mui/material';
import { Word } from 'react-wordcloud';
import AnswerList from './components/AnswerList';
import '../../../global.css';

import { GooglePie } from './components/GooglePie';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import NumOneType from './SurveyQuestionType/NumOneType';
import TitleFig from './imgs/surveyTitlepng.png';
import WordCloud from './components/WordCloud';

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
  cardContent: {},
  subjectContent: {
    border: '1px solid #757575',
    borderRadius: '3%',
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
  surveySubjectiveAnswerCount: number;
  surveyWriter: string;
}

export default function StatisticsPage2() {
  // 전체 정보 상태 관리
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [userNickname, setUserNickname] = useState('');
  const [totalSelectionCount, setTotalSelectionCount] = useState<number>();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyNo, setSurveyNo] = useState();
  const [surveyPostAt, setSurveyPostAt] = useState('');
  const [surveyWriter, setSurveyWriter] = useState('');

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    // 전체 정보 API 요청
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/survey/resultall?surveyno=1`)
        .then((response) => {
          setSelectStat(response.data.content);
          setUserNickname(response.data.content[0].userNickname);
          setTotalSelectionCount(response.data.content[0].totalAttend);
          setSurveyTitle(response.data.content[0].surveyTitle);
          setSurveyNo(response.data.content[0].surveyNo);
          setSurveyPostAt(response.data.content[0].surveyPostAt);

          console.log(`API 요청 : ${JSON.stringify(response, null, 2)}`);
          console.log(`설문지 제목 : ${response.data.content[0].surveyTitle}`);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setAllItems(surveyBranch(selectStat));

    // response.data.content 배열을 순회하며 surveyWriter가 1인 경우를 찾음
    selectStat.forEach((item) => {
      if (item.surveyWriter != null) {
        console.log(`작성자이름? : ${item.surveyWriter}`);
        setSurveyWriter(item.surveyWriter);
      }
    });
  }, [selectStat]);

  // ------------------- 문항별 응답 배열로 묶기
  const surveyBranch = (data: Selection[]): any => {
    console.log(`surveyBranch 들어옴 : ${data}`);

    const itemGroups: { [key: string]: Selection[] } = {};

    data.forEach((item) => {
      const { surveyQuestionNo } = item;

      console.log(`surveyQuestionNo : ${surveyQuestionNo}`);

      if (!itemGroups[surveyQuestionNo]) {
        // 해당 문항 번호에 해당하는 배열이 없으면 새로 생성
        itemGroups[surveyQuestionNo] = [];

        console.log('새로생성됨');
      }

      // 해당 문항 번호의 배열에 item 추가
      itemGroups[surveyQuestionNo].push(item);
    });

    // itemGroups 객체에 각 문항 번호별로 묶인 배열이 생성됨
    return itemGroups;
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
                {surveyWriter}
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

      {/* 문항별 유형에 맞는 컴포넌트에 유형에 맞는 배열 전달하기 */}
      {Object.keys(allItems).map((questionNo: any) => {
        console.log('실행됨');

        const itemsForQuestion: Selection[] = allItems[questionNo];
        const { questionTypeNo } = itemsForQuestion[0];

        console.log(
          `문항 번호 ${questionNo}, 문항 유형 ${questionTypeNo}`,
          itemsForQuestion
        );

        // -------------------------------------------------- 객관식 Count
        const countSelections = (itemsForQuestion: any[]) => {
          let totalSelectionCount = 0;

          itemsForQuestion.forEach((item: { selectionCount: number }) => {
            totalSelectionCount += item.selectionCount;
          });

          return totalSelectionCount;
        };

        // -------------------------------------------------- 주관식 Count
        const countSubjectiveAnswerCount = (itemsForQuestion: any[]) => {
          let totalSurveySubjectiveAnswerCount = -1;

          itemsForQuestion.forEach(
            (item: { surveySubjectiveAnswerCount: number }) => {
              totalSurveySubjectiveAnswerCount +=
                item.surveySubjectiveAnswerCount;
            }
          );

          return totalSelectionCount;
        };

        // -------------------------------------------------- 구글 차트 데이터 보내기 위한 배열
        const extractChartData = (data: Selection[]): [string, unknown][] =>
          data.map((item) => [item.selectionValue, item.selectionCount]);
        // -chartData로 <GoogleChard data={chartDat}/> 이런식으로 쓰면댐
        const chartData = extractChartData(itemsForQuestion);
        let chartDataMessage = '';
        if (questionTypeNo === 1) {
          chartDataMessage = `1번으로 차트 데이터 보내기 : ${chartData}`;
        }

        // --------------------------------------------------
        return (
          <Card sx={styles.cardTitle} key={questionNo}>
            <CardContent>
              <Box>
                <Typography style={textStyle} sx={styles.titleText}>
                  <h4>
                    {itemsForQuestion[0].surveyQuestionNo} .{' '}
                    {itemsForQuestion[0].surveyQuestionTitle}
                  </h4>
                  <Divider />
                </Typography>
                <Typography style={textStyle} sx={styles.surveyInfo}>
                  <p>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 설문 참여자 수:{' '}
                    {itemsForQuestion[0].selectionCount != 0
                      ? countSelections(itemsForQuestion)
                      : countSubjectiveAnswerCount(itemsForQuestion)}
                  </p>
                </Typography>

                {/* --------------------------------- 구글 차트 보내는 곳  */}
                {questionTypeNo === 1 && chartDataMessage && (
                  <div>{chartDataMessage}</div>
                )}

                {/* 
                 {questionTypeNo === 2 && ()}
          {questionTypeNo === 3 && (
            // Add code for question type 3
          )} */}
                {questionTypeNo === 4 && (
                  <>
                    <Typography style={textStyle} sx={styles.cardContent}>
                      <p>단답형의 답들은 다음과 같은 것들이 있었습니다!</p>
                    </Typography>
                    <Box sx={styles.subjectContent}>
                      <WordCloud
                        wordCloud={itemsForQuestion.map((item) => ({
                          text: item.surveySubjectiveAnswer,
                          value: item.questionTypeNo,
                        }))}
                      />
                    </Box>

                    <AnswerList selectList={itemsForQuestion} />
                  </>
                )}

                {questionTypeNo === 5 && (
                  <>
                    <Typography style={textStyle} sx={styles.cardContent}>
                      <p>서술형의 답들은 다음과 같은 것들이 있었습니다!</p>
                    </Typography>
                    <Box>
                      <AnswerList selectList={itemsForQuestion} />
                    </Box>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import ReactWordcloud, { Options } from 'react-wordcloud';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Button,
} from '@mui/material';
import '../../../global.css';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import TitleFig from './imgs/surveyTitlepng.png';
import { PieData } from './types/SurveyStatistics';
import GooglePieChart from './components/GooglePieChart';
import AnswerList from './components/AnswerList';
import NumOneType from './SurveyQuestionType/NumOneType';
import WordCloud from './components/WordCloud';

const styles = {
  card: {
    // styles here
  },
  cardTitle: {
    // styles here
  },
  cardContent: {
    // styles here
  },
  typography: {
    // styles here
  },
  titleText: {
    // styles here
  },
  surveyInfo: {
    // styles here
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
}

export default function StatisticsPage2() {
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [totalSelectionCount, setTotalSelectionCount] = useState<number>();
  const [selections, setSelections] = useState<PieData[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const pieChartWidth = isSmallScreen ? '100%' : '500px';

  const questionAnswerCount = (data: Selection[]): number => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.selectionCount;
    });
    return sum;
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8080/survey/resultall?surveyno=1`)
        .then((response) => {
          setSelectStat(response.data);

          const count = questionAnswerCount(response.data.content);
          setTotalSelectionCount(count);

          const newSelections = response.data.content.map((item) => ({
            selectionNo: item.selectionNo,
            selectionValue: item.selectionValue,
            selectionCount: item.selectionCount,
          }));
          setSelections(newSelections);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    };

    fetchData();
  }, []);

  // console.log(selectStat);
  // console.log(selections);

  const getFilteredSelections = (questionNo: number) => {
    const filteredSelections = selections
      .filter((item) => item.surveyQuestionNo === questionNo)
      .map((item) => ({
        selectionNo: item.selectionNo,
        selectionValue: item.selectionValue,
        selectionCount: item.selectionCount,
      }));
    return filteredSelections;
  };

  // ------------------- 문항 별로 지정된 타입으로 컴포넌트 불러오기
  const surveyBranch = (data: Selection[]): unknown => {
    data.forEach((item) => {
      const { questionTypeNo } = item;
      const filteredSelections = getFilteredSelections(item.surveyQuestionNo);

      switch (questionTypeNo) {
        case 1:
          console.log(` 케이스 1번 실행 : ${JSON.stringify(item, null, 2)}`);
          return (
            <GooglePieChart
              width={pieChartWidth}
              selectionAnswer={filteredSelections}
            />
          );
          break;
        case 2:
          <GooglePieChart
            width={pieChartWidth}
            selectionAnswer={filteredSelections}
          />;
          break;
        case 3:
          <GooglePieChart
            width={pieChartWidth}
            selectionAnswer={filteredSelections}
          />;
          break;
        case 4:
          console.log(` 케이스 4번 실행 : ${JSON.stringify(item, null, 2)}`);
          break;
        case 5:
          <GooglePieChart
            width={pieChartWidth}
            selectionAnswer={filteredSelections}
          />;
          break;
        default:
          // 기본 동작
          break;
      }
      console.log(filteredSelections);
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

    // const wordCloudWidth = isSmallScreen ? '100%' : '500px';

    return (
      <>
        {/* {selectStat.map((item) => {
          <Card sx={styles.cardTitle}>
            <CardContent>
              <Box>
                {/* <Typography style={textStyle} sx={styles.titleText}>
                  <h1>{item.surveyTitle}</h1>
                  <Divider />
                </Typography>
                <Typography style={textStyle} sx={styles.surveyInfo}>
                  <p>
                    설문 번호: {} &nbsp;&nbsp;&nbsp; 설문 작성자:{' '}
                    {item.userNickname}
                    &nbsp;&nbsp;&nbsp; 설문 개시일: {item.surveyPostAt}{' '}
                    &nbsp;&nbsp;&nbsp; 설문 참여자 수:{totalSelectionCount}
                  </p>
                  <br />
                  <br />
                  <Button variant="contained">참여하기</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="contained">돌아가기</Button>
                  &nbsp;&nbsp;&nbsp;
                </Typography> */}
        {/* <br /> */}
        {/* </Box>
            </CardContent>
          // </Card>;
        })} */}
        {selectStat.map((item, index) => {
          const filteredSelections = getFilteredSelections(
            item.surveyQuestionNo
          );
          const { questionTypeNo } = item;
          switch (questionTypeNo) {
            case 1:
              return (
                <Card sx={styles.cardTitle}>
                  <CardContent>
                    <Box>
                      <div key={index}>
                        <GooglePieChart
                          width={pieChartWidth}
                          selectionAnswer={filteredSelections}
                        />
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              );
            case 2:
              return (
                <div key={index}>
                  <GooglePieChart
                    width={pieChartWidth}
                    selectionAnswer={filteredSelections}
                  />
                </div>
              );
            case 3:
              return (
                <div key={index}>
                  <GooglePieChart
                    width={pieChartWidth}
                    selectionAnswer={filteredSelections}
                  />
                </div>
              );
            case 4:
              console.log(
                ` 케이스 4번 실행 : ${JSON.stringify(item, null, 2)}`
              );
              return <div key={index}>{/* 추가 작업 수행 */}</div>;
            case 5:
              return (
                <div key={index}>
                  <GooglePieChart
                    width={pieChartWidth}
                    selectionAnswer={filteredSelections}
                  />
                </div>
              );
            default:
              // 기본 동작
              return null;
          }
        })}
      </>
    );
  };
}

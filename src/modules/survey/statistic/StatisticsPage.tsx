import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import AnswerList from './components/AnswerList';
import '../../../global.css';
import axios from '../../login/components/customApi';
import WordCloud from './components/WordCloudTest';
import GooglePieChart from './components/GooglePieChart';
import { Selection } from './types/SurveyStatisticTypes';

const styles = {
  card: {
    '@media (min-width: 700px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cardTitle: {
    // backgroundImage: `url(${TitleFig})`,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',

    // boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
    marginTop: '20px',
    borderRadius: '3%',
    '@media (min-width: 700px)': {
      width: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cardContent: {
    border: '1px solid #757575',
    borderRadius: '3%',
    '@media (min-width: 700px)': {
      width: '40%',
    },
  },
  googleChartContent: {
    '@media (min-width: 700px)': {
      width: '100%',
    },
  },

  subjectContent: {
    border: '1px solid #757575',
    borderRadius: '3%',
  },
  typography: {
    fontSize: '25px',
    color: '#757575',
  },
  titleText: {
    fontSize: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '30px',
    '@media (max-width: 400px)': {
      fontSize: '30px',
    },
  },
  componentText: {
    fontSize: '25px',
    textAlign: 'left',
    margin: '10px',
    fontWeight: 'bold',
    '@media (max-width: 400px)': {
      fontSize: '20px',
    },
  },
  surveyInfo: {
    fontSize: '15px',
    textAlign: 'right',
    '@media (max-width: 400px)': {
      fontSize: '13px',
    },
  },
};

const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

export default function StatisticsPage() {
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [totalSelectionCount, setTotalSelectionCount] = useState<number>();
  const [surveyTitle, setSurveyTitle] = useState<string>();
  const [surveyNo, setSurveyNo] = useState<number>();
  const [surveyPostAt, setSurveyPostAt] = useState<string>();
  const [surveyWriter, setSurveyWriter] = useState<string>();

  const [allItems, setAllItems] = useState<Record<string, Selection[]>>({});
  const params = useParams();
  const statSurveyNo = params.surveyNo;

  // const userNo = localStorage.getItem('userNo');
  const navigate = useNavigate();

  const surveyBranch = (data: Selection[]): Record<string, Selection[]> => {
    const itemGroups: Record<string, Selection[]> = {};

    data.forEach((item) => {
      const { surveyQuestionNo } = item;

      if (!itemGroups[surveyQuestionNo]) {
        itemGroups[surveyQuestionNo] = [];
      }
      itemGroups[surveyQuestionNo].push(item);
    });

    return itemGroups;
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios

        .get(
          `http://localhost:8080/api/survey/resultall?surveyno=${statSurveyNo}`
        )

        .then((response) => {
          setSelectStat(response.data.content);
          setTotalSelectionCount(response.data.content[0].totalAttend);
          setSurveyTitle(response.data.content[0].surveyTitle);
          setSurveyNo(response.data.content[0].surveyNo);
          setSurveyPostAt(response.data.content[0].surveyPostAt);
        })
        .catch(() => {
          alert('로그인이 필요합니다!');
          navigate('/');
        });
    };

    fetchData();
  }, []);

  console.log(selectStat);

  useEffect(() => {
    setAllItems(surveyBranch(selectStat));

    selectStat.forEach((item) => {
      if (item.surveyWriter != null) {
        setSurveyWriter(item.surveyWriter);
      }
    });
  }, [selectStat]);

  return (
    <>
      <Box sx={styles.card}>
        <Card sx={styles.cardTitle}>
          <CardContent>
            <Box>
              <Typography style={textStyle} sx={styles.titleText}>
                {surveyTitle}
                <Divider />
              </Typography>
              <Typography style={textStyle} sx={styles.surveyInfo}>
                설문 번호: {surveyNo} &nbsp;&nbsp;&nbsp; 설문 작성자:{' '}
                {surveyWriter}
                &nbsp;&nbsp;&nbsp; 설문 개시일: {surveyPostAt}{' '}
                &nbsp;&nbsp;&nbsp; 설문 참여자 수: {totalSelectionCount}
                <br />
                <br />
                <Button variant="contained">참여하기</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="contained">돌아가기</Button>&nbsp;&nbsp;&nbsp;
              </Typography>

              <br />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {Object.keys(allItems).map((questionNo) => {
        const itemsForQuestion: Selection[] = allItems[questionNo];
        const { questionTypeNo } = itemsForQuestion[0];

        const countSelections = (
          itemsForQuestionCount: { selectionCount: number }[]
        ): number => {
          let CounttotalSelectionCount = 0;

          itemsForQuestionCount.forEach((item: { selectionCount: number }) => {
            CounttotalSelectionCount += item.selectionCount;
          });

          return CounttotalSelectionCount;
        };

        const countSubjectiveAnswerCount = (
          itemsForQuestionCountSub: Selection[]
        ): number => {
          let totalSurveySubjectiveAnswerCount = 0;

          itemsForQuestionCountSub.forEach((item) => {
            totalSurveySubjectiveAnswerCount +=
              item.surveySubjectiveAnswerCount;
          });

          return totalSurveySubjectiveAnswerCount;
        };

        const extractChartData = (data: Selection[]): [string, number][] =>
          data.map((item) => [item.selectionValue, item.selectionCount]);
        const chartData = extractChartData(itemsForQuestion);

        const extractShortSubjectiveAnswer = (
          data: Selection[]
        ): Selection[] => {
          const filteredData = data.filter((item) => item.questionTypeNo === 4);

          return filteredData;
        };
        const shortSubData = extractShortSubjectiveAnswer(itemsForQuestion);

        const extractLongSubjectiveAnswer = (
          data: Selection[]
        ): Selection[] => {
          const filteredData = data.filter((item) => item.questionTypeNo === 5);

          return filteredData;
        };
        const LongSubData = extractLongSubjectiveAnswer(itemsForQuestion);

        return (
          <Box sx={styles.card} key={questionNo}>
            <Card sx={styles.cardTitle} key={questionNo}>
              <CardContent>
                <Box>
                  <Typography style={textStyle} sx={styles.componentText}>
                    {itemsForQuestion[0].surveyQuestionNo} .{' '}
                    {itemsForQuestion[0].surveyQuestionTitle}
                    <Divider />
                  </Typography>

                  <Typography style={textStyle} sx={styles.surveyInfo}>
                    <br />
                    &nbsp;&nbsp;&nbsp; 설문 참여자 수:{' '}
                    {itemsForQuestion[0].selectionCount !== 0
                      ? countSelections(itemsForQuestion)
                      : countSubjectiveAnswerCount(itemsForQuestion)}
                  </Typography>
                  <br />

                  {questionTypeNo === 1 && (
                    <Box sx={styles.googleChartContent}>
                      <GooglePieChart selectionAnswer={chartData} />
                    </Box>
                  )}
                  {questionTypeNo === 2 && (
                    <Box sx={styles.googleChartContent}>
                      <GooglePieChart selectionAnswer={chartData} />
                    </Box>
                  )}
                  {questionTypeNo === 3 && (
                    <Box sx={styles.googleChartContent}>
                      <GooglePieChart selectionAnswer={chartData} />
                    </Box>
                  )}
                  {questionTypeNo === 4 && (
                    <>
                      <Typography style={textStyle}>
                        ## 단답형의 답들은 다음과 같은 것들이 있었습니다!
                      </Typography>
                      <br />
                      <Box sx={styles.subjectContent}>
                        <WordCloud
                          wordCloud={shortSubData.map((item) => ({
                            text: item.surveySubjectiveAnswer,
                            size: item.questionTypeNo,
                          }))}
                        />
                      </Box>
                      <br />
                      <Typography style={textStyle}>답변 랭킹!!</Typography>
                      <AnswerList selectList={shortSubData} />
                    </>
                  )}

                  {questionTypeNo === 5 && (
                    <>
                      <Typography style={textStyle}>
                        ## 서술형의 답들은 다음과 같은 것들이 있었습니다!
                      </Typography>
                      <Box>
                        <AnswerList selectList={LongSubData} />
                      </Box>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </>
  );
}

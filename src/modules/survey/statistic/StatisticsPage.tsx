// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   useMediaQuery,
//   Button,
// } from '@mui/material';
// import AnswerList from './components/AnswerList';
// import '../../../global.css';
// import axios from '../../login/components/customApi';
// import Divider from '@mui/material/Divider';
// import TitleFig from './imgs/surveyTitlepng.png';
// import WordCloud from './components/WordCloud';
// import GooglePieChart from './components/GooglePieChart';
// import { Selection } from './types/SurveyStatisticTypes';

// const styles = {
//   card: {
//     boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
//     marginBottom: '30px',
//     borderRadius: '3%',
//   },
//   cardTitle: {
//     backgroundImage: `url(${TitleFig})`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',

//     boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
//     marginBottom: '30px',
//     marginTop: '20px',
//     borderRadius: '3%',
//   },
//   cardContent: { border: '1px solid #757575', borderRadius: '3%' },
//   subjectContent: {
//     border: '1px solid #757575',
//     borderRadius: '3%',
//   },
//   typography: {
//     fontSize: '25px',
//     color: '#757575',
//   },
//   titleText: {
//     fontSize: '60px',
//     textAlign: 'center',
//   },
//   componentText: {
//     fontSize: '30px',
//     textAlign: 'center',
//     margin: '10px',
//   },
//   surveyInfo: {
//     fontSize: '15px',
//     textAlign: 'right',
//   },
// };

// const fontFamily = "'Noto Sans KR', sans-serif";
// const textStyle = {
//   fontFamily,
// };

// export default function StatisticsPage() {
//   const [selectStat, setSelectStat] = useState<Selection[]>([]);
//   const [totalSelectionCount, setTotalSelectionCount] = useState<number>();
//   const [surveyTitle, setSurveyTitle] = useState<string>();
//   const [surveyNo, setSurveyNo] = useState<number>();
//   const [surveyPostAt, setSurveyPostAt] = useState<string>();
//   const [surveyWriter, setSurveyWriter] = useState<string>();

//   const [allItems, setAllItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       await axios
//         .get(`http://localhost:8080/survey/resultall?surveyno=1`)
//         .then((response) => {
//           setSelectStat(response.data.content);
//           setTotalSelectionCount(response.data.content[0].totalAttend);
//           setSurveyTitle(response.data.content[0].surveyTitle);
//           setSurveyNo(response.data.content[0].surveyNo);
//           setSurveyPostAt(response.data.content[0].surveyPostAt);
//         })
//         .catch((error) => {
//           console.error('Error fetching data: ', error);
//         });
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setAllItems(surveyBranch(selectStat));

//     selectStat.forEach((item) => {
//       if (item.surveyWriter != null) {
//         setSurveyWriter(item.surveyWriter);
//       }
//     });
//   }, [selectStat]);

//   const surveyBranch = (data: Selection[]): any => {
//     const itemGroups: { [key: string]: Selection[] } = {};

//     data.forEach((item) => {
//       const { surveyQuestionNo } = item;

//       if (!itemGroups[surveyQuestionNo]) {
//         itemGroups[surveyQuestionNo] = [];
//       }
//       itemGroups[surveyQuestionNo].push(item);
//     });

//     return itemGroups;
//   };

//   const isSmallScreen = useMediaQuery('(max-width: 500px)');

//   return (
//     <>
//       <Card sx={styles.cardTitle}>
//         <CardContent>
//           <Box>
//             <Typography style={textStyle} sx={styles.titleText}>
//               {surveyTitle}
//               <Divider />
//             </Typography>
//             <Typography style={textStyle} sx={styles.surveyInfo}>
//               설문 번호: {surveyNo} &nbsp;&nbsp;&nbsp; 설문 작성자:{' '}
//               {surveyWriter}
//               &nbsp;&nbsp;&nbsp; 설문 개시일: {surveyPostAt} &nbsp;&nbsp;&nbsp;
//               설문 참여자 수: {totalSelectionCount}
//               <br />
//               <br />
//               <Button variant="contained">참여하기</Button>&nbsp;&nbsp;&nbsp;
//               <Button variant="contained">돌아가기</Button>&nbsp;&nbsp;&nbsp;
//             </Typography>
//             <br />
//           </Box>
//         </CardContent>
//       </Card>
//       {Object.keys(allItems).map((questionNo: any) => {
//         const itemsForQuestion: Selection[] = allItems[questionNo];
//         const { questionTypeNo } = itemsForQuestion[0];

//         const countSelections = (itemsForQuestion: any[]) => {
//           let totalSelectionCount = 0;

//           itemsForQuestion.forEach((item: { selectionCount: number }) => {
//             totalSelectionCount += item.selectionCount;
//           });

//           return totalSelectionCount;
//         };

//         const countSubjectiveAnswerCount = (itemsForQuestion: any[]) => {
//           let totalSurveySubjectiveAnswerCount = -1;

//           itemsForQuestion.forEach(
//             (item: { surveySubjectiveAnswerCount: number }) => {
//               totalSurveySubjectiveAnswerCount +=
//                 item.surveySubjectiveAnswerCount;
//             }
//           );

//           return totalSelectionCount;
//         };

//         const extractChartData = (data: Selection[]): [string, number][] =>
//           data.map((item) => [item.selectionValue, item.selectionCount]);
//         const chartData = extractChartData(itemsForQuestion);

//         const extractShortSubjectiveAnswer = (
//           data: Selection[]
//         ): Selection[] => {
//           const filteredData = data.filter((item) => item.questionTypeNo === 4);

//           console.log(`단답형 : ${JSON.stringify(filteredData, null, 2)}`);
//           return filteredData;
//         };
//         const shortSubData = extractShortSubjectiveAnswer(itemsForQuestion);

//         const extractLongSubjectiveAnswer = (
//           data: Selection[]
//         ): Selection[] => {
//           const filteredData = data.filter((item) => item.questionTypeNo === 5);
//           console.log(`서술형 : ${JSON.stringify(filteredData, null, 2)}`);
//           return filteredData;
//         };
//         const LongSubData = extractLongSubjectiveAnswer(itemsForQuestion);

//         return (
//           <Card sx={styles.cardTitle} key={questionNo}>
//             <CardContent>
//               <Box>
//                 <Typography style={textStyle} sx={styles.componentText}>
//                   {itemsForQuestion[0].surveyQuestionNo} .{' '}
//                   {itemsForQuestion[0].surveyQuestionTitle}
//                   <br />
//                 </Typography>
//                 <Divider />

//                 <Typography style={textStyle} sx={styles.surveyInfo}>
//                   <br />
//                   &nbsp;&nbsp;&nbsp; 설문 참여자 수:{' '}
//                   {itemsForQuestion[0].selectionCount != 0
//                     ? countSelections(itemsForQuestion)
//                     : countSubjectiveAnswerCount(itemsForQuestion)}
//                 </Typography>
//                 <br />

//                 {questionTypeNo === 1 && (
//                   <Box sx={styles.cardContent}>
//                     <GooglePieChart selectionAnswer={chartData} />
//                   </Box>
//                 )}
//                 {questionTypeNo === 2 && (
//                   <div>
//                     <GooglePieChart selectionAnswer={chartData} />
//                   </div>
//                 )}
//                 {questionTypeNo === 3 && (
//                   <div>
//                     <GooglePieChart selectionAnswer={chartData} />
//                   </div>
//                 )}
//                 {questionTypeNo === 4 && (
//                   <>
//                     <Typography style={textStyle}>
//                       ## 단답형의 답들은 다음과 같은 것들이 있었습니다!
//                     </Typography>
//                     <Box sx={styles.subjectContent}>
//                       <WordCloud
//                         wordCloud={shortSubData.map((item) => ({
//                           text: item.surveySubjectiveAnswer,
//                           value: item.questionTypeNo,
//                         }))}
//                       />
//                     </Box>

//                     <AnswerList selectList={shortSubData} />
//                   </>
//                 )}

//                 {questionTypeNo === 5 && (
//                   <>
//                     <Typography style={textStyle}>
//                       ## 서술형의 답들은 다음과 같은 것들이 있었습니다!
//                     </Typography>
//                     <Box>
//                       <AnswerList selectList={LongSubData} />
//                     </Box>
//                   </>
//                 )}
//               </Box>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </>
//   );
// }

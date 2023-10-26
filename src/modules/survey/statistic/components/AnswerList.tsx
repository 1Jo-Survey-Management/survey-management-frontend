import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ListData } from '../types/SurveyStatistics';
import '../../../../global.css';
import { Selection } from '../types/SurveyStatisticTypes';

interface selectionList {
  selectList: Selection[];
}

export default function AnswerList({ selectList }: selectionList) {
  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily,
  };
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [selectStats, setSelectStats] = useState<Selection[]>([]);

  useEffect(() => {
    setSelectStat(selectList);
  }, [selectList]);

  useEffect(() => {
    const updateArrayLists = selectList.reduce(
      (acc, word) => updateArrayList(acc, word.surveySubjectiveAnswer),
      selectStats
    );

    setSelectStats(updateArrayLists);
  }, [selectList]);

  function updateArrayList(
    data: Selection[],
    newSurveySubjectiveAnswer: string
  ) {
    const existingWord = data.find(
      (item: { surveySubjectiveAnswer: string }) =>
        item.surveySubjectiveAnswer === newSurveySubjectiveAnswer
    );

    if (existingWord) {
      existingWord.surveySubjectiveAnswerCount += 1;
    } else {
      data.push({
        surveySubjectiveAnswer: newSurveySubjectiveAnswer,
        surveyPostAt: '',
        userNickname: '',
        surveyNo: 0,
        surveyTitle: '',
        surveyQuestionNo: 0,
        surveyQuestionTitle: '',
        questionTypeNo: 0,
        selectionNo: 0,
        selectionValue: '',
        selectionCount: 0,
        surveySubjectiveAnswerCount: 1,
        surveyWriter: '',
      });
    }

    return data;
  }

  return (
    <div>
      <br />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 250 }}
        style={textStyle}
      >
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>답변</TableCell>
              <TableCell>답변수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectStats.map((row, index) => (
              <TableRow component="th" scope="row" key={index}>
                <TableCell component="th" scope="row">
                  {row.Answer}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.surveySubjectiveAnswerCount}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.surveySubjectiveAnswerCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

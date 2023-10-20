import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../../../../global.css';

export default function AnswerList() {
  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily,
  };

  interface Selection {
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

  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/survey/result?surveyno=1&questionno=2`
      );
      setSelectStat(response.data);
    };
    fetchData();
  }, []);

  const createIncrementalArray = (
    data: Selection[]
  ): { count: number; surveySubjectiveAnswer: string }[] => {
    let count = 1;
    return data.map((item) => ({
      count: count++,
      surveySubjectiveAnswer: item.surveySubjectiveAnswer,
    }));
  };
  const incrementalArray = createIncrementalArray(selectStat);
  const responseCount = selectStat.length;
  return (
    <div>
      <p style={textStyle}>응답 수 : {responseCount}</p>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 250 }}
        style={textStyle}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>답변 번호</TableCell>
              <TableCell>답변</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incrementalArray.map((row) => (
              <TableRow
                component="th"
                scope="row"
                key={row.count}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={100}>
                  {row.count}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.surveySubjectiveAnswer}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

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

interface SubjectiveAnswerProps {
  SubjectiveAnswer: ListData[];
}

export default function AnswerList({
  SubjectiveAnswer,
}: SubjectiveAnswerProps) {
  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily,
  };

  const createIncrementalArray = (
    data: ListData[]
  ): { count: number; Answer: string }[] => {
    let count = 1;
    return data.map((item) => ({
      count: count++,
      Answer: item.surveySubjectiveAnswer,
    }));
  };
  const incrementalArray = createIncrementalArray(SubjectiveAnswer);
  const responseCount = SubjectiveAnswer.length;
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
                  {row.Answer}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

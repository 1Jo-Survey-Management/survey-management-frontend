import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(AnswerNo: number, Answer: string) {
  return { AnswerNo, Answer };
}

const rows = [
  createData(1, '매장 크기를 넓혀주세요'),
  createData(2, '서비스 좀 더 주세요'),
  createData(3, '배달은 안하나요'),
  createData(4, '사장님이 멋있어요'),
  createData(5, '이거 테스트 데이터인가요'),
  createData(6, '개발 오늘까지 아니었나요'),
  createData(7, '얼음 넣는 선택 사항 만들어주세요'),
];

export default function AnswerList() {
  // 각 행의 마우스 오버 상태 관리를 위한 상태 배열 추가
  const [isRowHovered, setRowHovered] = useState(
    new Array(rows.length).fill(false)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                position: 'sticky',
                background: 'lightgray',
                fontWeight: 'bold',
              }}
            >
              순번
            </TableCell>
            <TableCell
              style={{
                position: 'sticky',
                background: 'lightgray',
                fontWeight: 'bold',
              }}
            >
              답변
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              component="th"
              scope="row"
              key={row.AnswerNo}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                '&:hover': {
                  background: 'lightblue',
                },
              }}
              onMouseEnter={() => {
                const updatedRowHovered = [...isRowHovered];
                updatedRowHovered[index] = true;
                setRowHovered(updatedRowHovered);
              }}
              onMouseLeave={() => {
                const updatedRowHovered = [...isRowHovered];
                updatedRowHovered[index] = false;
                setRowHovered(updatedRowHovered);
              }}
            >
              <TableCell component="th" scope="row" width={100}>
                {row.AnswerNo}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Answer}
              </TableCell>
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

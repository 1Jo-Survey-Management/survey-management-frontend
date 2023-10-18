import * as React from 'react';
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
  createData(1, '맛있어서'),
  createData(2, '맛있어서'),
  createData(3, '맛있어서'),
];

export default function AnswerList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>답변 번호</TableCell>
            <TableCell>답변</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              component="th"
              scope="row"
              key={row.AnswerNo}
              //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" width={100}>
                {row.AnswerNo}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Answer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

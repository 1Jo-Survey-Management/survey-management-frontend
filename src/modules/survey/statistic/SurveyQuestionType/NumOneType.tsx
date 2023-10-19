import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
} from '@mui/material';

const styles = {
  hoverRow: {
    '&:hover': {
      backgroundColor: 'lightblue', // 마우스를 올렸을 때의 배경색
    },
  },
};

interface NumOneTypeProps {
  data: { rank: number; menu: string; num: number }[];
}

function NumOneType({ data }: NumOneTypeProps) {
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // 화면 크기에 따라 변경

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                position: 'sticky',
                background: 'lightgray',
                fontWeight: 'bold',
              }}
            >
              순위
            </TableCell>
            <TableCell
              style={{
                position: 'sticky',
                background: 'lightgray',
                fontWeight: 'bold',
              }}
            >
              메뉴
            </TableCell>
            <TableCell
              style={{
                position: 'sticky',
                background: 'lightgray',
                fontWeight: 'bold',
              }}
            >
              선택수
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                ...styles.hoverRow,
                fontSize: isSmallScreen ? '14px' : '16px', // 화면 크기에 따라 폰트 크기 조절
              }}
            >
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.menu}</TableCell>
              <TableCell>{row.num}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NumOneType;

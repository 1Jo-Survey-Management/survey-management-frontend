import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ColorButtonsProps = {
  buttonText: string;
};

const style = {
  padding: '10px',
};

/**
 * 스타일된 버튼을 buttonText로 이름만 바꿔서 사용 가능합니다
 * @author 김선규
 * @param param0
 * @returns 버튼
 */
export default function StyledButton({ buttonText }: ColorButtonsProps) {
  return (
    <Stack spacing={2} direction="column" sx={style}>
      <Button variant="text">{buttonText}</Button>
      {/* <Button variant="contained">{ buttonText }</Button>
      <Button variant="outlined">{ buttonText }</Button> */}
    </Stack>
  );
}

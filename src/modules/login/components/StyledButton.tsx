import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ColorButtonsProps = {
  buttonText: string;
};

const style = {
  padding: '10px',
};

export default function StyledButton({ buttonText }: ColorButtonsProps) {
  return (
    <Stack spacing={2} direction="column" sx={style}>
      <Button variant="text">{buttonText}</Button>
      {/* <Button variant="contained">{ buttonText }</Button>
      <Button variant="outlined">{ buttonText }</Button> */}
    </Stack>
  );
}

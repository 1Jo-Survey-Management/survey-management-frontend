import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ColorButtonsProps {
  buttonText: string;
  onClick?: () => void;
}

const defaultProps: Partial<ColorButtonsProps> = {
  onClick: () => {},
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
export default function StyledButton({
  buttonText,
  onClick,
}: ColorButtonsProps) {
  const handleClick = onClick;

  return (
    <Stack spacing={2} direction="column" sx={style}>
      <Button variant="text" onClick={handleClick}>
        {buttonText}
      </Button>
    </Stack>
  );
}

StyledButton.defaultProps = defaultProps;

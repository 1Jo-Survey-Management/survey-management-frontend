import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ColorButtonsProps = {
  buttonText: string;
  onClick?: () => void;
};

const defaultProps: Partial<ColorButtonsProps> = {
  onClick: () => {}, // 아무 동작도 하지 않는 기본 콜백 함수를 설정
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
  const handleClick = onClick; // 클릭 이벤트 핸들러가 지정되어 있다면 실행

  return (
    <Stack spacing={2} direction="column" sx={style}>
      <Button variant="text" onClick={handleClick}>
        {buttonText}
      </Button>
      {/* <Button variant="contained">{ buttonText }</Button>
      <Button variant="outlined">{ buttonText }</Button> */}
    </Stack>
  );
}

StyledButton.defaultProps = defaultProps;

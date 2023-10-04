import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

interface InputNickNameProps {
  onChange: (value: string) => void;
}

/**
 * 닉네임을 입력할수 있는 input box 입니다
 * @author 김선규
 * @returns 닉네임 입력 컴포넌트
 */
export default function ComposedTextField({ onChange }: InputNickNameProps) {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickName(value);

    // validation 체크 (예: 닉네임이 비어 있는지 확인)
    if (value.trim() === '' || value.trim() === null) {
      setError(true); // 에러 발생
      onChange(value); // 데이터 변경 함수 호출하여 값 전달
    } else {
      onChange(value); // 데이터 변경 함수 호출하여 값 전달
      setError(false); // 에러 해제
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">닉네임</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          value={nickName}
          onChange={handleInputChange}
          error={error} // 에러 상태에 따라 스타일을 변경
        />
        {error && (
          <FormHelperText id="component-helper-text" error>
            닉네임을 입력하세요.
          </FormHelperText>
        )}
        {!error && (
          <FormHelperText id="component-helper-text">
            이쁘게 적어보세요. 예를 들면 타노스
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

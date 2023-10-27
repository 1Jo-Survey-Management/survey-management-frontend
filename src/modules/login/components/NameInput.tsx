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

    if (value.trim() === '' || value.trim() === null) {
      setError(true);
      onChange(value);
    } else {
      onChange(value);
      setError(false);
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
          error={error}
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

import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
// import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickName(value);
    onChange(value); // 데이터 변경 함수 호출하여 값 전달
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
      {/* <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl> */}

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">닉네임</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          value={nickName}
          onChange={handleInputChange}
        />
        <FormHelperText id="component-helper-text">
          이쁘게 적어보세요. 예를 들면 타노스
        </FormHelperText>
      </FormControl>

      {/* <FormControl disabled variant="standard">
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" defaultValue="Composed TextField" />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl error variant="standard">
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          defaultValue="Composed TextField"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue="Composed TextField"
          label="Name"
        />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" defaultValue="Composed TextField" />
      </FormControl> */}
    </Box>
  );
}

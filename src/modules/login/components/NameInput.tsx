import * as React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import axios from '../components/customApi';

interface InputNickNameProps {
  onChange: (
    value: string,
    isChecked: boolean,
    isOverLimited: boolean,
    isRegexCheck: boolean
  ) => void;
}

interface isNicknameCheckedOnChange {
  isNicknameCheckedOnChangeCallback: (isChecked: boolean) => void;
}

interface isOverLimitCheckedOnChange {
  isOverLimitChecked: (isOverLimited: boolean) => void;
}

interface isRegexCheckCheckedOnChange {
  isRegexCheckChecked: (isRegexCheck: boolean) => void;
}

/**
 * 닉네임을 입력할수 있는 input box 입니다
 * @author 김선규
 * @returns 닉네임 입력 컴포넌트
 */
export default function ComposedTextField({
  onChange,
  isNicknameCheckedOnChangeCallback,
  isOverLimitChecked,
  isRegexCheckChecked,
}: InputNickNameProps &
  isNicknameCheckedOnChange &
  isOverLimitCheckedOnChange &
  isRegexCheckCheckedOnChange) {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState<string | null>(
    ''
  );
  const [nickName, setNickName] = useState<string>('');
  const [error, setError] = useState(true);
  const [submitWithoutCheck, setSubmitWithoutCheck] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [isRegexCheck, setIsRegexCheck] = useState<boolean>(false);

  useEffect(() => {
    setIsNicknameChecked(false);
    setSubmitWithoutCheck(false);
    setNicknameCheckResult(null);
  }, [nickName]);

  useEffect(() => {
    isNicknameCheckedOnChangeCallback(isNicknameChecked);
    isOverLimitChecked(isOverLimit);
    isRegexCheckChecked(isRegexCheck);
  }, [isNicknameChecked, isOverLimit, isRegexCheck]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;

    if (value.length <= 16) {
      setNickName(value);
      setIsOverLimit(false);
    } else {
      setIsOverLimit(true);
    }

    if (regex.test(value)) {
      setNickName(value);
      setIsRegexCheck(false);
    } else {
      setIsRegexCheck(true);
    }

    if (value.trim() === '' || value.trim() === null) {
      setError(true);
    } else {
      setError(false);
    }

    onChange(value, isNicknameChecked, isOverLimit, isRegexCheck);
  };

  const handleNicknameSubmit = async () => {
    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;

    if (nickName.trim() === '') {
      setSubmitWithoutCheck(false);
      return;
    }

    if (!regex.test(nickName)) {
      setSubmitWithoutCheck(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/check-duplicate-nickname`,
        {
          userNickname: nickName,
        }
      );

      if (response.status === 200) {
        if (response.data === 'Nickname is available') {
          setNicknameCheckResult('사용 가능한 닉네임입니다.');
          setSubmitWithoutCheck(true);
          setIsNicknameChecked(true);

          isNicknameCheckedOnChangeCallback(true);
        }
        if (response.data === 'Nickname is not available') {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          setSubmitWithoutCheck(false);
          setIsNicknameChecked(false);

          isNicknameCheckedOnChangeCallback(false);
        }
      }
    } catch (submitError) {
      console.error('Error checking nickname:', submitError);
    }
  };

  return (
    <Container
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-helper">닉네임</InputLabel>
          <Input
            id="component-helper"
            aria-describedby="component-helper-text"
            value={nickName}
            onChange={handleInputChange}
            error={error}
          />
          {!error && nicknameCheckResult && (
            <FormHelperText id="component-helper-text">
              {nicknameCheckResult}
            </FormHelperText>
          )}

          {isOverLimit && (
            <FormHelperText sx={{ color: 'red' }}>
              닉네임은 16자를 초과할 수 없습니다.
            </FormHelperText>
          )}

          {isRegexCheck && (
            <FormHelperText id="component-helper-text" sx={{ color: 'red' }}>
              특수문자는 불가합니다!
            </FormHelperText>
          )}

          {!submitWithoutCheck && !isOverLimit && !isRegexCheck && (
            <FormHelperText id="component-helper-text" error>
              중복확인을 하지 않았습니다!
            </FormHelperText>
          )}
        </FormControl>

        <Button
          onClick={() => {
            handleNicknameSubmit();
          }}
          variant="contained"
          color="secondary"
          sx={{ marginTop: '10px' }}
        >
          중복확인
        </Button>
      </Box>
    </Container>
  );
}

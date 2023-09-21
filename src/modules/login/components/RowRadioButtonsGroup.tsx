import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const radioStyle = {
  marginLeft: 1,
};

/**
 * 성별(남,여) 선택하는 라디오박스 입니다
 * @author 김선규
 * @returns 성별 지정 라디오박스
 */
export default function RowRadioButtonsGroup() {
  return (
    <FormControl sx={radioStyle}>
      <FormLabel id="genderRadioButton"> 성별 </FormLabel>
      <RadioGroup
        row
        aria-labelledby="gender-group-of-radio-button"
        name="gender-radio-group"
      >
        <FormControlLabel value="male" control={<Radio />} label="남" />
        <FormControlLabel value="female" control={<Radio />} label="여" />

        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}

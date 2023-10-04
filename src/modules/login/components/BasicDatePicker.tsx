import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface InputBirthDateProps {
  onChange: (value: string) => void;
}

/**
 * 생년월일 입력 데이트 픽커입니다
 * @author 김선규
 * @returns date Picker 컴포넌트
 */
export default function ResponsiveDatePickers({
  onChange,
}: InputBirthDateProps) {
  // const [selectedDateString, setSelectedDateString] = useState('');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs('')
  );

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      // null 값인 경우에 대한 처리
      setSelectedDate(date);
      console.log('No date selected');
    } else if (dayjs.isDayjs(date)) {
      // dayjs 객체인 경우 Date 객체로 변환 후 처리
      const jsDate = date.toDate();
      const year = jsDate.getFullYear();
      const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
      const day = jsDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);

      setSelectedDate(date);
      onChange(formattedDate);
    } else {
      console.error('Invalid date format:', date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
        <DemoItem label="생년월일">
          <DesktopDatePicker
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
          />
        </DemoItem>
        {/* <DemoItem label="Mobile variant">
          <MobileDatePicker defaultValue={dayjs('2022-04-17
          ')} />
        </DemoItem> */}

        {/* <DemoItem label="Static variant">
          <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem> */}
      </DemoContainer>
    </LocalizationProvider>
  );
}

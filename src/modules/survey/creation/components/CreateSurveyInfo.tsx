import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { CreateSurveyInfoProps } from '../types/SurveyTypes';

const styles = {
  card: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
  },
  iamgeBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #D1D1D1',
    height: '140px',
    marginBottom: '10px',
  },
  image: { width: '100%', height: '100%', objectFit: 'contain' },
  surveyTitleBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },

  surveyDescriptionBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '10px',
  },

  selectQuestionTypeBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
};

const tagNames = [
  '회의',
  '업무',
  '공지',
  '기타',
  '교육',
  '일상',
  '복지',
  '회식',
  '중요',
  '사회',
];

const defaultOpenStatus: string = '전체공개';

function CreateSurveyInfo({
  surveyInfo,
  setSurveyInfo,
}: CreateSurveyInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const [openStatus, setOpenStatus] = useState<string>(defaultOpenStatus);

  const handleSurveyTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSurveyInfo((prevSurveyInfo) => ({
      ...prevSurveyInfo,
      [name]: value,
    }));

    console.log(surveyInfo);
  };

  /**
   * 이미지 선택시 호출되는 메서드 입니다.
   *
   * @param event React.ChangeEvent<HTMLInputElement>
   * @author 강명관
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files && event.target.files[0];
    if (uploadFile) {
      const imageUrl: string = URL.createObjectURL(uploadFile);
      setSelectedImage(imageUrl);
    }
  };

  /**
   * 태그가 선택시 호출되는 메서드 입니다.
   *
   * @param event SelectChangeEvent<typeof tagNames>
   * @author 강명관
   */
  const handleTagChange = (event: SelectChangeEvent<typeof tagNames>) => {
    const tagValue = event.target.value;
    setSelectedTag(
      typeof tagValue === 'string' ? tagValue.split(',') : tagValue
    );
  };

  /**
   * 설문의 공개 상태를 변경하는 메서드 입니다.
   *
   * @param event SelectChangeEvent
   * @author 강명관
   */
  const handleOpenStatusChange = (event: SelectChangeEvent) => {
    const openStatusValue = event.target.value;
    setOpenStatus(openStatusValue);
  };

  const surveyTitle = (
    <Box sx={styles.surveyTitleBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        설문 제목
      </Typography>
      <Input
        placeholder="설문 제목을 입력해주세요."
        sx={{ flexGrow: 1 }}
        name="surveyTitle"
        onChange={handleSurveyTitleChange}
      />
    </Box>
  );

  const surveyTagSelectBox = (
    <div style={{ marginBottom: '10px' }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">태그</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTag}
          onChange={handleTagChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selectedValue) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedValue.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {tagNames.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const surveyDescription = (
    <Box sx={styles.surveyDescriptionBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        문항 설명
      </Typography>
      <Input placeholder="문항 설명을 입력해주세요." sx={{ flexGrow: 1 }} />
    </Box>
  );

  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  const todayFormatted = today.toISOString().split('T')[0];
  const oneWeekLaterFormatted = oneWeekLater.toISOString().split('T')[0];

  return (
    <Card sx={styles.card}>
      <CardContent>
        {surveyTitle}

        <Box sx={{ marginBottom: '20px' }}>
          {!selectedImage && (
            <Box sx={styles.iamgeBox}>
              <ImageIcon sx={{ fontSize: '30px', color: '#757575' }} />
            </Box>
          )}
          {selectedImage && (
            <div>
              <Box sx={styles.iamgeBox}>
                <img
                  src={selectedImage}
                  alt="업로드된 이미지"
                  style={{ ...styles.image, objectFit: 'contain' }}
                />
              </Box>
            </div>
          )}
          <input
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>

        {surveyTagSelectBox}

        <Box
          sx={{
            marginBottom: '10px',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            설문조사 마감일 지정
          </Typography>

          <TextField
            id="date"
            label="마감일"
            type="date"
            defaultValue={oneWeekLaterFormatted}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: todayFormatted,
            }}
          />
        </Box>

        <Box>
          <FormControl fullWidth>
            <InputLabel id="openStatus-select-label">공개 여부</InputLabel>
            <Select
              labelId="openStatus-select-label"
              id="openStatus-select"
              value={openStatus}
              label="공개 여부"
              onChange={handleOpenStatusChange}
            >
              <MenuItem value="전체공개">전채공개</MenuItem>
              <MenuItem value="회원공개">회원공개</MenuItem>
              <MenuItem value="비공개">비공개</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {surveyDescription}
      </CardContent>
    </Card>
  );
}

export default CreateSurveyInfo;

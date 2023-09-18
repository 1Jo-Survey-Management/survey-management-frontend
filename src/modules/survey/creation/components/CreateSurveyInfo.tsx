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
import React, { useEffect, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { CreateSurveyInfoProps, SurveyInfoProps } from '../types/SurveyTypes';

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

function CreateSurveyInfo({
  surveyInfo,
  setSurveyInfo,
}: CreateSurveyInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  const todayFormatted = today.toISOString().split('T')[0];
  const oneWeekLaterFormatted = oneWeekLater.toISOString().split('T')[0];

  useEffect(() => {
    setSurveyInfo((prevSurveyInfo) => ({
      ...prevSurveyInfo,
      surveyClosingAt: oneWeekLaterFormatted,
    }));
  }, []);

  /**
   * 설문지 제목, 설명, 날짜를 변경하는 메서드 입니다.
   *
   * @param event Input onChange Event
   * @author 강명관
   */
  const handleSurveyInfoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const updateSurveyInfo: SurveyInfoProps = {
      ...surveyInfo,
      [name]: value,
    };

    setSurveyInfo(updateSurveyInfo);
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

    const tagValueArray: string[] = Array.isArray(tagValue)
      ? tagValue
      : [tagValue];

    const maxTagCount: number = 2;

    const selectedCount = tagValueArray.length;

    if (selectedCount > maxTagCount) {
      const limitedSelection = tagValueArray.slice(0, maxTagCount);
      setSurveyInfo({
        ...surveyInfo,
        surveyTags: limitedSelection,
      });
    } else {
      setSurveyInfo({
        ...surveyInfo,
        surveyTags: tagValueArray,
      });
    }
  };

  /**
   * 설문의 공개 상태를 변경하는 메서드 입니다.
   *
   * @param event SelectChangeEvent
   * @author 강명관
   */
  const handleOpenStatusChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    const updateSurveyInfo: SurveyInfoProps = {
      ...surveyInfo,
      [name]: value,
    };

    setSurveyInfo(updateSurveyInfo);
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
        value={surveyInfo.surveyTitle}
        onChange={handleSurveyInfoInputChange}
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
          value={surveyInfo.surveyTags}
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
      <Input
        placeholder="문항 설명을 입력해주세요."
        sx={{ flexGrow: 1 }}
        name="surveyDescription"
        value={surveyInfo.surveyDescription}
        onChange={handleSurveyInfoInputChange}
      />
    </Box>
  );

  const surveyOpenStatusSelectBox = (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="openStatus-select-label">공개 여부</InputLabel>
        <Select
          labelId="openStatus-select-label"
          id="openStatus-select"
          value={surveyInfo.openStatus}
          name="openStatus"
          label="공개 여부"
          onChange={handleOpenStatusChange}
        >
          <MenuItem value="전체공개">전체공개</MenuItem>
          <MenuItem value="회원공개">회원공개</MenuItem>
          <MenuItem value="비공개">비공개</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

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
            name="surveyClosingAt"
            value={surveyInfo.surveyClosingAt}
            inputProps={{
              min: todayFormatted,
            }}
            onChange={handleSurveyInfoInputChange}
          />
        </Box>

        {surveyOpenStatusSelectBox}
        {surveyDescription}
      </CardContent>
    </Card>
  );
}

export default CreateSurveyInfo;

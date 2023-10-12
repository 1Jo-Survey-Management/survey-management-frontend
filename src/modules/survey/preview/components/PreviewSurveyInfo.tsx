import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import React, { useEffect, useState } from 'react';
import { PreviewSurveyInfoProps } from '../types/PreviewSurveyTypes';

const styles = {
  card: {
    marginBottom: '30px',
    marginTop: '30px',
  },
  iamgeBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '140px',
    marginBottom: '10px',
  },
  image: { width: '100%', height: '100%', objectFit: 'contain' },
};

/**
 * 설문 작성 중 미리보기에서 설문의 정보를 보여주는 컴포넌트 입니다.
 *
 * @param surveyInfo 설문에 대한 정보를 담고 있는 객체
 * @param surveyImage 설문에 대한 대표 이미지 File
 * @returns 미리보기 설문 정보
 * @component
 * @author 강명관
 */
function PreviewSurveyInfo({
  surveyInfo,
  surveyImage,
}: PreviewSurveyInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (surveyImage !== undefined) {
      const imageUrl: string = URL.createObjectURL(surveyImage);

      setSelectedImage(imageUrl);
    }
  }, []);

  return (
    <Container>
      <Card sx={styles.card}>
        <CardContent>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              {surveyInfo.surveyTitle
                ? surveyInfo.surveyTitle
                : '제목 없는 설문지'}
            </Typography>
          </Box>

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

          <Box>
            <Typography sx={{ fontSize: '14px', color: '#4a4a4a' }}>
              {surveyInfo.surveyDescription
                ? surveyInfo.surveyDescription
                : '설문지 설명'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PreviewSurveyInfo;

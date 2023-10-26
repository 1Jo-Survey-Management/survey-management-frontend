/** @jsxImportSource @emotion/react */

import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { PreviewSurveyInfoProps } from '../types/PreviewSurveyTypes';

const styles = {
  card: css({
    marginBottom: '30px',
    marginTop: '30px',
  }),

  surveyInfoTitileStyle: css({
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px',
  }),

  iamgeBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '140px',
    marginBottom: '10px',
  }),

  imageIcon: css({
    fontSize: '30px',
    color: '#757575',
  }),

  image: css({ width: '100%', height: '100%', objectFit: 'contain' }),
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
  previewImageUrl,
}: PreviewSurveyInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (surveyImage === undefined && previewImageUrl !== undefined) {
      setSelectedImage(previewImageUrl);
      return;
    }

    if (surveyImage !== undefined) {
      const imageUrl: string = URL.createObjectURL(surveyImage);

      setSelectedImage(imageUrl);
    }
  }, []);

  return (
    <Container>
      <Card css={styles.card}>
        <CardContent>
          <Box>
            <Typography css={styles.surveyInfoTitileStyle}>
              {surveyInfo.surveyTitle
                ? surveyInfo.surveyTitle
                : '제목 없는 설문지'}
            </Typography>
          </Box>

          {!selectedImage && (
            <Box css={styles.iamgeBox}>
              <ImageIcon css={styles.imageIcon} />
            </Box>
          )}
          {selectedImage && (
            <div>
              <Box css={styles.iamgeBox}>
                <img src={selectedImage} alt="설문 이미지" css={styles.image} />
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

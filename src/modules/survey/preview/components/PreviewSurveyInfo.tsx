import { Box, Card, CardContent, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import React, { useEffect, useState } from 'react';
import { PreviewSurveyInfoProps } from '../types/PreviewSurveyTypes';

const styles = {
  card: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
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
    <Card sx={styles.card}>
      <CardContent>
        <Box>
          <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
            {surveyInfo.surveyTitle}
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
      </CardContent>
    </Card>
  );
}

export default PreviewSurveyInfo;

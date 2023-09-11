import { Box, Input } from "@mui/material";
import React from "react";

const primaryColor = "#3f50b5";

const styles = {};

const CreateShortAnswer: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexGrow: "1" }}>
      <Input disabled defaultValue={"문항 답변 입력란"}></Input>
    </Box>
  );
};

export default CreateShortAnswer;

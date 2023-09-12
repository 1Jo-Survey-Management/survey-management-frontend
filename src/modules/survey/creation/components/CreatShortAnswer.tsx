import { Box, Input, TextField } from "@mui/material";
import React from "react";

const primaryColor = "#3f50b5";

const styles = {};

const CreateShortAnswer: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "60.56px", marginRight: "10px" }}></Box>
      <Input
        disabled
        defaultValue={"문항 답변 입력란"}
        sx={{ flexGrow: "1", marginTop: "15px" }}
      ></Input>
    </Box>
  );
};

export default CreateShortAnswer;

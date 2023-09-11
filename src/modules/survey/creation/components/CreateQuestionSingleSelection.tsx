import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormGroup,
  FormControlLabel,
  TextField,
  Tooltip,
  Switch,
  Input,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import CreateSingleSelection from "./CreateSingleSelection";
import CreateMultipleSelection from "./CreateMultipleSelection";
import CreateShortAnswer from "./CreatShortAnswer";

const CreateQuestionSingleSelection: React.FC = () => {
  const [questionType, setQuestionType] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value);
  };

  const dragIndicator = (
    <Box
      sx={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: "-15px",
      }}
    >
      <DragIndicatorIcon
        sx={{ transform: "rotate(90deg);", color: "#b2b2b2" }}
      ></DragIndicatorIcon>
    </Box>
  );

  const deleteIconAndRequiredSwitch = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <FormGroup>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <Typography sx={{ marginRight: "-7px" }}>필수</Typography>
            <Switch defaultChecked />
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );

  const questionTitle = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "",
      }}
    >
      <Typography sx={{ marginRight: "10px", fontWeight: "bold" }}>
        문항 제목
      </Typography>
      <Input placeholder="문항 제목을 입력해주세요." sx={{ flexGrow: 1 }} />
    </Box>
  );

  const questionDescription = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Typography sx={{ marginRight: "10px", fontWeight: "bold" }}>
        문항 설명
      </Typography>
      <Input placeholder="문항 설명을 입력해주세요." sx={{ flexGrow: 1 }} />
    </Box>
  );

  const selectQuestionType = (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
      <Typography sx={{ marginRight: "10px", fontWeight: "bold" }}>
        문항 유형
      </Typography>

      <FormControl sx={{ flexGrow: "1" }}>
        <Select
          id="demo-simple-select"
          value={questionType}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value="1">단일 선택형</MenuItem>
          <MenuItem value="2">복수 선택형</MenuItem>
          <MenuItem value="3">주관식 단답형</MenuItem>
          <MenuItem value="4">주관식 서술형</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: "#3f50b5",
        boxShadow:
          "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
      }}
    >
      <CardContent>
        {dragIndicator}
        {deleteIconAndRequiredSwitch}
        {questionTitle}
        {questionDescription}
        {selectQuestionType}

        {questionType === "1" && <CreateSingleSelection />}
        {questionType === "2" && <CreateMultipleSelection />}
        {questionType === "3" && <CreateShortAnswer />}
        {questionType === "4" && <Typography>4번 테스트</Typography>}
      </CardContent>
    </Card>
  );
};

const test: React.FC = () => {
  return (
    <Container>
      <Card variant="outlined">
        <CardContent>
          <TextField id="standard-basic" label="문항 제목" variant="standard" />

          <TextField id="standard-basic" label="문항 제목" variant="standard" />
          <TextField
            id="standard-basic"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "16px", // 내부 텍스트 크기 조절
              },
              "& input": {
                padding: "12px", // 입력 필드 크기 조절 (예: 패딩을 조정하여 크기 조절)
              },
            }}
            label="문항 설명"
            size="small"
          />
          <Typography variant="h5" component="div">
            1. 단일선택형 문항입니다
          </Typography>

          <Box
            component="div"
            sx={{
              display: "inline-block",
              mx: "2px",
              marginLeft: "15px",
              marginTop: "10px",
            }}
          >
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              문항에 대한 설명입니다.
            </Typography>
          </Box>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="10개 ~ 100개"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="100개 ~ 1000개"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="1000개 ~ 10000개"
            />
          </RadioGroup>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateQuestionSingleSelection;

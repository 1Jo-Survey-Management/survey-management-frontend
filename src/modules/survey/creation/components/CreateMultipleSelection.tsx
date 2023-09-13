import { Box, Checkbox, Input } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const primaryColor = "#3f50b5";

const styles = {
  selectionBox: {
    display: "flex",
    alingItems: "center",
  },
  removeAndAddIconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: "53px",
  },
  icon: {
    color: primaryColor,
    border: `solid 1px ${primaryColor}`,
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    flexGrow: 1,
  },
};

/**
 * 다중 선택형 문항 선택지를 만드는 컴포넌트 입니다.
 *
 * @component
 * @returns
 */
const CreateMultipleSelection: React.FC = () => {
  const [selections, setSelections] = useState<any[]>([
    { id: new Date().getTime() },
  ]);

  /**
   * 선택지를 추가하는 메서드 입니다.
   */
  const handleAddSelection = () => {
    setSelections([...selections, { id: new Date().getTime() }]);
  };

  /**
   * 선택지를 삭제하는 메서드 입니다.
   *
   * @param id 삭제할 selection
   * @returns {void} state의 selections 에서 삭제
   */
  const handleRemoveSelection = (id: number) => {
    if (selections.length === 1) {
      return;
    }

    const updateSelections = selections.filter(
      (selection) => selection.id !== id
    );
    setSelections(updateSelections);
  };

  return (
    <div>
      {selections.map((selection, index) => (
        <div key={selection.id}>
          <Box sx={styles.selectionBox}>
            <Box sx={styles.removeAndAddIconBox}>
              {index === selections.length - 1 && (
                <AddIcon
                  sx={styles.icon}
                  onClick={handleAddSelection}
                ></AddIcon>
              )}

              <RemoveIcon
                sx={{ ...styles.icon, marginLeft: "5px" }}
                onClick={() => handleRemoveSelection(selection.id)}
              ></RemoveIcon>
            </Box>
            <Checkbox disabled></Checkbox>
            <Input placeholder="문항을 입력해주세요." sx={styles.input}></Input>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default CreateMultipleSelection;

import React, { useState } from "react";
import { Box, Radio, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const primaryColor = "#3f50b5";

const styles = {
  icon: {
    color: primaryColor,
    border: `solid 1px ${primaryColor}`,
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    flexGrow: 1,
  },
  removeAndAddIconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: "53px",
  },
  selectionBox: {
    display: "flex",
    alingItems: "center",
  },
};

const CreateSingleSelection: React.FC = () => {
  const [selections, setSelections] = useState<any[]>([
    { id: new Date().getTime() },
  ]);

  const handleAddSelection = () => {
    setSelections([...selections, { id: new Date().getTime() }]);
  };

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
                  aria-label="Add"
                  onClick={handleAddSelection}
                />
              )}
              <RemoveIcon
                sx={{ ...styles.icon, marginLeft: "5px" }}
                aria-label="Remove"
                onClick={() => handleRemoveSelection(selection.id)}
              />
            </Box>
            <Radio disabled name={`radio-buttons-${selection.id}`} />
            <Input placeholder="문항을 입력해주세요." sx={styles.input} />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default CreateSingleSelection;

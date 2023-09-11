import React, { useState } from "react";
import { Box, Radio, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const color = "#3f50b5";

const styles = {
  icon: {
    color: color,
    border: `solid 1px ${color}`,
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
};

const CreateSingleSelection: React.FC = () => {
  const [selections, setSelections] = useState<any[]>([
    { id: new Date().getTime() },
  ]);

  const handleAddItem = () => {
    setSelections([...selections, { id: new Date().getTime() }]);
  };

  const handleRemoveItem = (id: number) => {
    if (selections.length === 1) {
      return;
    }
    const updatedItems = selections.filter((selection) => selection.id !== id);
    setSelections(updatedItems);
  };

  return (
    <div>
      {selections.map((selection, index) => (
        <div key={selection.id}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={styles.removeAndAddIconBox}>
              {index === selections.length - 1 && (
                <AddIcon
                  sx={styles.icon}
                  aria-label="Add"
                  onClick={handleAddItem}
                />
              )}
              <RemoveIcon
                sx={{ ...styles.icon, marginLeft: "5px" }}
                aria-label="Remove"
                onClick={() => handleRemoveItem(selection.id)}
              />
            </Box>
            <Radio disabled name={`radio-buttons-${selection.id}`} />
            <Input placeholder="문항 설명을 입력해주세요." sx={styles.input} />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default CreateSingleSelection;

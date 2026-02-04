import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Autocomplete,
    TextField,
    Box,
    Chip,
    Avatar,
} from "@mui/material";

const AssignModalAnalysis = ({
    open,
    onClose,
    title,
    options,
    onSave,
    type,
}) => {
    const [selectedValues, setSelectedValues] = useState([]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">{title}</DialogTitle>

            <DialogContent dividers>
                <Box sx={{ mt: 1 }}>
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) =>
                            type === "user" ? option.name : option.matrixName
                        }
                        filterSelectedOptions
                        onChange={(event, newValue) =>
                            setSelectedValues(newValue)
                        }
                        renderOption={(props, option) => (
                            <Box
                                component="li"
                                {...props}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                {type === "user" && (
                                    <Avatar
                                        src={option.imageProfile}
                                        sx={{ width: 24, height: 24 }}
                                    />
                                )}
                                {type === "user"
                                    ? option.name
                                    : option.matrixName}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={`Buscar ${type === "user" ? "usuarios" : "matrices"}...`}
                                placeholder="Selecciona uno o varios"
                            />
                        )}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={
                                        type === "user"
                                            ? option.name
                                            : option.matrixName
                                    }
                                    {...getTagProps({ index })}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            ))
                        }
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>
                <Button
                    onClick={() => onSave(selectedValues)}
                    variant="contained"
                    disabled={selectedValues.length === 0}
                >
                    Confirmar Asignación
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignModalAnalysis;

import React, { useState } from "react";
import { Paper, TextField, IconButton, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (value) => {
        setQuery(value)
            onSearch(value);
    };

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", width: "400px", p: "4px 12px", borderRadius:"15px", border:"1px solid #39A90060" }}
        >
            <TextField
                variant="standard"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => handleSubmit(e.target.value)}
                fullWidth
                InputProps={{ disableUnderline: true }}
            />
            <IconButton>
                <Search />
            </IconButton>
        </Box>
    );
};

export default SearchBar;

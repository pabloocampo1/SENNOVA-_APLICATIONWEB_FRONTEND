import React, { useState } from "react";
import { Paper, TextField, IconButton, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (value) => {
        setQuery(value)
            onSearch(value);
    };

    return (
        <Box
            sx={{ display: "flex", alignItems: "center",  width: { xs: "100%", sm: "280px", md: "350px", lg: "400px" }, borderRadius:"15px", border:"1px solid #39A90060" }}
        >
            <TextField
                variant="standard"
                placeholder={placeholder}
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

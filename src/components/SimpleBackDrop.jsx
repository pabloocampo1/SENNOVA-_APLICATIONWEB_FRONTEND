import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function SimpleBackdrop({ open, text = "Cargando" }) {
    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: 1000,
                    display: "flex",
                    position: "absolute",
                    flexDirection: "column",
                }}
                open={open}
            >
                <CircularProgress color="inherit" sx={{ mb: "20px" }} />
                <Typography>{text}</Typography>
            </Backdrop>
        </div>
    );
}

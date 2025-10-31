import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function SimpleBackdrop({ open, text = "Cargando" }) {
    return (
        <div>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
            >
                <CircularProgress color="inherit" />
                <Typography>{text}</Typography>
            </Backdrop>
        </div>
    );
}

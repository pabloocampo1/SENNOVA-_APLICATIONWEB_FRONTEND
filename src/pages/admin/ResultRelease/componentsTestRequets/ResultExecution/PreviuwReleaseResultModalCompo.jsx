import { Box } from "@mui/material";
import React from "react";

const PreviuwReleaseResultModalCompo = ({ pdfPreviewUrl }) => {
    return (
        <Box sx={{ width: "900px" }}>
            {pdfPreviewUrl && (
                <Box sx={{ mt: 2 }}>
                    <iframe
                        src={pdfPreviewUrl}
                        width="100%"
                        height="500px"
                        title="Vista previa PDF"
                    />
                </Box>
            )}
        </Box>
    );
};

export default PreviuwReleaseResultModalCompo;

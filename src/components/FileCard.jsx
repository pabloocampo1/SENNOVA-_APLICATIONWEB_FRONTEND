import { Card, CardContent, Typography, IconButton, Box, Button } from "@mui/material";
import { Delete, FileOpen } from "@mui/icons-material";

const FileCard = ({ file, onDelete }) => {
    return (
        <Card
            sx={{
                width: 220,
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <FileOpen sx={{ mr: 1, color: "primary.main" }} />
                    <Typography
                        variant="subtitle2"
                        sx={{ wordBreak: "break-word", flexGrow: 1 }}
                    >
                        {file.nameFile || file.publicId}
                    </Typography>
                </Box>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={file.nameFile}
                    size="small"
                    variant="outlined"
                >
                    Descargar
                </Button>

                <IconButton
                    color="error"
                    onClick={() => onDelete(file.publicId)}
                >
                    <Delete />
                </IconButton>
            </Box>
        </Card>
    );
};

export default FileCard;

import React, { useState } from 'react';
import BarcodeScanner from './BarCodeScanner';
import { Box, Button, Typography, Paper, alpha } from '@mui/material';

const ScamCompo = ({ handleScamCode }) => {
    const [openScanner, setOpenScanner] = useState(false);
    const [scanning, setScanning] = useState(false);

    const handleDetected = async (parsed) => {
        const code = typeof parsed === "string" ? parsed : parsed?.code ?? parsed;
        setScanning(false);
        handleScamCode(code);
    };

    const handleScanClick = () => {
        setScanning(true);
        setOpenScanner(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: 3,
            }}
        >
            {/* Header */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #68e831ff 0%, #1b5f13ff 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 0.5,
                    }}
                >
                    Escanear Código
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                    }}
                >
                    Captura rápida y precisa
                </Typography>
            </Box>

            {/* Main Button */}
            <Paper
                sx={{
                    background: 'linear-gradient(135deg, #46ec31ff 0%, #17760aff 100%)',
                    p: 0,
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: scanning
                        ? '0 8px 32px rgba(33, 150, 243, 0.5)'
                        : '0 4px 16px rgba(33, 150, 243, 0.25)',
                    '&:hover': {
                        transform: openScanner ? 'none' : 'translateY(-4px)',
                        boxShadow: openScanner
                            ? 'none'
                            : '0 12px 32px rgba(33, 150, 243, 0.4)',
                    },
                }}
                elevation={0}
            >
                <Button
                    fullWidth
                    onClick={handleScanClick}
                    disabled={openScanner}
                    sx={{
                        py: 3.5,
                        px: 2,
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:disabled': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '&:hover:not(:disabled)': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            animation: scanning ? 'pulse 1s infinite' : 'none',
                        }}
                    >
                        <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 0 .948-.684l1.498-4.153a1 1 0 0 1 1.848 0l1.498 4.153a1 1 0 0 0 .948.684H19a2 2 0 0 1 2 2v2M3 9h18" />
                        <rect x="3" y="13" width="18" height="8" rx="2" />
                    </svg>
                    <span style={{ animation: scanning ? 'pulse 1s infinite' : 'none' }}>
                        {openScanner ? 'Escaneando...' : 'Escanear Código de Barras'}
                    </span>

                    <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}</style>
                </Button>
            </Paper>

            {/* Info Card */}
            <Paper
                sx={{
                    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(25, 118, 210, 0.08) 100%)',
                    border: '1.5px solid',
                    borderColor: alpha('#2196F3', 0.2),
                    p: 2.5,
                    borderRadius: 2,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFA726"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginTop: '2px', flexShrink: 0 }}
                >
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 0.5,
                        }}
                    >
                        Consejo para mejor resultado
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.85rem',
                            lineHeight: 1.6,
                        }}
                    >
                        Asegúrate de enfocar bien el código de barras. Mantén la distancia adecuada y evita reflejos de luz para una lectura óptima.
                    </Typography>
                </Box>
            </Paper>

            {/* Scanner Component */}
            <BarcodeScanner
                open={openScanner}
                onDetected={handleDetected}
                onClose={() => {
                    setOpenScanner(false);
                    setScanning(false);
                }}
            />
        </Box>
    );
};

export default ScamCompo;
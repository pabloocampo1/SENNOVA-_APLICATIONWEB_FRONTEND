import { Box, Skeleton } from "@mui/material";

const DashboardSkeleton = ({ theme }) => {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                borderRadius: "16px",
                p: "20px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="55%"
                    height={200}
                    sx={{ borderRadius: "16px" }}
                />

                <Skeleton
                    variant="rectangular"
                    width="40%"
                    height={200}
                    sx={{ borderRadius: "16px" }}
                />
            </Box>

            {/* KPIs */}
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                    mt: "30px",
                }}
            >
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        height={150}
                        sx={{ borderRadius: "16px" }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    mt: "30px",
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        width: "55%",
                        p: 3,
                        bgcolor: "background.paper",
                        borderRadius: "20px",
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Skeleton variant="text" width={220} height={28} />
                    <Skeleton
                        variant="text"
                        width={320}
                        height={20}
                        sx={{ mb: 3 }}
                    />

                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="rectangular"
                            height={28}
                            sx={{
                                mb: 1,
                                borderRadius: "8px",
                            }}
                        />
                    ))}
                </Box>

                {/* PIE CHART SKELETON */}
                <Box
                    sx={{
                        width: "40%",
                        p: 3,
                        bgcolor: "background.paper",
                        borderRadius: "20px",
                        border: `1px solid ${theme.palette.divider}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Skeleton
                        variant="text"
                        width={200}
                        height={20}
                        sx={{ mb: 4 }}
                    />
                    <Skeleton variant="circular" width={180} height={180} />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardSkeleton;

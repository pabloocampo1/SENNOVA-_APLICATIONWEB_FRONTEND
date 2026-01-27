import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import { PieChart } from "@mui/x-charts";
import { Box, Skeleton, Typography } from "@mui/material";
import YearSelect from "../../../../components/YearSelect";

const ChartsSkeleton = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <Box sx={{ width: "60%" }}>
            <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 2 }}
            />
        </Box>

        <Box sx={{ width: "40%" }}>
            <Skeleton width={180} height={24} sx={{ mb: 1 }} />
            <Skeleton width={220} height={18} sx={{ mb: 4 }} />

            <Skeleton
                variant="circular"
                width={200}
                height={200}
                sx={{ mx: "auto" }}
            />
        </Box>
    </Box>
);

export default function TopUsageProductsChart({ theme }) {
    const [datasetProducts, setDatasetProducts] = useState([]);
    const [datasetSamples, setDatasetSamples] = useState([]);
    const [yearSelected, setYearSelected] = useState("");
    const [loading, setLoading] = useState(true);

    const getData = async (year = "") => {
        setYearSelected(year);
        setLoading(true);

        try {
            const res = await api.get(
                "/dashboard/products/analysis-count/ranking",
                {
                    params: { year },
                },
            );

            setDatasetProducts(res.data.productsMoreUsed);
            setDatasetSamples(res.data.matrixMoreUsed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const chartParams = {
        yAxis: [{ label: "" }],
        series: [
            {
                label: "Cantidad de veces usado",
                dataKey: "totalAnalysis",
            },
        ],
        dataset: datasetProducts,
        height: 400,
    };

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: "20px",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                width: "100%",

                gap: "40px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "50px",
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Productos y análisis más utilizados —{" "}
                        {yearSelected || new Date().getFullYear()}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 3 }}
                    >
                        Ranking de productos (análisis) y matrices con mayor uso
                        en ensayos
                    </Typography>
                </Box>

                <YearSelect onYearChange={(param) => getData(param)} />
            </Box>

            {loading ? (
                <ChartsSkeleton />
            ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "60%" }}>
                        <BarChart
                            xAxis={[
                                {
                                    scaleType: "band",
                                    dataKey: "productName",
                                    valueFormatter: (productName, context) =>
                                        context.location === "tick"
                                            ? productName
                                            : `${
                                                  datasetProducts.find(
                                                      (d) =>
                                                          d.productName ===
                                                          productName,
                                                  )?.productName
                                              }`,
                                },
                            ]}
                            {...chartParams}
                        />
                    </Box>

                    <Box>
                        <Typography
                            sx={{ color: "primary.main", fontWeight: 500 }}
                        >
                            Las 10 muestras (Matrix) más usadas
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                pb: "50px",
                                color: "text.secondary",
                                fontWeight: 500,
                            }}
                        >
                            Distribución de uso por tipo de muestra
                        </Typography>

                        <PieChart
                            series={[
                                {
                                    data: datasetSamples.map((item, index) => ({
                                        id: index,
                                        value: item.total,
                                        label: `${item.matrix} / ${item.total}`,
                                    })),
                                },
                            ]}
                            width={200}
                            height={200}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

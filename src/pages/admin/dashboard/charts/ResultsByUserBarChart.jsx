import { Box, Skeleton, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import YearSelect from "../../../../components/YearSelect";
import api from "../../../../service/axiosService";

const ChartsSkeleton = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <Box sx={{ width: "60%" }}>
            <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 2 }}
            />
        </Box>
    </Box>
);
const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

function buildChartData(rawData) {
    const users = [...new Set(rawData.map((item) => item.name))];

    const dataByUser = users.map((user) => {
        const totalsPerMonth = Array(12).fill(0);

        rawData
            .filter((item) => item.name === user)
            .forEach((item) => {
                const monthIndex = item.month - 1;
                totalsPerMonth[monthIndex] += item.total;
            });

        return {
            label: user,
            data: totalsPerMonth,
        };
    });

    return dataByUser;
}

const ResultsByUserBarChart = ({ theme }) => {
    const [yearSelected, setYearSelected] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataSet, setDataSet] = useState([]);

    const series = buildChartData(dataSet);

    const getData = async (year = "") => {
        console.log(year);

        setYearSelected(year);
        setLoading(true);

        try {
            const res = await api.get("/dashboard/results-by-user", {
                params: { year: year },
            });

            setDataSet(res.data);
            console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: "20px",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                width: "100%",
                mt: "30px",
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
                        Resultados emitidos por responsable —{" "}
                        {yearSelected ?? new Date().getFullYear()}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 3 }}
                    >
                        Distribución mensual de resultados generados por cada
                        analista durante el año
                    </Typography>
                </Box>

                <YearSelect onYearChange={(param) => getData(param)} />
            </Box>
            {loading ? (
                <ChartsSkeleton />
            ) : (
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: MONTHS,
                        },
                    ]}
                    series={series.map((user) => ({
                        label: user.label,
                        data: user.data,
                        stack: "total",
                    }))}
                    height={350}
                />
            )}
        </Box>
    );
};

export default ResultsByUserBarChart;

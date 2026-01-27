import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";

export default function YearSelect({ startYear = 2025, onYearChange }) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const years = useMemo(() => {
        const result = [];
        for (let year = startYear; year <= currentYear; year++) {
            result.push(year);
        }
        return result;
    }, [startYear, currentYear]);

    const handleChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        onYearChange?.(year);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Año</InputLabel>
            <Select value={selectedYear} label="Año" onChange={handleChange}>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

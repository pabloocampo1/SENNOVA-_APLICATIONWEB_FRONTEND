import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const mode = localStorage.getItem("dark");
        return mode === "true"
    });

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            localStorage.setItem("dark", !prev);
            return !prev;
        });

    };


    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: "Inter, sans-serif",
                    fontWeightRegular: 400,
                    fontWeightMedium: 500,
                    fontWeightSemiBold: 600,
                    fontWeightBold: 700,
                    h1: {
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                },
                h2: {
                    fontSize: "2rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                },
                h3: {
                    fontSize: "1.75rem",
                    fontWeight: 600,
                },
                body1: {
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color:"black"
                },
                body2: {
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "#555",
                },
                },
                palette: {
                    primary: {
                        main: "#39A900",
                        dark: "#2A8A7A",
                        light: "#6FCFBC",
                        contrastText: "#FFFFFF",
                    },
                    secondary: {
                        main: "#A9E6DB",
                        dark: "#1E6B5E",
                        light: "#D1F3ED",
                    },
                    background: {
                        default: "#F9F9F9",
                        paper: "#FFFFFF",
                    },
                    text: {
                        primary: "#1E6B5E",
                        secondary: "#2A8A7A",
                    },
                },
                
            }),
        [darkMode]
    );

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

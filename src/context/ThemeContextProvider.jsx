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
                 fontFamily: `"Space Grotesk", "Helvetica", "Arial", sans-serif`,
                },
                palette: {
                    mode: darkMode ? "dark" : "light",
                    primary: { main: "#39A900" },
                    background: {
                        default: darkMode ? "#121212" : "#F9F9F9",
                        paper: darkMode ? "#1e1e1e" : "#FFFFFF",
                    },
                    text: {
                        primary: darkMode ? "#FFFFFF" : "#000000",
                        secondary: darkMode ? "#d2e4d2ff" : "#426640",
                    },
                    border: {
                        primary: darkMode ? "#c3c3c330" : "#00000010"
                    }
                },
                components: {

                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                backgroundColor: "transparent",
                                color: "text.primary",
                                "& input:-webkit-autofill": {
                                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                                    WebkitTextFillColor: "#000",
                                    caretColor: "#000",
                                    transition: "background-color 5000s ease-in-out 0s",
                                },
                            },
                        },
                    },
                    MuiTypography: {
                        variants: [
                            {
                                props: { variant: "description" },
                                style: {
                                    fontSize: "16px",
                                    color: darkMode ? "#ffffffff" : "#000000ff",
                                    opacity: 0.50,
                                    lineHeight: 1.6,
                                },
                            },
                            {
                                props: { variant: "h3" },
                                style: {
                                    fontSize: "20px",
                                    color: darkMode ? "#ffffff" : "#000000",
                                    lineHeight: 1.6,
                                },
                            },
                            {
                                props: { variant: "h2" },
                                style: {
                                    fontSize: "2rem",
                                    color: darkMode ? "#39A900" : "#39A900",
                                    lineHeight: 1.6,
                                },
                            },
                        ],
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

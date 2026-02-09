import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../../service/axiosService";
import imageSucess from "../../../assets/images/undraw_order-confirmed_m9e9.svg";
import SimpleBackdrop from "../../SimpleBackDrop";

const ChangeEmailCompo = ({ authObject = {}, setAuthObject, onClose }) => {
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [tokenCorrect, setCorrectToken] = useState(false);
    const [requestSucess, setRequestSucess] = useState(false);
    const [code, setCode] = useState();
    const [isLoanding, setIsLoanding] = useState(false);

    const handleSumit = (e) => {
        e.preventDefault();
        setIsLoanding(true);
        const fetchCode = async () => {
            try {
                const res = await api.post(
                    `/auth/generateToken/change/email/${authObject.email}/${newEmail}`,
                );

                setError(false);
                setMessageError("");
                setRequestSucess(true);
            } catch (error) {
                console.error(error);
                if (error.response.data.status == 404) {
                    setError(true);
                    setRequestSucess(false);
                    let msg = error.response.data.message;

                    // delete :  "java.lang.IllegalArgumentException: "
                    msg = msg.replace(
                        /^java\.lang\.IllegalArgumentException:\s*/,
                        "",
                    );
                    setMessageError(msg);
                }
            } finally {
                setIsLoanding(false);
            }
        };

        fetchCode();
    };
    const handleSumitCode = (e) => {
        e.preventDefault();
        setIsLoanding(true);
        const fetchCode = async () => {
            try {
                const res = await api.post(
                    `/auth/validate/code/changeEmail/${code}`,
                );
                if (res.status == 200) {
                    if (res.data) {
                        setError(false);
                        setMessageError("");
                        setAuthObject({
                            ...authObject,
                            email: res.data,
                        });

                        setCorrectToken(true);
                    } else {
                        setError(true);
                        setMessageError(
                            "Ocurrio un error intentado cambiar tu email",
                        );
                        setCorrectToken(false);
                    }
                }
            } catch (error) {
                console.error(error);
                if (error.response.data.status == 404) {
                    setError(true);
                    let msg = error.response.data.message;

                    // delete :  "java.lang.IllegalArgumentException: "
                    msg = msg.replace(
                        /^java\.lang\.IllegalArgumentException:\s*/,
                        "",
                    );
                    setMessageError(msg);
                    setCorrectToken(false);
                }
            } finally {
                setIsLoanding(false);
            }
        };

        fetchCode();
    };

    if (tokenCorrect) {
        return (
            <Box
                sx={{
                    width: "400px",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ textAlign: "center", pb: "20px" }}>
                    Email cambiado exitosamente
                </Typography>
                <img src={imageSucess} alt="image success" width={200} />

                <Button
                    sx={{ mt: "20px" }}
                    variant="contained"
                    onClick={() => onClose()}
                >
                    Cerrar
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "400px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <SimpleBackdrop open={isLoanding} />
            {requestSucess ? (
                <Box
                    component={"form"}
                    onSubmit={handleSumitCode}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Typography
                        variant="h3"
                        sx={{ pb: "20px", textAlign: "center" }}
                    >
                        Cambiar email
                    </Typography>
                    <TextField
                        label="Codigo"
                        type="number"
                        placeholder="Digita el codigo que se envio al email"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <Button
                        sx={{ mt: "40px" }}
                        variant="contained"
                        type="submit"
                    >
                        Enviar
                    </Button>
                </Box>
            ) : (
                <Box
                    component={"form"}
                    onSubmit={handleSumit}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Typography
                        variant="h3"
                        sx={{ pb: "20px", textAlign: "center" }}
                    >
                        Verificar email
                    </Typography>
                    <TextField
                        label="Nuevo correo electronico"
                        type="email"
                        placeholder="Digita el nuevo email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <Button
                        sx={{ mt: "40px" }}
                        variant="contained"
                        type="submit"
                    >
                        Cambiar email
                    </Button>
                </Box>
            )}
            {error && (
                <Typography
                    sx={{
                        pt: "20px",
                        color: "red",
                        opacity: "0,60",
                        textAlign: "center",
                    }}
                >
                    {messageError}
                </Typography>
            )}
        </Box>
    );
};

export default ChangeEmailCompo;

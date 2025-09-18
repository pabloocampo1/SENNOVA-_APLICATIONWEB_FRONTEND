import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import api from '../../service/axiosService';

const DeactivateAccountConfirmation = ({ authObject, onClose, setAuthObject }) => {
    const [error, setError] = useState(false);

    // agregar el estado de la cuenta en el response
    // validar los botones
    // cambiar los estados de la cuenta



    const deactivateAccount = () => {
        const fetch = async () => {
            try {

                let username = authObject.username;
                const res = await api.post(`/users/deactiveAccount/${username}`);

                if (res.data) {
                    onClose()
                    setError(false)
                    setAuthObject({
                        ...authObject,
                        available: false,
                    })
                }

                if (res.status !== 200) {
                    setError(true)
                }

            } catch (error) {
                setError(true)
            }
        }

        fetch()
    }

    const activeAccount = () => {
        const fetch = async () => {
            try {

                let username = authObject.username;
                const res = await api.post(`/users/activeAccount/${username}`);

                if (res.data) {
                    onClose()
                    setError(false)
                    setAuthObject({
                        ...authObject,
                        available: true,
                    })
                }

                if (res.status !== 200) {
                    setError(true)
                }

            } catch (error) {
                setError(true)
            }
        }

        fetch()
    }


    const handleClose = () => {
        onClose()
    }




    return (
        <Box sx={{ width: "400px", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {authObject.available ?
                (<Typography sx={{ textAlign: "center" }}>Estas seguro que deseas desactivar la cuenta temporalmente?</Typography>)
                :
                (<Typography sx={{ textAlign: "center" }}>Estas seguro que deseas activar tu cuenta?</Typography>)}

            <Box sx={{ display: "flex", mt: "40px", width: "100%", justifyContent: "space-evenly" }}>
                <Button variant='contained' sx={{ bgcolor: "red" }} onClick={() => handleClose()}>
                    Cancelar
                </Button>

                {authObject.available
                    ?
                    (<Button variant='outlined' onClick={() => deactivateAccount()}>
                        Aceptar
                    </Button>)
                    :
                    (<Button variant='outlined' onClick={() => activeAccount()}>
                        Aceptar
                    </Button>)}
            </Box>

            {error && (<Typography sx={{ color: "red" }}>Ocurrio un error al intentar cambiar el estado de tu cuenta.</Typography>)}
        </Box>
    );
};

export default DeactivateAccountConfirmation;
import { Box, Modal } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  bgcolor: 'background.paper',
  borderRadius:"15px",
  p: 4,
};

const GenericModal = ({compo, open, onClose}) => {
  

  return (
    <Box sx={{borderRadius:"15px"}}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {compo}
        </Box>
      </Modal>
    </Box>
  );
};

export default GenericModal;
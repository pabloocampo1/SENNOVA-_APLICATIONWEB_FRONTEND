import { Box } from "@mui/material";

import AssignMemberWhenAccept from "../../quotes/quotesCompo/AssignMemberWhenAccept";

const AddMemberCompo = ({
    testRequestId,
    requestCode,
    onClose,
    samples = [],
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100%",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: "background.paper",
                p: "20px",
            }}
        >
            <AssignMemberWhenAccept
                onClose={() => onClose()}
                testRequestId={testRequestId}
                requestCode={requestCode}
                isAddAnotherMember={true}
                samples={samples}
            />
        </Box>
    );
};

export default AddMemberCompo;

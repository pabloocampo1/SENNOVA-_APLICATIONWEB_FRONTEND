import api from "../service/axiosService";
import { AuthContext } from "../context/AuthContext";

const downloadExcel = (url, filename) => {
    api.get(url, { responseType: "blob" })
        .then((res) => {
            const blob = new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(link.href);
        })
        .catch((err) => {
            console.error("Error downloading file:", err);
        });
};

export default downloadExcel;

export const downloadPdf = (equipmentId, internal_code) => {
    api.get(`/export/equipment/pdf/${equipmentId}`, { responseType: "blob" })
        .then((res) => {
            const blob = new Blob([res.data], {
                type: "application/pdf",
            });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);

            link.setAttribute("download", `Equipo_${internal_code}`);

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);
        })
        .catch((err) => {
            console.error("Error downloading PDF file:", err);
        });
};
export const downloaReagentdPdf = (reagentId, ReagentName, lote, email) => {
    console.log(email);

    const dto = {
        reagentsId: reagentId,
        responsibleEmailDownload: email,
    };

    console.log(email);

    api.post("/export/reagent/pdf", dto, { responseType: "blob" })
        .then((res) => {
            const blob = new Blob([res.data], {
                type: "application/pdf",
            });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute(
                "download",
                `reactivo_${ReagentName}_lote_${lote}.pdf`,
            );

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);
        })
        .catch((err) => {
            console.error("Error downloading PDF file:", err);
        });
};

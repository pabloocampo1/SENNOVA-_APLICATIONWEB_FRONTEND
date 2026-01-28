import api from "../service/axiosService";

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

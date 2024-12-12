export const convertRole = (role:string) => {
    switch (role) {
        case "admin":
            return "Quản trị viên";
        case "officer":
            return "Cán bộ";
        case "student":
            return "Sinh viên";
        case "guest":
            return "Khách";
        default:
            return "Không xác định";
    }
}
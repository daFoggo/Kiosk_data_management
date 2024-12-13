export const convertRole = (role: string) => {
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
};

export const convertGender = (gender: string) => {
  switch (gender) {
    case "nam":
      return "Nam";
    case "nu":
      return "Nữ";
    default:
      return "Không xác định";
  }
};

export const convertStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Chờ xác nhận";
    case "confirmed":
      return "Đã xác nhận";
    case "finished":
      return "Đã hoàn thành";
    case "canceled":
      return "Đã hủy";
    case "expired":
      return "Đã hết hạn";
    default:
      return "Không xác định";
  }
};

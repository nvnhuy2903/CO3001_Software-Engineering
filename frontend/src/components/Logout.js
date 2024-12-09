import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./ui/provider";

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const hasConfirmed = useRef(false);

    useEffect(() => {
        if (hasConfirmed.current) {
            return;
        }
        hasConfirmed.current = true;

        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmLogout) {
            logout(); // Xóa token và cập nhật trạng thái xác thực
            navigate("/"); // Chuyển hướng về trang LandingPage
        } else {
            navigate("/homepage"); // Quay lại trang trước đó
        }
    }, [logout, navigate]);

    return null; // Không cần render gì
};

export default Logout;
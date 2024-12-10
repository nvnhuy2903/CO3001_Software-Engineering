import React from "react";
import MainLayout from "./MainLayout";

const AboutUs = () => {
    return (
        <MainLayout>
            <div style={{
                color: "#030391", 
                fontFamily: "Coiny", 
                padding: "30px", 
                backgroundColor: "#ffffff", 
                borderRadius: "10px", 
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "20px"
            }}>
                <h1 style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    fontWeight: "bold", 
                    color: "#030391"
                }}>Thông tin về hệ thống</h1>
                
                <div style={{
                    marginTop: "30px",
                    border: "2px solid #2c3e50", 
                    padding: "20px", 
                    borderRadius: "8px", 
                    backgroundColor: "#f0f0f0"
                }}>
                    <div style={{
                        marginBottom: "20px", 
                        padding: "15px", 
                        backgroundColor: "#ffffff", 
                        border: "2px solid #2c3e50", 
                        borderRadius: "5px"
                    }}>
                        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#030391" }}>
                            Hệ thống Dịch vụ In thông minh HCMUT (HCMUT_SSPS)
                        </h2>
                        <p style={{ fontSize: "16px", color: "#030391" }}>
                            Hệ thống Dịch vụ In thông minh HCMUT (HCMUT_SSPS) được phát triển để phục vụ nhu cầu in ấn của sinh viên tại các cơ sở của Trường Đại học Bách Khoa TP.HCM (HCMUT). 
                            Với mục tiêu mang đến một trải nghiệm in ấn tiện lợi, hiệu quả và dễ dàng, hệ thống cho phép sinh viên in tài liệu ngay trên nền tảng web, từ bất kỳ đâu trong khuôn viên trường.
                        </p>
                    </div>
                    
                    <div style={{
                        marginTop: "30px", 
                        padding: "15px", 
                        backgroundColor: "#ffffff", 
                        border: "2px solid #2c3e50", 
                        borderRadius: "5px"
                    }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#030391" }}>
                            Web được phát triển bởi:
                        </h3>
                        <ul style={{ paddingLeft: "20px", fontSize: "16px", color: "#030391" }}>
                            <li>Nguyễn Trương Thái Bảo – 2210251</li>
                            <li>Nguyễn Truyền Tuấn – 2213795</li>
                            <li>Nguyễn Tuấn Huy – 2211253</li>
                            <li>Nguyễn Văn Nhật Huy – 2211254</li>
                            <li>Phạm Bá Nhật Khang – 2211460</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutUs;

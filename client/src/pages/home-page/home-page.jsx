import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Catalogue from "./components/catalogue/Catalogue";
import "./home-page.css";
import XNSV from "../../assets/xnsv.png";
import MGHP from "../../assets/mghp.png";
import BHYT from "../../assets/bhyt.png";
import KTX from "../../assets/ktx.png";
import MainLayout from "../../components/layout";
function HomePage() {
  const formXNSV = {
    title: "Xác nhận sinh viên",
    image: XNSV,
    formName: [
      "Xác nhận để hoãn nghĩa vụ quân sự",
      "Xác nhận ưu đãi giáo dục/ con thương binh",
      "Xác nhận để thi anh văn",
    ],
    backgroundColor: "2DBF67",
  };

  const formMGHP = {
    title: "Miễn giảm học phí",
    image: MGHP,
    formName: [
      "Mẫu đơn xin miễn giảm học phí tại trường ĐHQT",
      "Mẫu xác nhận nhân thân người có công cách mạng",
    ],
    backgroundColor: "407AD1",
  };

  const formBHYT = {
    title: "Bảo hiểm y tế",
    image: BHYT,
    formName: [
      "Đơn yêu cầu trả tiền BHYT & Mẫu biên bản tai nạn",
      "Đơn cấp lại thẻ BYHT",
      "Thanh toán trực tiếp BHYT",
      "DS hộ gia đình tham gia BHYT",
      "Mẫu TK1 - TS kê khai thông tin BHYT",
      "Mẫu kê khai phụ lục hộ gia đình (trường hợp không có mã BHXH)",
    ],
    backgroundColor: "DF3636",
  };

  const formKTX = {
    title: "Ký Túc Xá",
    image: KTX,
    formName: ["Đơn xin chuyển ra khỏi KTX", "Đơn xin ở KTX"],
    backgroundColor: "D7C634",
  };

  const formList = [formXNSV, formMGHP, formBHYT, formKTX];
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getformlist")
      .then((res) => {
        setData(res.data);
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <MainLayout>
        <div className="homepage-container">
          <div className="homepage-info">
            <h1 className="homepage-name">Services</h1>
            <input
              className="homepage-search"
              // autocomplete="off"
              type="text"
              id=""
              placeholder="Type Keywords to find services"
            />
          </div>
          {/* <div className="homepage-catalogue-container">
          {formList.map(item => (
            <Catalogue
              title={item.title}
              image={item.image}
              formName={item.formName}
              backgroundColor={item.backgroundColor} />
          ))}
        </div> */}
          {data.map((item) => {
            const passingData = { id: item.form_no, name: item.form_name };
            return (
              <div>
                <Link to="/request-page" state={passingData}>
                  {item.form_name}
                </Link>
              </div>
            );
          })}
        </div>
      </MainLayout>
    </div>
  );
}

export default HomePage;

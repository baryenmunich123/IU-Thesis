import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Catalogue from "./components/catalogue/Catalogue";
import "./home-page.css";
import MainLayout from "../../components/layout";
import { Button } from "@mui/material";
function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getFormList")
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
          <div className="homepage-service-container">
            {data.map((item) => {
              const passingData = { id: item.form_no, name: item.form_name };
              return (
                <div className="homepage-service-btn">
                  <Button variant="contained">
                    <Link to="/request-page" state={passingData} className="homepage-service-link">
                      {item.form_name}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default HomePage;

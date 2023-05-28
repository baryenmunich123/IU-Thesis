import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Catalogue from "./components/catalogue/Catalogue";
import "./home-page.css";
import MainLayout from "../../components/layout";
import { Button, Input, TextField } from "@mui/material";
function HomePage() {
  const [dynamicForm, setDynamicForm] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8080/getDynamicFormList")
      .then((res) => {
        setDynamicForm(res.data);
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

            <TextField
              className="homepage-search"
              label="Search"
              variant="outlined"
              placeholder="Find Services..."
              size="small"
            />
          </div>
          <div className="homepage-service-container">
            {dynamicForm && (
              <>
                {dynamicForm.map((item) => {
                  const passingData = {
                    name: item.form_name,
                    data: item.form_data,
                    form_no: item.form_no,
                  };
                  return (
                    <div className="homepage-service-btn">
                      <Button variant="contained">
                        <Link
                          to="/request-dynamic"
                          state={passingData}
                          className="homepage-service-link"
                        >
                          {item.form_name}
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default HomePage;

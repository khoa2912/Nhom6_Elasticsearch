import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import axios from "../../../helper/axios";
import FileItem from "./component/FileItem";
import "./style.css";
import { CDBBreadcrumb } from "cdbreact";
import { Spinner } from "react-bootstrap";
import AlertCT from "../../components/AlertCT";

export const CreateIndexPage = (props) => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState("");
  const [indexName, setIndexName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /* useEffect(() => {
        async function getIndex() {
          let response = await axios.get('/indexs');
        }
        getIndex()
      }, []) */
  const handleUploadFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleCreateIndex = (e) => {
    setIsLoading(true);
    if (indexName === "" || fileData === "") {
      e.preventDefault();
    } else {
      async function createIndex() {
        const form = new FormData();
        form.append("indexname", indexName);
        form.append("dataindex", fileData);
        console.log(fileData);
        try {
          let response = await axios.post("/data", form);

          console.log(response);
          if (response.status === 200) {
            navigate("/indexs");
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      createIndex();
    }
  };
  return (
    <>
      <CDBBreadcrumb>
        <a className="breadcrumb-item" href="/">
          Trang chủ
        </a>
        <a className="breadcrumb-item" href="/indexs">
          Danh sách index
        </a>
        <li className="breadcrumb-item active">Chỉnh sửa Index</li>
      </CDBBreadcrumb>

      <div className="container_index">
        <h4 className="header_indexs">Tạo index</h4>

        <label for="file-upload" className="custom-file-upload">
          <i className="bi bi-file-earmark-diff icon-file-plus"></i>
          <p>JSON File</p>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleUploadFile}
          style={{ width: "80px" }}
        />

        <Form.Control
          type="text"
          placeholder="Ten index"
          required
          onChange={(e) => {
            setIndexName(e.target.value);
          }}
          className="form-input"
        />

        <FileItem name={fileData.name} />

        <Button
          onClick={handleCreateIndex}
          className="bt-submit"
          disabled={isLoading}
        >
          Tạo
        </Button>
      </div>
    </>
  );
};

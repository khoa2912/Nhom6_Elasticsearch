import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import axios from "../../../helper/axios";
import FileItem from "./component/FileItem";
import "./style.css";
import { CDBBreadcrumb } from "cdbreact";

const CreateIndexPage = (props) => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState("");
  const [indexName, setIndexName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyData,setKeyData]=useState("");
  const [keyUnique,setKeyUnique]=useState("");
  /* useEffect(() => {
        async function getIndex() {
          let response = await axios.get('/indexs');
        }
        getIndex()
      }, []) */
  const handleUploadFile = (e) => {
    setFileData(e.target.files[0]);
    console.log(e.target.files)
    const reader=new FileReader();
    reader.readAsText(e.target.files[0],"UTF-8");
    
    reader.onload=()=>{
      setKeyData(JSON.parse(reader.result))
    }
  };
  const handleCreateIndex = (e) => {
    setIsLoading(true);
    if (indexName === "" || fileData === ""||keyUnique==="") {
      e.preventDefault();
    } else {
      async function createIndex() {
        const form = new FormData();
        form.append("indexname", indexName);
        form.append("dataindex", fileData);
        form.append("key", keyUnique);
        try {
          let response = await axios.post("/api/index", form);
          if (response.status === 201) {
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
        <h4 className="header_indexs">Tạo Index</h4>

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
        <Form.Group controlId="formBasicSelect" style={{marginTop:"240px",padding:"0 70px"}}>
        <Form.Label>Chọn cột dữ liệu unique</Form.Label>
        <Form.Control
          as="select"
          disabled={fileData===""?true:false}
          onChange={e => {
            setKeyUnique(e.target.value);
          }}
        >
          <option value="" defaultValue="">Vui lòng chọn key</option> 
          {keyData!==""?Object.keys(keyData[0]).map(key=>(
           <option value={key}>{key}</option> 
          )):null}
        </Form.Control>
      </Form.Group>
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

export default CreateIndexPage;

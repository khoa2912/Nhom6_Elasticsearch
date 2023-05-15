import React, { useEffect, useState } from "react";
import axios from "../../../helper/axios";
import "./style.css";
import { Button, Modal } from "react-bootstrap";
import {
  CDBTable,
  CDBTableBody,
  CDBTableHeader,
} from "cdbreact";
import FileItem from "../CreateIndexPage/component/FileItem";
import { Link, useNavigate } from "react-router-dom";
import { CDBBreadcrumb } from "cdbreact";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, getIndex } from "../../../action/user";

const IndexPage = (props) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [fileData, setFileData] = useState("");
  const [indexName, setIndexName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndex());
  }, [auth.authenticate,]);

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [dispatch, auth.authenticate]);
  /*   async function getIndex() {
    let response = await axios.get("/api/indexs");
    setIndexs(response.data);
  } */
  const handleDeleteIndex = (e) => {
    dispatch(deleteIndex(e.target.value));
  };

  //Insert data to exists index
  const handleUploadFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleUpdateIndex = (e) => {
    setIsLoading(true);
    if (indexName === "" || fileData === "") {
      e.preventDefault();
    } else {
      async function createIndex() {
        const form = new FormData();
        form.append("indexname", indexName);
        form.append("dataindex", fileData);
        try {
          let response = await axios.put("/api/index", form);
          if(response.status===200){
            dispatch(getIndex())
          }
          setIsLoading(false);
          setShow(false)
        } catch (err) {
          console.log(err);
        }
      }
      createIndex();
    }
  };

  const handleShow = (index) => {
    setShow(true);
    setIndexName(index);
    console.log(index)
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <CDBBreadcrumb>
        <a className="breadcrumb-item" href="/">
          Trang chủ
        </a>
        <a className="breadcrumb-item active" href="/indexs">
          Danh sách Index
        </a>
      </CDBBreadcrumb>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "grid",
                //gridTemplateColumns: "repeat(1, minmax(200px, 700px))",
              }}
            >
              <div className="mt-5 w-100">
                <h1 className="font-weight-bold mb-3">Danh sách index</h1>
                <a
                  color="secondary"
                  className=" btn-create-index"
                  href="/create-index"
                  style={{ height: "35px", boxSizing: "content-box", margin:"10px 0",backgroundColor:"black"}}
                >
                  Tạo index
                </a>
              </div>
              <CDBTable
                responsive={true}
                striped={true}
                className="table-index"
                bordered
              >
                <CDBTableHeader>
                  <tr>
                    <th>Id</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Số lượng doc</th>
                    <th>Kích thước</th>
                    <th>Hành động</th>
                  </tr>
                </CDBTableHeader>
                <CDBTableBody>
                  {user.index.length !== 0 ? (
                    user.index.map(
                      ({ id, index, status, docs_count, store_size }) => (
                        <tr>
                          <td key={id}>{id}</td>
                          <td>
                            <Link to={`/index/${index}`}>{index}</Link>
                          </td>
                          <td>{status}</td>
                          <td>{docs_count}</td>
                          <td>{store_size}</td>
                          <td>
                            <Button
                              className="btn-primary"
                              onClick={()=>handleShow(index)}
                              style={{margin:"0 5px"}}
                            >
                              Thêm data
                            </Button>
                            <Button
                              className="btn-danger"
                              display={{ margin: "4px" }}
                              onClick={(e) => {
                                handleDeleteIndex(e);
                              }}
                              value={index}
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <div>
                      <h8>Bạn chưa có index.</h8>
                      <a href="create-index">Tạo index</a>
                    </div>
                  )}
                </CDBTableBody>
              </CDBTable>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title onClick={() => setShow(true)}>Thêm data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "350px", width: "500px" }}>
            <label for="file-upload" className="custom-file-upload2 ">
              <i className="bi bi-file-earmark-diff icon-file-plus2"></i>
              <p>JSON File</p>
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleUploadFile}
              style={{ width: "80px" }}
            />
            <FileItem name={fileData.name}/>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateIndex}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IndexPage;

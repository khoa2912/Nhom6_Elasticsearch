import React, { useEffect, useState } from "react";
import axios from "../../../helper/axios";
import { Button, Card, NavItem } from "react-bootstrap";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  CDBTableHeader,
  CDBTableBody,
  CDBTable,
  CDBBtn,
  CDBContainer,
  CDBCard,
  CDBCardBody,
  CDBDataTable,
} from "cdbreact";
import { CDBBreadcrumb } from "cdbreact";
import AlertCT from "../../../components/AlertCT";

const EditIndexPage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [size, setSize] = useState("20");
  const [dataTable, setDataTable] = useState([]);
  const [search, setSearch] = useState(false);
  const [scroll_id, setScrollId] = useState("");
  const { indexId } = params;
  const [textSearchRecord, setTextSearchRecord] = useState("");
  const [inputSearchAvanced, setInputSearchAvanced] = useState("");
  const [idDeleteRecord, setIdDeleteRecord] = useState("");
  const [searchby, setSearchBy] = useState("");
  const [hidden, setHidden] = useState(false);
  const [searchField, setSearchField] = useState([]);
  async function getData() {
    let response = await axios.getData(`/api/datas/${indexId}`);
    setData(response.data.hits);
    setScrollId(response.data._scroll_id);
    console.log(response);
  }
  async function SearchRecord() {
    let response;
    if (searchby !== "") {
      response = await axios.post(`/api/searchs/${indexId}`,{
        type: "multi-matching",
        operator: "or",
        size: size,
        [searchby]: textSearchRecord,
      });
      console.log(response);
      if (response.status === 200) {
        setData(response.data.hits);
        /* getDataTable(response.data.hits); */
        setScrollId(response.data._scroll_id);
        handleDataTable(response.data.hits.hits);
      }
    } else {
      response = await axios.post(`/api/searchs/${indexId}`,{
        input: textSearchRecord,
      });
      console.log(response);
      if (response.status === 200) {
        setData(response.data.hits);
        /* getDataTable(response.data.hits); */
        setScrollId(response.data._scroll_id);
        handleDataTable(response.data.hits.hits);
      }
    }
  }
  async function SearchAvancedRecord() {
      const response = await axios.post(`/api/searchadvanced/${indexId}`, {
        query: inputSearchAvanced,
      });
      if (response.status === 200) {
        setData(response.data.hits);
        /* getDataTable(response.data.hits); */
        setScrollId(response.data._scroll_id);
        handleDataTable(response.data.hits.hits);
      }
    }
  

  async function DeleteRecord() {
    console.log(idDeleteRecord);
    let response = await axios.delete(`/api/data/${indexId}/${idDeleteRecord}`);
    console.log(response);
    if (response.status === 200) {
      alert("xoá thành công");
      setIdDeleteRecord("");
      getData();
      getDataTable();
    }
  }
  async function DeleteRecordId(id) {
    let response = await axios.delete(`/api/${indexId}/${id}`);
    console.log(response);
    if (response.status === 200) {
      alert("xoá thành công");
      setIdDeleteRecord("");
      getData();
      getDataTable();
    }
  }
  async function getDataTable() {
    let response = await axios.get(`/api/datas/${indexId}`);
    const data = response.data.hits;
    setData(data)
    handleDataTable(data.hits);
  }
  const handleDataTable = (hits) => {
    const columnTable = [
      {
        label: "Id",
        field: "idField",

        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "idField",
        },
      },
    ];
    hits[0] &&
      Object.keys(hits[0]._source).map((value) => {
        const temp = {
          label: value,
          field: value,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": value,
          },
        };
        columnTable.push(temp);
      });

    const rowTable = [];

    hits[0] &&
      hits.map((value) => {
        const obj = Object.entries(value._source);
        const idField = ["idField", value._id];
        obj.unshift(idField);
        const objtemp = Object.fromEntries(obj);
        rowTable.push(objtemp);
      });

    const dataTable = {
      columns: columnTable,
      rows: rowTable,
    };
    setDataTable(dataTable);
  };
  useEffect(() => {
    if (search === false) {
      getData();
    } else {
      SearchRecord();
    }
    getDataTable();
  }, []);
  const handleReloadRecord = () => {
    getData();
    getDataTable();
  };
  const handleOnChangeOption = (e) => {
    if (e.target.value) {
      setSearchBy(e.target.value);
    }
  };
  const handleRemoveRecord = (id) => {
    DeleteRecordId(id);
  };
  const jsUcfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleSearchRecord = (e) => {
    if (textSearchRecord === "") {
      e.preventDefault();
    } else {
      setSearch(true);
      SearchRecord();
    }
  };
  const handleNextPage = (e) => {
    if (scroll_id === "") {
      e.preventDefault();
    } else {
      async function nextPage() {
        let response = await axios.post(`/nextpage`, { scroll_id });
        console.log(response);
        if (response.status === 200) {
          setScrollId(response.data._scroll_id);
          setData(response.data.hits);
        }
      }
      nextPage();
    }
  };
  const handleDeleteRecord = (e) => {
    if (idDeleteRecord === "" || idDeleteRecord === undefined) {
      e.preventDefault();
    } else {
      console.log(idDeleteRecord);
      DeleteRecord();
    }
  };
  const handleSearchAvanced=(e)=>{
    if(inputSearchAvanced===""){
      e.preventDefault();
    }else{
      SearchAvancedRecord();
    }
  }
  const listSearchField = [
    {
      value: "",
      options: "",
    },
  ];

  const addSearchField = () => {
    setSearchField((searchField) => {
      return [
        ...searchField,
        {
          value: "",
          options: "",
        },
      ];
    });
  };
  const handleRemoveSearchField = (index) => {
    const list = [...searchField];
    list.splice(index, 1);
    setSearchField(list);
  };
  const handleAddSearchField = (e) => {
    addSearchField();
    console.log(searchField);
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
        <li className="breadcrumb-item active">Chỉnh sửa index</li>
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
                gridTemplateColumns: "repeat(1, minmax(200px, 1000px))",
                width: "1800px",
              }}
            >
              <div style={{ display: "auto",margin:"0 15px" }}>
                <div className="mt-5 w-100">
                  <h2 className="font-weight-bold mb-3" style={{margin:"0 5px"}}>Tìm kiếm</h2>
                </div>
                <div>
                  <div style={{ display: "flex", margin: "10px" }}>
                    <Form.Control
                      type="text"
                      value={textSearchRecord}
                      placeholder="Tìm kiếm cơ bản"
                      onChange={(e) => setTextSearchRecord(e.target.value)}
                      required
                      style={{ width: "20%", height: "40px" }}
                    />

                    {/* Bỏ */}
                    {/* danh sách field */}
                    {/* <select
                      aria-label="Default select example"
                      style={{
                        height: "40px",
                        marginLeft: "10px",
                        width: "170px",
                      }}
                      onChange={handleOnChangeOption}
                    >
                      <option>Tìm theo</option>
                      {data.hits != undefined
                        ? Object.keys(data.hits[0]._source).map((key) => (
                          <option key={key} value={key}>
                            {jsUcfirst(key)}
                          </option>
                        ))
                        : null}
                    </select> */}

                    {/* Bỏ */}
                    {/* <select
                      aria-label="Default select example"
                      style={{
                        height: "40px",
                        marginLeft: "10px",
                        width: "170px",
                      }}
                      onChange={handleOnChangeOption}>
                      <option>Type</option>
                      <option>And</option>
                      <option>OR</option>
                    </select> */}

                    <Button
                      className="button_index"
                      onClick={handleSearchRecord}
                    >
                      Tìm bản ghi
                    </Button>
                  
                    <Button
                      className="reload_button"
                      onClick={handleReloadRecord}
                      style={{ margin: "0 4px" }}
                    >
                      Tải lại trang
                    </Button> 

                    {/* Bỏ */}
                    {/* <Button onClick={handleAddSearchField}>+</Button> */}
                  </div>

                  {/* Xử lý search cơ bản */}
                  {searchField !== null
                    ? searchField.map((value) => (
                        <div style={{ display: "flex", margin: "10px" }}>
                          <Form.Control
                            type="text"
                            required
                            style={{ width: "20%", height: "40px" }}
                          />

                          <select
                            aria-label="Default select example"
                            style={{
                              height: "40px",
                              marginLeft: "10px",
                              width: "170px",
                            }}
                            onChange={handleOnChangeOption}
                          >
                            <option>Tìm theo</option>
                            {data.hits != undefined
                              ? Object.keys(data.hits[0]._source).map((key) => (
                                  <option key={key} value={key}>
                                    {jsUcfirst(key)}
                                  </option>
                                ))
                              : null}
                          </select>
                          <Button
                            style={{ margin: "0 10px" }}
                            onClick={() => handleRemoveSearchField(value)}
                          >
                            -
                          </Button>
                        </div>
                      ))
                    : null}
                </div>

                <div style={{ display: "flex", margin: "10px" }}>
                  <>
                    <Form.Control
                      type="text"
                      value={inputSearchAvanced}
                      onChange={(e) => setInputSearchAvanced(e.target.value)}
                      placeholder="Tìm kiếm nâng cao"
                      required
                      style={{ width: "50%" }}
                    />
                    <br />
                  </>
                  <Button className="button_index" onClick={handleSearchAvanced}>
                    Tìm kiếm bản ghi
                  </Button>
                </div>
                <h5 style={{margin:"10px 10px",fontWeight:"bold"}}>Quy ước tìm kiếm nâng cao &emsp; + : and    &emsp; || &emsp;    | : or</h5>
              </div>
              {/* co length moi render */}
              <div
                className="container_headertable"
                style={{ display: "flex", justifyContent: "space-between",margin:"0 20px" }}
              >
                {data.hits !== undefined ? (
                  <h3>Tổng cộng có {data.total.value} bản ghi</h3>
                ) : null}
                {/* <div
                  className="container_button_pagination"
                  style={{ height: "40px" }}
                >
                  <Button onClick={handleNextPage}>Next Page</Button>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    style={{ height: "35px", margin: "5px" }}
                  >
                    <option key={20} value={20}>
                      20
                    </option>
                    <option key={50} value={50}>
                      50
                    </option>
                    <option key={100} value={100}>
                      100
                    </option>
                  </select>
                </div> */}
              </div>

              {/* <CDBTable responsive className="table_render_data">
                <CDBTableHeader color="dark">
                  {data.hits !== undefined ? (
                    <tr>
                      {console.log(scroll_id)}
                      <th>Id</th>
                      {Object.keys(data.hits[0]._source).map((value) => (
                        <th>{jsUcfirst(value)}</th>
                      ))}
                      <th>Action</th>
                    </tr>

                  ) : null}
                </CDBTableHeader>
                <CDBTableBody>
                  {data.hits !== undefined ? (
                    data.hits.map((value) =>
                      <tr>
                        <td>{value._id}</td>
                        {Object.values(value._source).map(dat =>
                          <td>{dat}</td>
                        )}
                        <td>
                          <button className="btn btn-outline-primary" >Edit</button>
                          <button className="btn btn-outline-danger" style={{ margin: "4px" }} onClick={() => handleRemoveRecord(value._id)}>Remove</button>
                        </td>
                      </tr>
                    )
                  ) : null}
                </CDBTableBody>
              </CDBTable> */}
              {/* <CDBCard style={{ width: "fit-content" }}> */}
              <CDBCardBody response>
                <CDBDataTable
                  striped
                  bordered
                  hover
                  responsiveXL
                  checkbox
                  entriesOptions={[10, 50, 100]}
                  entries={10}
                  pagesAmount={4}
                  data={dataTable}
                  searching={false}
                />
              </CDBCardBody>
              {/* </CDBCard> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditIndexPage;

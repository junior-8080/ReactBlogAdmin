import React, { useEffect, useState,useContext } from "react";
import { Col, Table, Collapse, message,Button } from "antd";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Menusm from "./Menusm";
import { VisibleContext } from "./VisibilityContext";

const ArticlesTable = (props) => {
  const [profile, setprofile] = useState(null);
  const [articles, setArticles] = useState(null);
  const [loading, isLoading] = useState(false);
  const {handleVisibility} = useContext(VisibleContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setArticles(data.data);
          isLoading(false);
          setprofile(JSON.parse(localStorage.getItem("profile")));
        } else {
          message.info(data.data.message);
          isLoading(false);
        }
      });
  }, []);

  const genExtra = (id) => (
    <Link to={`/articles/${id}`} className="view">
      View
    </Link>
  );

  const columns = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
      render: (value, row) => {
        if (row.title) {
          return (
            <Collapse>
              <Collapse.Panel
                header={row.title}
                key={row._id}
                extra={genExtra(row._id)}
              >
                <p>{row.description}</p>
              </Collapse.Panel>
            </Collapse>
          );
        }

        return null;
      },
    },
  ];

  return (
    <AdminLayout handleVisibility ={props.handleVisibility}>
      <Col md={16} xs={24} sm={24}>
        <div className="navs-sm">
          <Menusm />
          <h1 className="article-heading">Articles</h1>
          <div className="menu-sm">
             <Button size="sm" onClick={() => {handleVisibility()}}>Create Article</Button>
          </div>
        </div>
        <Table
          dataSource={articles}
          columns={columns}
          pagination={{
            defaultPageSize: 4,
            size:"small"
          }}
          loading={loading}
        />
      </Col>
      <Col md={4} xs={0}  sm={0}className="adminRigth">
        {profile ? (
          <div className="accountDetails">
            <h3>Account</h3>
            <div className="accountDetails">
              <div>
                <p>Name: </p>
                <p>{profile.name}</p>
              </div>
              <div>
                <p>Email: </p>
                <p>{profile.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading....</p>
        )}
      </Col>
    </AdminLayout>
  );
};

export default ArticlesTable;

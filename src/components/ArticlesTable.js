import React, { useEffect, useState, useContext } from "react";
import { Col, Table, Collapse, message, Button } from "antd";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Menusm from "./Menusm";
import { VisibleContext } from "./VisibilityContext";

const ArticlesTable = (props) => {
  const [articles, setArticles] = useState(null);
  const [loading, isLoading] = useState(false);
  const { handleVisibility } = useContext(VisibleContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setArticles(data.data);
          isLoading(false);
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
    <AdminLayout>
      <Col md={20} xs={24} sm={24} className="main-view">
        <div className="navs-sm">
          <Menusm />
          <h1 className="article-heading">Articles</h1>
          <div className="menu-sm">
            <Button
              size="sm"
              onClick={() => {
                handleVisibility();
              }}
            >
              Create Article
            </Button>
          </div>
        </div>
        <Table
          dataSource={articles}
          columns={columns}
          pagination={{
            defaultPageSize: 4,
            size: "small",
          }}
          loading={loading}
        />
      </Col>
    </AdminLayout>
  );
};

export default ArticlesTable;

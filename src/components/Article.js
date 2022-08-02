import { Col, message } from "antd";
import React, { useEffect, useState } from "react";
import { aboutExpireFormat } from "../utils";
import AdminLayout from "./AdminLayout";
import PostForm from "./PostForm";

const Article = ({ id }) => {
  const [article, setArticle] = useState("");
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setArticle(data.data);
          isLoading(false);
        } else {
          message.info(data.data.message);
          isLoading(false);
        }
      });
  }, [id]);

  return (
    <AdminLayout>
      {loading ? (
        <Col span={16} className="loading">
          <p>Loading...</p>
        </Col>
      ) : (
        <Col md={16} xs={24}>
          <PostForm article={article} postId={article._id} />
        </Col>
      )}
      <Col md={4} xs={0} sm={0} className="adminRigth">
        <div className="accountDetails">
          <div>
            <h3>
              <i class="fa fa-book"></i>Article Details
            </h3>
            <div>
              <p>Title :</p>
              <p>{article.title}</p>
            </div>
            <div>
              <p>Date Created :</p>
              <p>{aboutExpireFormat(article.dateCreated)}</p>
            </div>
            <div>
              <p>Status :</p>
              <p>{article.status}</p>
            </div>
          </div>
        </div>
      </Col>
    </AdminLayout>
  );
};

export default Article;

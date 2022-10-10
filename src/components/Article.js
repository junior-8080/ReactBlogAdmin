import React, { useEffect, useState } from "react";
import { Col, message, Button } from "antd";
import { aboutExpireFormat } from "../utils";
import AdminLayout from "./AdminLayout";
import PostForm from "./PostForm";

const Article = ({ id }) => {
  const [article, setArticle] = useState("");
  const [loading, isLoading] = useState(false);
  const [bodyHTML, setBody] = useState("");

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

  const handleSave = () => {
    const data = {
      id: id,
      body: bodyHTML,
    };
    const profile = JSON.parse(localStorage.getItem("profile"));
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": profile.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          message.success("Articles Save");
        }
      });
  };

  const handleBody = (currentHTML) => {
    setBody(currentHTML);
  };

  return (
    <AdminLayout>
      {loading ? (
        <Col span={16} className="loading">
          <p>Loading...</p>
        </Col>
      ) : (
        <Col md={16} xs={24}>
          <PostForm
            article={article}
            postId={article._id}
            handleBody={handleBody}
          />
        </Col>
      )}
      <Col md={4} xs={0} sm={0} className="adminRigth">
        <div className="accountDetails">
          <div>
            <p>
              <i class="fa fa-book"></i>&nbsp;<span>Article Details</span>
            </p>
            <div>
              <p style={{ wordWrap: "break-word" }}>Title : {article.title}</p>
              <p></p>
            </div>
            <div>
              <p>Date Created: {aboutExpireFormat(article.dateCreated)}</p>
            </div>
          </div>
        </div>
        <div className="save">
          <Button onClick={handleSave} className="save-btn">
            Save Changes
          </Button>
        </div>
      </Col>
    </AdminLayout>
  );
};

export default Article;

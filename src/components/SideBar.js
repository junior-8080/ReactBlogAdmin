import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import { ProfileOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const SideBar = ({ handleVisibility }) => {

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("profile");
    // window.location = "/";
    history.push('/')
  };

  const btnStyle = {
    width: "90%",
    backgroundColor: "#a4508b",
    marginTop: "1em",
    color: "#fff",
    border: "none",
  };
  const style = {
    textAlign: "center",
    marginTop: "60vh",
  };

  return (
    <div className="sideBar">
      <Menu
        mode="inline"
        theme="dark"
        style={{
          height: "100vh",
          backgroundColor: "#a4508b",
          backgroundImage: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
          color: "#000",
        }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item className="newPost" key="1">
          <Link to="/articles">
            <FolderOpenOutlined /> Articles
          </Link>
        </Menu.Item>
        <Menu.Item className="newPost" key="2" disabled={true}>
          <Link to="/articles">
            <ProfileOutlined /> Images
          </Link>
        </Menu.Item>
        <div style={style}>
          <Button onClick={handleVisibility} style={btnStyle}>
            Create Article
          </Button>
          <Button className="newPost" onClick={logout} style={btnStyle}>
            logout
          </Button>
        </div>
      </Menu>
    </div>
  );
};

export default SideBar;

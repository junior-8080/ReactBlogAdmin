import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import { FolderOpenOutlined,UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const SideBar = ({ handleVisibility }) => {

  const [userName, setUserName] = useState("");
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("profile");
    history.push('/')
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setUserName((profile.user||{}).name);
  },[])
  const btnStyle = {
    width: "90%",
    backgroundColor: "#692856",
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
          color: "#000",
        }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item className="newPost" key="1">
          <Link to="/articles">
            <FolderOpenOutlined /> Articles
          </Link>
        </Menu.Item>
        <Menu.Item className="newPost" key="2" disabled>
          <p >
            <UserOutlined /> {userName}
          </p>
        </Menu.Item>
        <div style={style}>
          <Button onClick={() => handleVisibility()} style={btnStyle}>
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

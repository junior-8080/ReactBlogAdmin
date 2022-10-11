import React,{useEffect,useState} from "react";
import { FolderOpenOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function Menusm() {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("blog_admin_profile");
    history.push("/");
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("blog_admin_profile"));
    setUserName(profile.name);
  }, []);

  const menu = (
    <Menu
      className="menus"
      items={[
        {
          key: 1,
          label: (
            <Link to="/articles">
              <FolderOpenOutlined /> Articles
            </Link>
          ),
        },
        {
          key: 2,
          label: (
            <Link to="/profile" >
              <UserOutlined /> {userName}
            </Link>
          ),
        },
        {
          key: 3,
          label: (
            <p onClick={logout} style={{ border: "none" }}>
              logout
            </p>
          ),
        },
      ]}
    />
  );
  return (
    <div className="menu-sm">
      <Dropdown overlay={menu}>
        <Button>Menu</Button>
      </Dropdown>
    </div>
  );
}

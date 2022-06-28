import React from "react";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { useHistory } from "react-router-dom";


export default function Menusm() {


  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("profile");
    history.push('/')
  };

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
            <Button  onClick={logout} style={{border:"none"}}>
              logout
            </Button>
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

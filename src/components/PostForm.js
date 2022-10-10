import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Button, message, } from "antd";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Menusm from "./Menusm";


const PostForm = ({ postId, article,handleBody }) => {
  const blocksFromHTML = convertFromHTML(article.body || "<p>Loading....</p>");
  const [currentHTML, setConvertedContent] = useState("");
  const create = article.body
    ? EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      )
    : EditorState.createEmpty("");

  const [editState, setEditState] = useState(() => create);

  const handleChange = (editState) => {
    setEditState(editState);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    handleBody(currentHTML);
  };

  const handleSave = () => {
    const  data = {
      id: postId,
      body: currentHTML,
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

  return (
    <div className="editor-root-container">
      <div className="navs-sm">
        <Menusm />
        <div className="save-sm">
          <Button onClick={handleSave} className="save-btn">
             Save
          </Button>
        </div>
      </div>

      <Editor
        editorState={editState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={handleChange}
        placeholder="The message goes here..."
      />
    </div>
  );
};

export default PostForm;

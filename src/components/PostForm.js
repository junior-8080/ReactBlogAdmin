import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Button, message } from "antd";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const PostForm = ({ postId, article }) => {
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
  };

  const handleSave = () => {
    const data = {
      id: postId,
      body: currentHTML,
    };
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200 && result.message === "SUCCESS") {
          message.success("Articles Save");
        }
      });
  };

  return (
    <>
      <Editor
        editorState={editState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={handleChange}
        placeholder="The message goes here..."
      />
      <div className="save">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </>
  );
};

export default PostForm;

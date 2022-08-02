import React, { useState } from "react";
import { Input, Modal, Steps, Button, message } from "antd";
import { useHistory } from "react-router-dom";

const { Step } = Steps;

const StepModal = ({ isModalVisible, handleVisibility }) => {
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);
  const [titleError,setTitleError] = useState(false);
  const [summaryError,setSummaryError] = useState(false);
  const history = useHistory();

  const handleName = (event) => {
    setName(event.target.value);
    if(name.length >  70  || name.length < 0 ){
      setTitleError(true)
    }else {
      setTitleError(false)
    }
  };

  const handleSummary = (event) => {
    setSummary(event.target.value);
    if(summary.length < 0 || summary.length > 100){
      setSummaryError(true);
    }else {
      setSummaryError(false)
    }
  };

  const onFinished = () => {
    const body = {
      title: name,
      description: summary,
    };
    const profile = JSON.stringify(localStorage.getItem("profile"))
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": profile.token
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200 && result.message === "SUCCESS") {
          setSummary("");
          setName("");
          handleVisibility();
          message.success("Article Created");
          // window.location = `/articles/${result.data.postId}`;
          history.push(`/articles/${result.data.postId}`)
        }
      })
      .catch((err) => console.log(err));
  };

  const steps = [
    {
      title: "Article Title",
      content: <Input value={name} onChange={handleName} />,
    },
    {
      title: "Article Introduction",
      content: <Input.TextArea value={summary} onChange={handleSummary} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleVisibility}
      footer={[
        <Button
          key="back"
          onClick={prev}
          disabled={current < 0 || current !== steps.length - 1 }
          size="small"
        >
          previous
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={next}
          disabled={(current === steps.length - 1 && steps.length - 1) || titleError || summaryError}
          size="small"
        >
          next
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={
            current !== steps.length - 1 ||
            name.length < 5 ||
            summary.length < 5
          }
          size="small"
          onClick={onFinished}
        >
          finished
        </Button>,
      ]}
      closable={false}
    >
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="stepsContent">{steps[current].content}</div>
      {titleError ? <p className="helper">Title should be less between 5-70.</p>: ''}
      {summaryError ? <p>Summary text should between 5-100</p>:''}
    </Modal>
  );
};

export default StepModal;

import React, { useState } from "react";
import { Input, Modal, Steps, Button, message } from "antd";

const { Step } = Steps;

const StepModal = ({ isModalVisible, handleVisibility }) => {
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleSummary = (event) => {
    setSummary(event.target.value);
  };

  const onFinished = () => {
    const body = {
      title: name,
      description: summary,
    };
    fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          window.location = `/articles/${result.data.postId}`;
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
          disabled={current < 0 || current !== steps.length - 1}
          size="small"
        >
          previous
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={next}
          disabled={current === steps.length - 1 && steps.length - 1}
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
      <p className="helper">Should be greater than 5 characters</p>
      <div className="stepsContent">{steps[current].content}</div>
    </Modal>
  );
};

export default StepModal;

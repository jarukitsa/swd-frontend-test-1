import { Button, Card, Col, Divider, Row, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LayoutView = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState([
    { shape: "square" },
    { shape: "circle" },
    { shape: "ellipse" },
    { shape: "trapezoid" },
    { shape: "parallelogram" },
    { shape: "rectangle" },
  ]);
  const [flagLayout, setFlagLayout] = useState(true);
  const goPrev = () => {
    const firstItem = shapes[0];
    const updatedShapes = [...shapes.slice(1), firstItem];
    setShapes(updatedShapes);
  };

  const goNext = () => {
    const lastItem = shapes[shapes.length - 1];
    const updatedShapes = [lastItem, ...shapes.slice(0, shapes.length - 1)];
    setShapes(updatedShapes);
  };

  const shuffleArray = () => {
    const shuffledArray = [...shapes];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setShapes(shuffledArray);
  };

  const movePosition = () => {
    const firstHalf = shapes.slice(0, 3);
    const secondHalf = shapes.slice(3);
    setShapes([...secondHalf, ...firstHalf]);
    setFlagLayout(!flagLayout);
  };

  const TopSection = () => {
    return (
      <div className="container">
        <Button className="btn" onClick={() => goPrev()}>
          <div className="arrow arrow-prev" />
          <Tag color="#71cf81">{t("layoutAndStyle.moveShape")}</Tag>
        </Button>
        <Button className="btn-expand" onClick={() => movePosition()}>
          <div className="arrow arrow-up" />
          <div className="arrow arrow-down" />
          <Tag color="#71cf81">{t("layoutAndStyle.movePosition")}</Tag>
        </Button>
        <Button className="btn" onClick={() => goNext()}>
          <div className="arrow arrow-next" />
          <Tag color="#71cf81">{t("layoutAndStyle.moveShape")}</Tag>
        </Button>
      </div>
    );
  };

  const FirstRowOutput = () => {
    const startIndex = flagLayout ? 0 : 3;
    return (
      <>
        <Col span={6}></Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex + 1].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex + 2].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
      </>
    );
  };
  const SecondRowOutput = () => {
    const startIndex = flagLayout ? 3 : 0;
    return (
      <>
        <Col span={3}></Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex + 1].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
        <Col span={6}>
          <Button className="btn-shape" onClick={() => shuffleArray()}>
            <div
              className={`shape ${shapes[startIndex + 2].shape}`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
              }}
            />
          </Button>
        </Col>
        <Col span={3}></Col>
      </>
    );
  };

  const OutputSection = () => {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 930,
        }}
      >
        <Row gutter={16}>
          {flagLayout ? <FirstRowOutput /> : <SecondRowOutput />}
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }}>
          {!flagLayout ? <FirstRowOutput /> : <SecondRowOutput />}
        </Row>
      </div>
    );
  };

  return (
    <div className="layout-screen-layout">
      <TopSection />
      <Divider></Divider>
      <OutputSection />
    </div>
  );
};

export default LayoutView;

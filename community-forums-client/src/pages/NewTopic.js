import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTopic, resetNewTopic, getSpaces } from "../redux/slices/topicSlice";

const NewTopic = () => {
  const dispatch = useDispatch();
  const { message, isLoading, isSuccess, isError, newTopicURL } = useSelector(
    (state) => state.topic.addTopic
  );
  const { spaces } = useSelector((state) => state.topic);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    document.title = `Add New Topic | Community forum`;
    dispatch(resetNewTopic());
    dispatch(getSpaces());
  }, [dispatch]);

  const options = spaces?.map((space) => ({
    value: space.name,
    label: space.name,
  })) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !selectedSpace || selectedTags.length === 0) return;
    try {
      await dispatch(
        addTopic({
          title,
          content,
          selectedSpace,
          selectedTags: selectedTags.map((tag) => tag.value),
        })
      ).unwrap();
    } catch (err) {
      console.error(err.message || err);
    }
  };

  return (
    <main>
      <Container>
        <Row className="new-topic align-items-center justify-content-center">
          <Col lg={8}>
            <section className="new-topic-form">
              {isLoading && <div className="loader"></div>}
              <h5 className="section-title">Add New Topic</h5>
              {message && (
                <div
                  className={`message ${isError ? "error" : ""} ${
                    isSuccess ? "success" : ""
                  } ${isLoading ? "info" : ""}`}
                >
                  {`${message} `}
                  {newTopicURL && <Link to={newTopicURL}>Click here to preview it.</Link>}
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group mb-3" controlId="topicTitle">
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    disabled={isLoading}
                    placeholder="Enter topic title..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Label>Topic Title</Form.Label>
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="topicContent">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={content}
                    disabled={isLoading}
                    placeholder="Enter topic content..."
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Form.Label>Topic Content</Form.Label>
                </Form.Group>
                <Form.Group className="form-group mb-3">
                  <Select
                    classNamePrefix="form-control"
                    placeholder="Choose Topic Space..."
                    options={options}
                    isDisabled={isLoading}
                    value={options.find((obj) => obj.value === selectedSpace) || null}
                    onChange={(e) => setSelectedSpace(e.value)}
                  />
                  <Form.Label>Topic Space</Form.Label>
                </Form.Group>
                <Form.Group className="form-group mb-3">
                  <CreatableSelect
                    isMulti
                    placeholder="Enter Topic Tags..."
                    isDisabled={isLoading}
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e)}
                  />
                  <Form.Label>Topic Tags</Form.Label>
                </Form.Group>
                <Button type="submit" className="mb-4 w-100" disabled={isLoading}>
                  {isLoading ? "Adding Topic..." : "Add Topic"}
                </Button>
              </Form>
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewTopic;

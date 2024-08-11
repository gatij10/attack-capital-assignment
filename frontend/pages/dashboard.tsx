import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import { BASE_URL } from "../constants";
import { PostType } from "../types";
import { getToken } from "../utils/auth";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input, textarea {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #1a8917;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #159413;
    }
  }
`;

const Post = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;

  h3 {
    margin-top: 0;
  }

  p {
    color: #666;
  }
`;

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts`, config);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/post`,
        { title, content },
        config
      );
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Dashboard</h1>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title of your article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content of your article"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post Article</button>
        </Form>
        {posts.map((post, index) => (
          <Post key={index}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </Post>
        ))}
      </Container>
    </Layout>
  );
};

export default withAuth(Dashboard);

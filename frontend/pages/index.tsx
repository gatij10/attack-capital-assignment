import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "../components/Layout";
import styled from "styled-components";
import { BASE_URL } from "../constants";
import { PostType } from "../types";
import { formatTimestamp } from "../utils/util";
import AuthorSelect from "../components/AuthorFilter";
import { useEffect, useState } from "react";

const PostContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0 0 10px;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }

`;

type Props = {
  posts: PostType[];
};

const Home: React.FC<Props> = ({ posts }) => {
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  useEffect(() => {
    setAllPosts(posts);
  }, []);

  const onAuthorChange = async (authorId: string) => {
    if (authorId) {
      const res = await axios.get(
        `${BASE_URL}/api/author-posts?authorId=${authorId}`
      );
      const posts = res.data;
      setAllPosts(posts);
    } else {
      const res = await axios.get(`${BASE_URL}/api/all-posts`);
      const posts = res.data;
      setAllPosts(posts);
    }
  };

  return (
    <Layout>
      <AuthorSelect onAuthorChange={onAuthorChange} />
      {allPosts?.length ? (
        <>
          {allPosts?.map((post) => (
            <PostContainer key={post.id}>
              <h1>{post.title}</h1>
              <h2>{post.authorName}</h2>
              <p>{formatTimestamp(post?.createdAt)}</p>
              <br></br>
              <p>{post.content}</p>
            </PostContainer>
          ))}
        </>
      ) : (
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Posts Available.
        </label>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${BASE_URL}/api/all-posts`);
  const posts = res.data;
  return { props: { posts } };
};

export default Home;

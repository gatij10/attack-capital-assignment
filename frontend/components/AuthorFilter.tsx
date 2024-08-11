// components/AuthorSelect.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BASE_URL } from "../constants";
import { UserType } from "../types";

const Select = styled.select`
  padding: 8px;
  margin-bottom: 20px;
  width: 200px;
`;

const AuthorSelect = ({ onAuthorChange }: any) => {
  const [authors, setAuthors] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const result = await axios.get(`${BASE_URL}/api/users`);
      setAuthors(result.data);
    };

    fetchAuthors();
  }, []);

  return (
    <Select
      onChange={(e) => {
        onAuthorChange(e.target.value);
      }}
    >
      <option value="">Select an author</option>
      {authors?.map((author) => (
        <option key={author._id} value={author._id}>
          {author.username}
        </option>
      ))}
    </Select>
  );
};

export default AuthorSelect;

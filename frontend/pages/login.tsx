import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { setToken } from '../utils/auth';
import { BASE_URL } from '../constants';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 50px auto;

  input, button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #1a8917;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #159413;
    }
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/login`, { email, password });
      setToken(data.token); 
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Email</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </Form>
    </Layout>
  );
};

export default Login;

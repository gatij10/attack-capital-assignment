import Link from 'next/link';
import styled from 'styled-components';
import { isLoggedIn, removeToken } from '../utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Nav = styled.nav`
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NavBar: React.FC = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    router.push('/login');
  };

  return (
    <Nav>
      <Link href="/">Home</Link>
      {loggedIn ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={handleLogout} style={{ margin: '0 10px', cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginLeft: '10px' }}>Login</Link>
          <Link href="/signup" style={{ marginLeft: '10px' }}>Signup</Link>
        </>
      )}
    </Nav>
  );
};

export default NavBar;

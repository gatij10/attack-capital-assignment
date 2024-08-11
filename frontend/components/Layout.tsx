import styled from 'styled-components';
import NavBar from './NavBar';
import GlobalStyles from '../styles/GlobalStyles';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
`;

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <>
    <GlobalStyles />
    <NavBar />
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;

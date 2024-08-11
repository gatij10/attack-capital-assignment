import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif; 
    color: #333; 
    background: #fff; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: #1a8917;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-size: 32px;
  }
`;

export default GlobalStyles;

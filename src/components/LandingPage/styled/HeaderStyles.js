import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const HeaderBrand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    font-family: 'Unbounded', sans-serif;
  }
`;

export const Tagline = styled.span`
  font-size: 0.9rem;
  color: #bdc3c7;
  margin-left: 0.5rem;
  font-weight: 300;
  font-family: 'Unbounded', sans-serif;
`;

export const HeaderNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: 500;

    &:hover {
      color: #3498db;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const HeaderContainer = styled.header`
  background: ${colors.black};
  color: ${colors.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${colors.shadows.primary};
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
  color: ${colors.white};
  opacity: 0.9;
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
    color: ${colors.white};
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      color: ${colors.secondary};
      transform: translateY(-2px);
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadows.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${colors.shadows.lg};
  }
`;

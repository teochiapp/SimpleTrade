import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const DashboardHeaderStyled = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const DashboardBrand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    font-family: 'Unbounded', sans-serif;
  }
`;

export const DashboardNav = styled.nav`
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

export const DashboardActions = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

export const DashboardContentStyled = styled.main`
  padding: 2rem;
`;

export const DashboardContainerStyled = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    color: #2c3e50;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Unbounded', sans-serif;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: #7f8c8d;
    font-size: 1.2rem;
    font-weight: 300;
    font-family: 'Unbounded', sans-serif;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
`;

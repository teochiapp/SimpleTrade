import styled from 'styled-components';

export const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Unbounded', sans-serif;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    font-family: 'Unbounded', sans-serif;
    color: #7f8c8d;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
`;

export const BenefitsSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const BenefitCard = styled.div`
  text-align: center;
  padding: 2rem;

  .benefit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

export const StatItem = styled.div`
  padding: 2rem;

  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: #3498db;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;

export const CtaSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  text-align: center;
`;

export const CtaContent = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Unbounded', sans-serif;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    font-family: 'Unbounded', sans-serif;
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CtaButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background-color: white;
      color: #2c3e50;
    }
  }
`;

export const CtaFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CtaFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .check-icon {
    color: #27ae60;
    font-weight: bold;
  }
`;

export const Footer = styled.footer`
  background-color: #34495e;
  color: white;
  text-align: center;
  padding: 2rem;

  p {
    margin: 0;
  }
`;

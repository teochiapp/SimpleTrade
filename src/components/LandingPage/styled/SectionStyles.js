import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: ${colors.white};
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
    color: ${colors.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    font-family: 'Unbounded', sans-serif;
    color: ${colors.gray[600]};
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
  background: ${colors.gray[50]};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${colors.shadows.base};
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${colors.gray[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadows.lg};
    border-color: ${colors.primary};
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      width: 48px;
      height: 48px;
      color: ${colors.primary};
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
    color: ${colors.black};
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.gray[600]};
    line-height: 1.6;
  }
`;

export const BenefitsSection = styled.section`
  padding: 5rem 2rem;
  background: ${colors.gray[50]};
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
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: ${colors.shadows.base};
  transition: all 0.3s ease;
  border: 1px solid ${colors.gray[200]};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadows.md};
  }

  .benefit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      width: 48px;
      height: 48px;
      color: ${colors.secondary};
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
    color: ${colors.black};
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.gray[600]};
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
    background: ${colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: ${colors.gray[600]};
    font-size: 1.1rem;
  }
`;

export const CtaSection = styled.section`
  padding: 5rem 2rem;
  background: ${colors.gradients.secondary};
  color: ${colors.white};
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
    background: ${colors.gradients.primary};
    color: ${colors.white};
    box-shadow: ${colors.shadows.primary};

    &:hover {
      background: ${colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${colors.shadows.lg};
    }
  }

  .btn-secondary {
    background-color: transparent;
    color: ${colors.white};
    border: 2px solid ${colors.white};

    &:hover {
      background-color: ${colors.white};
      color: ${colors.secondary};
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
    color: ${colors.trading.profit};
    font-weight: bold;
    display: flex;
    align-items: center;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Footer = styled.footer`
  background: ${colors.black};
  color: ${colors.white};
  text-align: center;
  padding: 2rem;

  p {
    margin: 0;
    opacity: 0.9;
  }
`;

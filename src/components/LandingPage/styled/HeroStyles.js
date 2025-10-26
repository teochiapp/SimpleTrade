import styled from 'styled-components';

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
`;

export const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    font-family: 'Unbounded', sans-serif;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(45deg, #fff, #e8f4fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 300;
    font-family: 'Unbounded', sans-serif;
    margin: 0 0 1.5rem 0;
    opacity: 0.9;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

export const HeroFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
`;

export const FeatureIcon = styled.span`
  font-size: 1.5rem;
`;

export const HeroImage = styled.div`
  display: flex;
  justify-content: center;
`;

export const MockupContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MockupScreen = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
`;

export const MockupHeader = styled.div`
  background: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
`;

export const MockupContent = styled.div`
  padding: 1.5rem;
`;

export const MockupTrade = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const TradeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TradeSymbol = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

export const TradeResult = styled.span`
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${props => props.positive ? '#d4edda' : '#f8d7da'};
  color: ${props => props.positive ? '#155724' : '#721c24'};
`;

export const TradeDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #6c757d;
`;

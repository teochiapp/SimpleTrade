import styled, { keyframes } from 'styled-components';
import { colors } from '../../../styles/colors';

// Define keyframes outside components
const gentleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(-1deg);
  }
  75% {
    transform: translateY(-15px) rotate(0.5deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const HeroSection = styled.section`
  background: ${colors.gradients.primary};
  color: ${colors.white};
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, ${colors.primaryDark}40 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${colors.secondary}30 0%, transparent 50%);
    pointer-events: none;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${colors.white}20;
  border-radius: 12px;
  color: ${colors.white};
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
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: ${colors.shadows.xl};
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${colors.gray[200]};
`;

export const MockupHeader = styled.div`
  background: ${colors.gradients.secondary};
  color: ${colors.white};
  padding: 1rem;
  text-align: center;
  font-weight: 600;
`;

export const MockupContent = styled.div`
  padding: 1.5rem;
`;

export const MockupTrade = styled.div`
  background: ${colors.gray[50]};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.gray[200]};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: ${colors.shadows.md};
  }
`;

export const TradeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TradeSymbol = styled.span`
  font-weight: 600;
  color: ${colors.black};
  font-size: 1.1rem;
`;

export const TradeResult = styled.span`
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  background: ${props => props.$positive ? colors.trading.profit : colors.trading.loss};
  color: ${colors.white};
  font-size: 1rem;
`;

export const TradeDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${colors.gray[600]};
`;

// Trading company logos and floating elements

export const FloatingIcon = styled.div`
  position: absolute;
  animation-name: ${float};
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  &.icon-1 {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
  }

  &.icon-2 {
    top: 25%;
    right: 15%;
    animation-delay: 1s;
  }

  &.icon-3 {
    bottom: 30%;
    left: 15%;
    animation-delay: 2s;
  }

  svg {
    width: 40px;
    height: 40px;
    color: ${colors.white};
    opacity: 0.3;
  }
`;

export const FloatingLogo = styled.div`
  position: absolute;
  animation-name: ${gentleFloat};
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  opacity: 0.15;
  z-index: 0;

  &.logo-1 {
    top: 15%;
    right: 10%;
    animation-delay: 0s;
  }

  &.logo-2 {
    top: 40%;
    left: 3%;
    animation-delay: 2s;
  }

  &.logo-3 {
    bottom: 30%;
    right: 15%;
    animation-delay: 1s;
  }

  &.logo-4 {
    top: 75%;
    right: 5%;
    animation-delay: 3s;
  }

  &.logo-5 {
    top: 55%;
    left: 5%;
    animation-delay: 4s;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  svg {
    width: 28px;
    height: 28px;
    color: ${colors.white};
    opacity: 0.7;
  }
`;

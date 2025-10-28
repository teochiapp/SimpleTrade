import React from 'react';
import { motion } from 'framer-motion';
import {
  HeroSection as HeroSectionStyled,
  HeroContent,
  HeroText,
  HeroDescription,
  HeroFeatures,
  FeatureItem,
  FeatureIcon,
  HeroImage,
  MockupContainer,
  MockupScreen,
  MockupHeader,
  MockupContent,
  MockupTrade,
  TradeInfo,
  TradeSymbol,
  TradeResult,
  TradeDetails
} from '../styled/HeroStyles';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeroSectionStyled id="inicio">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroContent>
          <motion.div variants={itemVariants}>
            <HeroText>
              <h1>SimpliTrade</h1>
              <h2>Tu Diario de Trading Personal</h2>
              <HeroDescription>
                Registra tus trades, analiza tus resultados y mejora tu estrategia de trading 
                con nuestro diario digital intuitivo y fácil de usar.
              </HeroDescription>
              <HeroFeatures>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <FeatureIcon>📊</FeatureIcon>
                    <span>Seguimiento de Trades</span>
                  </FeatureItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <FeatureIcon>📝</FeatureIcon>
                    <span>Anotaciones Detalladas</span>
                  </FeatureItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <FeatureIcon>📈</FeatureIcon>
                    <span>Análisis de Resultados</span>
                  </FeatureItem>
                </motion.div>
              </HeroFeatures>
            </HeroText>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <HeroImage>
              <MockupContainer>
                <MockupScreen>
                  <MockupHeader>SimpliTrade Dashboard</MockupHeader>
                  <MockupContent>
                    <MockupTrade>
                      <TradeInfo>
                        <TradeSymbol>EUR/USD</TradeSymbol>
                        <TradeResult positive>+$150</TradeResult>
                      </TradeInfo>
                      <TradeDetails>
                        <span>Entrada: 1.0850</span>
                        <span>Salida: 1.0900</span>
                      </TradeDetails>
                    </MockupTrade>
                    <MockupTrade>
                      <TradeInfo>
                        <TradeSymbol>GBP/USD</TradeSymbol>
                        <TradeResult>-$75</TradeResult>
                      </TradeInfo>
                      <TradeDetails>
                        <span>Entrada: 1.2650</span>
                        <span>Salida: 1.2600</span>
                      </TradeDetails>
                    </MockupTrade>
                  </MockupContent>
                </MockupScreen>
              </MockupContainer>
            </HeroImage>
          </motion.div>
        </HeroContent>
      </motion.div>
    </HeroSectionStyled>
  );
};

export default HeroSection;

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, BarChart3, TrendingDown, Coins, Zap, Globe, Cpu, Smartphone } from 'lucide-react';
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
  TradeDetails,
  FloatingIcon,
  FloatingLogo
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
                    <FeatureIcon><TrendingUp size={28} /></FeatureIcon>
                    <span>Seguimiento de Trades</span>
                  </FeatureItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <FeatureIcon><BookOpen size={28} /></FeatureIcon>
                    <span>Anotaciones Detalladas</span>
                  </FeatureItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <FeatureIcon><BarChart3 size={28} /></FeatureIcon>
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
                        <TradeResult $positive>+$150</TradeResult>
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
        
        {/* Floating trading icons */}
        <FloatingIcon className="icon-1">
          <TrendingUp />
        </FloatingIcon>
        <FloatingIcon className="icon-2">
          <BarChart3 />
        </FloatingIcon>
        <FloatingIcon className="icon-3">
          <Coins />
        </FloatingIcon>
        
        {/* Floating trading company logos scattered around */}
        <FloatingLogo className="logo-1">
          <Zap size={28} />
        </FloatingLogo>
        <FloatingLogo className="logo-2">
          <Globe size={28} />
        </FloatingLogo>
        <FloatingLogo className="logo-3">
          <Coins size={28} />
        </FloatingLogo>
        <FloatingLogo className="logo-4">
          <Smartphone size={28} />
        </FloatingLogo>
        <FloatingLogo className="logo-5">
          <Cpu size={28} />
        </FloatingLogo>
      </motion.div>
    </HeroSectionStyled>
  );
};

export default HeroSection;

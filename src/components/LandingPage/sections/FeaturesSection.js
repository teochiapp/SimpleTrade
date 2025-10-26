import React from 'react';
import { motion } from 'framer-motion';
import {
  FeaturesSection as FeaturesSectionStyled,
  Container,
  SectionHeader,
  FeaturesGrid,
  FeatureCard
} from '../styled/SectionStyles';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📝',
      title: 'Registro de Trades',
      description: 'Documenta cada trade con entrada, salida, objetivo y stop loss de manera organizada.'
    },
    {
      icon: '💭',
      title: 'Anotaciones Personales',
      description: 'Añade observaciones, emociones y lecciones aprendidas en cada operación.'
    },
    {
      icon: '📊',
      title: 'Seguimiento de Métricas',
      description: 'Monitorea tu win rate, profit factor y otras estadísticas importantes.'
    },
    {
      icon: '📈',
      title: 'Análisis de Resultados',
      description: 'Visualiza tu progreso y identifica patrones en tu trading.'
    },
    {
      icon: '🎯',
      title: 'Gestión de Objetivos',
      description: 'Establece y sigue tus objetivos de trading con herramientas de seguimiento.'
    },
    {
      icon: '🔒',
      title: 'Datos Seguros',
      description: 'Tus datos están protegidos y respaldados de forma segura en la nube.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <FeaturesSectionStyled id="caracteristicas">
      <Container>
        <SectionHeader>
          <h2>Características Principales</h2>
          <p>Todo lo que necesitas para llevar un diario de trading profesional</p>
        </SectionHeader>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FeaturesGrid>
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <FeatureCard>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Container>
    </FeaturesSectionStyled>
  );
};

export default FeaturesSection;

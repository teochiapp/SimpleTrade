import React from 'react';
import {
  BenefitsSection as BenefitsSectionStyled,
  Container,
  SectionHeader,
  BenefitsGrid,
  BenefitCard,
  StatsContainer,
  StatItem
} from '../styled/SectionStyles';

const BenefitsSection = () => {
  const benefits = [
    {
      title: 'Mejora tu Trading',
      description: 'Identifica patrones y errores para mejorar tu estrategia de trading.',
      icon: '🚀'
    },
    {
      title: 'Control Emocional',
      description: 'Registra tus emociones para desarrollar mejor disciplina en el trading.',
      icon: '🧠'
    },
    {
      title: 'Análisis Profundo',
      description: 'Analiza tus resultados con métricas detalladas y gráficos informativos.',
      icon: '📊'
    },
    {
      title: 'Fácil de Usar',
      description: 'Interfaz intuitiva que te permite registrar trades en segundos.',
      icon: '⚡'
    }
  ];

  return (
    <BenefitsSectionStyled id="beneficios">
      <Container>
        <SectionHeader>
          <h2>¿Por qué elegir SimpliTrade?</h2>
          <p>Los beneficios de llevar un diario de trading digital</p>
        </SectionHeader>
        
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitCard>
          ))}
        </BenefitsGrid>
        
        <StatsContainer>
          <StatItem>
            <div className="stat-number">95%</div>
            <div className="stat-label">de traders mejoran con un diario</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">+40%</div>
            <div className="stat-label">mejora promedio en resultados</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">24/7</div>
            <div className="stat-label">acceso desde cualquier dispositivo</div>
          </StatItem>
        </StatsContainer>
      </Container>
    </BenefitsSectionStyled>
  );
};

export default BenefitsSection;

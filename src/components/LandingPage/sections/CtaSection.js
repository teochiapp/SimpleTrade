import React from 'react';
import {
  CtaSection as CtaSectionStyled,
  Container,
  CtaContent,
  CtaButtons,
  CtaFeatures,
  CtaFeature
} from '../styled/SectionStyles';

const CtaSection = () => {
  return (
    <CtaSectionStyled id="contacto">
      <Container>
        <CtaContent>
          <h2>¿Listo para mejorar tu trading?</h2>
          <p>
            Comienza a llevar tu diario de trading hoy mismo y toma el control de tu estrategia.
            Únete a miles de traders que ya están mejorando sus resultados.
          </p>
          
          <CtaButtons>
            <button className="btn-primary" onClick={() => {
              const loginBtn = document.querySelector('.login-btn');
              if (loginBtn) loginBtn.click();
            }}>
              Comenzar Gratis
            </button>
            <button className="btn-secondary">
              Ver Demo
            </button>
          </CtaButtons>
          
          <CtaFeatures>
            <CtaFeature>
              <span className="check-icon">✓</span>
              <span>Registro gratuito</span>
            </CtaFeature>
            <CtaFeature>
              <span className="check-icon">✓</span>
              <span>Sin compromiso</span>
            </CtaFeature>
            <CtaFeature>
              <span className="check-icon">✓</span>
              <span>Acceso inmediato</span>
            </CtaFeature>
          </CtaFeatures>
        </CtaContent>
      </Container>
    </CtaSectionStyled>
  );
};

export default CtaSection;

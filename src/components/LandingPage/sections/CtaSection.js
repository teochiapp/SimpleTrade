import React from 'react';
import { Check } from 'lucide-react';
import {
  CtaSection as CtaSectionStyled,
  Container,
  CtaContent,
  CtaButtons,
  CtaFeatures,
  CtaFeature
} from '../styled/SectionStyles';

const CtaSection = ({ onOpenLoginModal }) => {
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
            <button className="btn-primary" onClick={onOpenLoginModal}>
              Comenzar Gratis
            </button>
            <button className="btn-secondary">
              Ver Demo
            </button>
          </CtaButtons>
          
          <CtaFeatures>
            <CtaFeature>
              <span className="check-icon"><Check /></span>
              <span>Registro gratuito</span>
            </CtaFeature>
            <CtaFeature>
              <span className="check-icon"><Check /></span>
              <span>Sin compromiso</span>
            </CtaFeature>
            <CtaFeature>
              <span className="check-icon"><Check /></span>
              <span>Acceso inmediato</span>
            </CtaFeature>
          </CtaFeatures>
        </CtaContent>
      </Container>
    </CtaSectionStyled>
  );
};

export default CtaSection;

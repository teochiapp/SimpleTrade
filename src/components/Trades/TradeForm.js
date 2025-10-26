import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Search, TrendingUp, DollarSign, Percent, Shield, Target, BookOpen, Lightbulb } from 'lucide-react';
import SymbolSearch from '../common/SymbolSearch';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: #2c3e50;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background: #3498db;
    color: white;

    &:hover {
      background: #2980b9;
    }

    &:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: transparent;
    color: #7f8c8d;
    border: 2px solid #e1e8ed;

    &:hover {
      background: #f8f9fa;
    }
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const SelectedSymbolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  margin-top: 0.5rem;
`;

const SymbolIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SymbolDetails = styled.div`
  flex: 1;
`;

const SymbolTitle = styled.div`
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 0.2rem;
`;

const SymbolSubtitle = styled.div`
  font-family: 'Unbounded', sans-serif;
  font-size: 0.75rem;
  color: #7f8c8d;
`;

const TradeForm = ({ onTradeAdded }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    symbolData: null, // Datos completos del símbolo seleccionado
    type: 'buy',
    entryPrice: '',
    portfolioPercentage: '',
    stopLoss: '',
    takeProfit: '',
    notes: '',
    emotions: '',
    strategy: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar selección de símbolo desde el buscador
  const handleSymbolSelect = (symbolData) => {
    setFormData(prev => ({
      ...prev,
      symbol: symbolData.symbol,
      symbolData: symbolData
    }));
    console.log('✅ Símbolo seleccionado:', symbolData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validar datos requeridos
      if (!formData.symbol || !formData.entryPrice) {
        throw new Error('Por favor completa el símbolo y precio de entrada');
      }

      const tradeData = {
        symbol: formData.symbol,
        type: formData.type,
        entry_price: parseFloat(formData.entryPrice),
        portfolio_percentage: formData.portfolioPercentage ? parseFloat(formData.portfolioPercentage) : null,
        stop_loss: formData.stopLoss ? parseFloat(formData.stopLoss) : null,
        take_profit: formData.takeProfit ? parseFloat(formData.takeProfit) : null,
        strategy: formData.strategy || null,
        emotions: formData.emotions || null,
        notes: formData.notes || null,
        status: 'open'
      };

      // Usar el callback del componente padre
      await onTradeAdded(tradeData);

      setSuccess('Trade registrado exitosamente!');
      
      // Limpiar formulario
      setFormData({
        symbol: '',
        symbolData: null,
        type: 'buy',
        entryPrice: '',
        portfolioPercentage: '',
        stopLoss: '',
        takeProfit: '',
        notes: '',
        emotions: '',
        strategy: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      symbol: '',
      symbolData: null,
      type: 'buy',
      entryPrice: '',
      portfolioPercentage: '',
      stopLoss: '',
      takeProfit: '',
      notes: '',
      emotions: '',
      strategy: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FormContainer>
        <FormTitle>
          <BookOpen size={24} />
          Nuevo Trade
        </FormTitle>
        
        <InfoBox>
          <Lightbulb size={16} style={{marginRight: '0.5rem'}} />
          Usa el buscador inteligente para encontrar instrumentos. Puedes buscar por símbolo (AAPL), nombre (Apple) o sector (Tecnología). El precio de salida se registrará cuando cierres el trade.
        </InfoBox>
        
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>
                <Search size={16} />
                Instrumento *
              </Label>
              <SymbolSearch
                onSymbolSelect={handleSymbolSelect}
                placeholder="Buscar Apple, Tesla, Bitcoin..."
                initialValue={formData.symbol}
              />
              {formData.symbolData && (
                <SelectedSymbolInfo>
                  <SymbolIcon>
                    {formData.symbolData.type === 'Crypto' ? '🪙' : 
                     formData.symbolData.region === 'AR' ? '🇦🇷' :
                     formData.symbolData.region === 'BR' ? '🇧🇷' :
                     formData.symbolData.region === 'CN' ? '🇨🇳' : '🇺🇸'}
                  </SymbolIcon>
                  <SymbolDetails>
                    <SymbolTitle>{formData.symbolData.symbol} - {formData.symbolData.name}</SymbolTitle>
                    <SymbolSubtitle>{formData.symbolData.sector} • {formData.symbolData.region} • {formData.symbolData.currency}</SymbolSubtitle>
                  </SymbolDetails>
                </SelectedSymbolInfo>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="type">
                <TrendingUp size={16} />
                Tipo de Operación
              </Label>
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="buy">Compra (Long)</option>
                <option value="sell">Venta (Short)</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="entryPrice">
                <DollarSign size={16} />
                Precio de Entrada *
              </Label>
              <Input
                type="number"
                id="entryPrice"
                name="entryPrice"
                value={formData.entryPrice}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="portfolioPercentage">
                <Percent size={16} />
                % de Cartera (Opcional)
              </Label>
              <Input
                type="number"
                id="portfolioPercentage"
                name="portfolioPercentage"
                value={formData.portfolioPercentage}
                onChange={handleInputChange}
                placeholder="Ej: 5"
                step="0.1"
                min="0"
                max="100"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stopLoss">
                <Shield size={16} />
                Stop Loss
              </Label>
              <Input
                type="number"
                id="stopLoss"
                name="stopLoss"
                value={formData.stopLoss}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="takeProfit">
                <Target size={16} />
                Take Profit
              </Label>
              <Input
                type="number"
                id="takeProfit"
                name="takeProfit"
                value={formData.takeProfit}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="strategy">
                <Lightbulb size={16} />
                Estrategia
              </Label>
              <Select
                id="strategy"
                name="strategy"
                value={formData.strategy}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar estrategia...</option>
                <option value="day_trading">Day Trading</option>
                <option value="swing_trading">Swing Trading</option>
                <option value="largo_plazo">Largo Plazo</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="emotions">Estado Emocional</Label>
              <Select
                id="emotions"
                name="emotions"
                value={formData.emotions}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar...</option>
                <option value="confident">Confidente</option>
                <option value="nervous">Nervioso</option>
                <option value="greedy">Codicioso</option>
                <option value="fearful">Temeroso</option>
                <option value="calm">Tranquilo</option>
                <option value="frustrated">Frustrado</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label htmlFor="notes">Notas y Observaciones</Label>
            <TextArea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Describe tu análisis, por qué tomaste esta decisión, qué esperas que pase..."
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="secondary" onClick={handleReset}>
              Limpiar
            </Button>
            <Button type="submit" className="primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Trade'}
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </motion.div>
  );
};

export default TradeForm;
// components/Trades/EditTradeModal.js - Modal para editar trades
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Edit2 } from 'lucide-react';
import SymbolSearch from '../common/SymbolSearch';
import { colors } from '../../styles/colors';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
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

  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
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
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
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
    background: ${colors.primary};
    color: white;

    &:hover {
      background: ${colors.primaryDark};
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

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
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

const EditTradeModal = ({ isOpen, onClose, trade, onTradeUpdated }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'buy',
    entry_price: '',
    quantity: '',
    stop_loss: '',
    take_profit: '',
    portfolio_percentage: '',
    strategy: '',
    notes: '',
    exit_price: '',
    result: '',
    status: 'open'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para adaptar estructura de Strapi
  const getTradeAttr = (trade, attr) => {
    if (!trade) return null;
    return trade.attributes ? trade.attributes[attr] : trade[attr];
  };

  // Inicializar formulario con datos del trade
  useEffect(() => {
    if (isOpen && trade) {
      setFormData({
        symbol: getTradeAttr(trade, 'symbol') || '',
        type: getTradeAttr(trade, 'type') || 'buy',
        entry_price: getTradeAttr(trade, 'entry_price') || '',
        quantity: getTradeAttr(trade, 'quantity') || '',
        stop_loss: getTradeAttr(trade, 'stop_loss') || '',
        take_profit: getTradeAttr(trade, 'take_profit') || '',
        portfolio_percentage: getTradeAttr(trade, 'portfolio_percentage') || '',
        strategy: getTradeAttr(trade, 'strategy') || '',
        notes: getTradeAttr(trade, 'notes') || '',
        exit_price: getTradeAttr(trade, 'exit_price') || '',
        result: getTradeAttr(trade, 'result') || '',
        status: getTradeAttr(trade, 'status') || 'open'
      });
      setError('');
      setSuccess('');
    }
  }, [isOpen, trade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSymbolSelect = (symbolData) => {
    setFormData(prev => ({
      ...prev,
      symbol: symbolData.symbol
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.entry_price) {
      setError('El símbolo y precio de entrada son obligatorios');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Preparar datos para actualización
      const updateData = {
        symbol: formData.symbol,
        type: formData.type,
        entry_price: parseFloat(formData.entry_price),
        quantity: formData.quantity ? parseFloat(formData.quantity) : null,
        stop_loss: formData.stop_loss ? parseFloat(formData.stop_loss) : null,
        take_profit: formData.take_profit ? parseFloat(formData.take_profit) : null,
        portfolio_percentage: formData.portfolio_percentage ? parseFloat(formData.portfolio_percentage) : null,
        strategy: formData.strategy || null,
        notes: formData.notes || null,
        status: formData.status
      };

      // Si el trade está cerrado, incluir exit_price y result
      if (formData.status === 'closed') {
        updateData.exit_price = formData.exit_price ? parseFloat(formData.exit_price) : null;
        updateData.result = formData.result ? parseFloat(formData.result) : null;
      }

      await onTradeUpdated(trade.id, updateData);
      setSuccess('Trade actualizado exitosamente');
      
      // Cerrar modal después de 1 segundo
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Error al actualizar trade:', err);
      setError(err.message || 'Error al actualizar el trade. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    onClose();
  };

  if (!trade) return null;

  const isClosed = formData.status === 'closed';

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle>
              <Edit2 size={24} />
              Editar Trade
            </ModalTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="symbol">Símbolo *</Label>
                  <SymbolSearch
                    onSymbolSelect={handleSymbolSelect}
                    initialValue={formData.symbol}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="buy">Compra (Long)</option>
                    <option value="sell">Venta (Short)</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="entry_price">Precio de Entrada *</Label>
                  <Input
                    type="number"
                    id="entry_price"
                    name="entry_price"
                    value={formData.entry_price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.01"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="stop_loss">Stop Loss</Label>
                  <Input
                    type="number"
                    id="stop_loss"
                    name="stop_loss"
                    value={formData.stop_loss}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="take_profit">Take Profit</Label>
                  <Input
                    type="number"
                    id="take_profit"
                    name="take_profit"
                    value={formData.take_profit}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="portfolio_percentage">% Cartera</Label>
                  <Input
                    type="number"
                    id="portfolio_percentage"
                    name="portfolio_percentage"
                    value={formData.portfolio_percentage}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="strategy">Estrategia</Label>
                  <Select
                    id="strategy"
                    name="strategy"
                    value={formData.strategy}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="day_trading">Day Trading</option>
                    <option value="swing_trading">Swing Trading</option>
                    <option value="largo_plazo">Largo Plazo</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="open">Abierto</option>
                    <option value="closed">Cerrado</option>
                  </Select>
                </FormGroup>

                {isClosed && (
                  <>
                    <FormGroup>
                      <Label htmlFor="exit_price">Precio de Salida</Label>
                      <Input
                        type="number"
                        id="exit_price"
                        name="exit_price"
                        value={formData.exit_price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="result">Resultado (%)</Label>
                      <Input
                        type="number"
                        id="result"
                        name="result"
                        value={formData.result}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </FormGroup>
                  </>
                )}
              </FormGrid>

              <FormGroup>
                <Label htmlFor="notes">Notas</Label>
                <TextArea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Observaciones sobre el trade..."
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" className="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="primary" disabled={loading || !!success}>
                  {loading ? 'Guardando...' : success ? 'Guardado ✓' : 'Guardar Cambios'}
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default EditTradeModal;

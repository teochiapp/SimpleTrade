// components/common/SymbolSearch.js - Componente de búsqueda inteligente de símbolos
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import symbolSearchService from '../../services/symbolSearchService';
import priceService from '../../services/priceService';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  transition: border-color 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #bdc3c7;
  }

  ${props => props.$isOpen && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: transparent;
  `}
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e1e8ed;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`;

const LoadingState = styled.div`
  padding: 1rem;
  text-align: center;
  color: #7f8c8d;
  font-family: 'Unbounded', sans-serif;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  padding: 1rem;
  text-align: center;
  color: #7f8c8d;
  font-family: 'Unbounded', sans-serif;
  font-size: 0.9rem;
`;

const CustomSymbolOption = styled(motion.div)`
  padding: 1rem;
  cursor: pointer;
  background: #e3f2fd;
  border: 2px dashed #3498db;
  margin: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #bbdefb;
    border-color: #2980b9;
  }
`;

const CustomSymbolText = styled.div`
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const CustomSymbolHint = styled.div`
  font-family: 'Unbounded', sans-serif;
  font-size: 0.75rem;
  color: #7f8c8d;
`;

const PopularSection = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
`;

const SectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #7f8c8d;
  font-family: 'Unbounded', sans-serif;
  text-transform: uppercase;
  background: #f8f9fa;
`;

const SymbolOption = styled(motion.div)`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f1f3f4;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }

  ${props => props.$selected && `
    background-color: #e3f2fd;
  `}
`;

const SymbolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const SymbolCode = styled.span`
  font-family: 'Unbounded', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #2c3e50;
`;

const SymbolBadge = styled.span`
  background: ${props => props.$type === 'Crypto' ? '#f39c12' : props.$type === 'Equity' ? '#3498db' : '#95a5a6'};
  color: white;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
`;

const SymbolName = styled.div`
  font-size: 0.85rem;
  color: #2c3e50;
  margin-bottom: 0.15rem;
  font-family: 'Unbounded', sans-serif;
`;

const SymbolMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #7f8c8d;
  font-family: 'Unbounded', sans-serif;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: ${props => props.$isLoading ? '#f8f9fa' : 'rgba(34, 197, 94, 0.1)'};
  border-radius: 6px;
  border-left: 3px solid ${props => props.$isLoading ? '#bdc3c7' : '#22c55e'};
`;

const PriceValue = styled.span`
  font-family: 'Unbounded', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: ${props => props.$isLoading ? '#7f8c8d' : '#16a34a'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PriceLoading = styled.span`
  font-size: 0.8rem;
  color: #7f8c8d;
  font-style: italic;
`;

const RegionFlag = styled.span`
  font-size: 1rem;
`;

const getRegionFlag = (region) => {
  const flags = {
    'US': '🇺🇸',
    'AR': '🇦🇷',
    'BR': '🇧🇷',
    'CN': '🇨🇳',
    'EU': '🇪🇺',
    'Global': '🌍'
  };
  return flags[region] || '🌍';
};

const SymbolSearch = ({ onSymbolSelect, placeholder = "Buscar instrumento...", initialValue = "" }) => {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [prices, setPrices] = useState(new Map()); // Map para almacenar precios por símbolo
  const [loadingPrices, setLoadingPrices] = useState(new Set()); // Set para símbolos cargando precio
  
  const containerRef = useRef();
  const inputRef = useRef();
  const searchTimeoutRef = useRef(null);

  // Buscar símbolos con debounce
  useEffect(() => {
    // Limpiar timeout anterior
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Si no hay query, mostrar símbolos populares
    if (!query.trim()) {
      searchTimeoutRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const popularSymbols = await symbolSearchService.searchSymbols("");
          setResults(popularSymbols);
          // Cargar precios para símbolos populares
          loadPricesForResults(popularSymbols);
        } catch (error) {
          console.error('Error cargando símbolos populares:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 100);
      return;
    }

    // Buscar con debounce de 300ms
    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
        try {
          const searchResults = await symbolSearchService.searchSymbols(query);
          setResults(searchResults);
          setSelectedIndex(-1);
          // Cargar precios para los resultados
          loadPricesForResults(searchResults);
        } catch (error) {
          console.error('Error en búsqueda:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar teclas de navegación
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSymbolSelect(results[selectedIndex]);
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!isOpen && value) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Nueva función para cargar precios
  const loadPricesForResults = async (symbols) => {
    if (!symbols || symbols.length === 0) return;
    
    // Tomar solo los primeros 5 para no sobrecargar la API
    const symbolsToLoad = symbols.slice(0, 5);
    
    for (const symbol of symbolsToLoad) {
      if (!prices.has(symbol.symbol) && !loadingPrices.has(symbol.symbol)) {
        // Marcar como cargando
        setLoadingPrices(prev => new Set([...prev, symbol.symbol]));
        
        try {
          const price = await priceService.getCurrentPrice(symbol.symbol);
          setPrices(prev => new Map([...prev, [symbol.symbol, price]]));
        } catch (error) {
          console.warn(`Error loading price for ${symbol.symbol}:`, error);
          // Marcar como error en el precio
          setPrices(prev => new Map([...prev, [symbol.symbol, null]]));
        } finally {
          // Quitar del set de carga
          setLoadingPrices(prev => {
            const newSet = new Set(prev);
            newSet.delete(symbol.symbol);
            return newSet;
          });
        }
      }
    }
  };

  const handleSymbolSelect = (symbol) => {
    // Agregar el precio al objeto symbol si está disponible
    const symbolWithPrice = {
      ...symbol,
      currentPrice: prices.get(symbol.symbol)
    };
    
    setQuery(symbol.symbol);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSymbolSelect(symbolWithPrice);
  };

  const handleCustomSymbolCreate = () => {
    const customSymbol = {
      symbol: query.toUpperCase(),
      name: query.toUpperCase(),
      type: 'Custom',
      region: 'Unknown',
      currency: 'USD',
      sector: 'Personalizado',
      price: null,
      isCustom: true
    };
    
    setQuery(customSymbol.symbol);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSymbolSelect(customSymbol);
  };

  const renderResults = () => {
    if (loading) {
      return (
        <LoadingState>
          🔍 Buscando instrumentos...
        </LoadingState>
      );
    }

    if (results.length === 0 && query.trim()) {
      return (
        <>
          <EmptyState>
            😞 No se encontraron instrumentos
          </EmptyState>
          <CustomSymbolOption
            onClick={handleCustomSymbolCreate}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CustomSymbolText>✨ Crear símbolo personalizado: {query.toUpperCase()}</CustomSymbolText>
            <CustomSymbolHint>Podrás ingresar el precio manualmente</CustomSymbolHint>
          </CustomSymbolOption>
        </>
      );
    }

    if (results.length === 0) {
      return (
        <EmptyState>
          💡 Escribe para buscar o crear un símbolo personalizado
        </EmptyState>
      );
    }

    return (
      <>
        {!query.trim() && (
          <PopularSection>
            <SectionTitle>📈 Símbolos Populares</SectionTitle>
          </PopularSection>
        )}
        
        {results.map((symbol, index) => (
          <SymbolOption
            key={`${symbol.symbol}-${index}`}
            $selected={selectedIndex === index}
            onClick={() => handleSymbolSelect(symbol)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <SymbolHeader>
              <SymbolCode>{symbol.symbol}</SymbolCode>
              <SymbolBadge $type={symbol.type}>{symbol.type}</SymbolBadge>
            </SymbolHeader>
            
            <SymbolName>{symbol.name}</SymbolName>
            
            <SymbolMeta>
              <span>
                <RegionFlag>{getRegionFlag(symbol.region)}</RegionFlag> {symbol.region}
              </span>
              <span>•</span>
              <span>🏭 {symbol.sector}</span>
              <span>•</span>
              <span>💱 {symbol.currency}</span>
            </SymbolMeta>
            
            {/* Mostrar precio */}
            <PriceContainer $isLoading={loadingPrices.has(symbol.symbol)}>
              {loadingPrices.has(symbol.symbol) ? (
                <PriceLoading>🔍 Cargando precio...</PriceLoading>
              ) : prices.has(symbol.symbol) ? (
                <PriceValue $isLoading={false}>
                  <DollarSign size={14} />
                  {prices.get(symbol.symbol) !== null 
                    ? `$${Number(prices.get(symbol.symbol)).toFixed(2)}` 
                    : 'N/A'
                  }
                  <TrendingUp size={12} />
                </PriceValue>
              ) : null}
            </PriceContainer>
          </SymbolOption>
        ))}
      </>
    );
  };

  return (
    <SearchContainer ref={containerRef}>
      <SearchInput
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        $isOpen={isOpen}
        autoComplete="off"
      />
      
      <AnimatePresence>
        {isOpen && (
          <DropdownContainer
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {renderResults()}
          </DropdownContainer>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SymbolSearch;

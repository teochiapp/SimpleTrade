import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';

// Importar containers
import LandingPageContainer from './containers/LandingPageContainer';
import DashboardContainer from './containers/DashboardContainer';
import TradeLogsContainer from './containers/TradeLogsContainer';

// Componente para rutas protegidas
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardContainer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trades" 
              element={
                <ProtectedRoute>
                  <TradeLogsContainer />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

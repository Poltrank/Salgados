import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Componente de Segurança para capturar erros e não deixar a tela "Amarela/Branca"
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro capturado pelo sistema:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          fontFamily: 'sans-serif', 
          backgroundColor: '#FEF3C7', 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#DC2626', fontSize: '2rem', marginBottom: '1rem' }}>Opa! Ocorreu um erro no site.</h1>
          <p style={{ color: '#4B5563', marginBottom: '20px' }}>Tente recarregar a página.</p>
          <details style={{ marginTop: '20px', color: '#EF4444', maxWidth: '600px', textAlign: 'left', background: 'white', padding: '20px', borderRadius: '10px' }}>
            <summary>Ver detalhes do erro (para o Desenvolvedor)</summary>
            <pre style={{ marginTop: '10px', fontSize: '12px', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#EA580C',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
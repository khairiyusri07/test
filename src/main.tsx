import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import type { Page } from './App';
import './styles.css';

const page = (document.body.dataset.page || 'home') as Page;
const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import './styles/tailwind.css';
import './styles/index.css';

import App from './App.tsx'
import { AppWrapper } from './components/page-meta.tsx'
import { SidebarProvider } from './contexts/sidebar-context.tsx';
import { initRequest } from './services/initRequest.ts'

initRequest(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <BrowserRouter>
          <SidebarProvider>
              <App />
          </SidebarProvider>
        </BrowserRouter>
      </AppWrapper>
    </Provider>
  </StrictMode>,
)

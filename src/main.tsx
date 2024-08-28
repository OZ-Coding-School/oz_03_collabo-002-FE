import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass', // 또는 'warn', 'error' 등으로 설정 가능
  });
}

enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider>
    <App />
  </MantineProvider>,
);
});

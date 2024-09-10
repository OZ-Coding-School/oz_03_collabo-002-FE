import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');
//   return worker.start({import { PayPalScriptProvider } from '@paypal/react-paypal-js';

//     onUnhandledRequest: 'bypass', // 또는 'warn', 'error' 등으로 설정 가능
//   });
// }

// enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider>
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <App />
    </PayPalScriptProvider>
  </MantineProvider>,
);
// });

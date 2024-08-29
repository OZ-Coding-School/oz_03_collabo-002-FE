import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');
//   return worker.start({
//     onUnhandledRequest: 'bypass', // 또는 'warn', 'error' 등으로 설정 가능
//   });
// }

<<<<<<< HEAD
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <MantineProvider>
      <App />
    </MantineProvider>,
  );
});
=======
// enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider>
    <App />
  </MantineProvider>,
);
// });
>>>>>>> 5ab89ba462a76b698ae459d7331b7dbcfe5e988a

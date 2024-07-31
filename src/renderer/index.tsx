import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.filesystemIpc.once((args) => {
  console.log(args);
});

window.electron.filesystemIpc.sendMessage({ path: 'foo' });

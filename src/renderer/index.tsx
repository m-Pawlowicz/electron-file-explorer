import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import { FileTree } from './FileTree';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<FileTree isRoot/>);

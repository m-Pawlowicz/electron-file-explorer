import {
  MemoryRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

const { filesystemIpc } = window.electron;

function Hello() {
  const location = useLocation();

  useEffect(() => {
    filesystemIpc.sendMessage({ path: location.pathname });
  }, []);

  useEffect(() => {
    const unsubscribe = filesystemIpc.on((args) => {
      console.log('directory items from backend', args);
    });

    return () => {
      unsubscribe();
    };
  });

  return <>placeholder</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

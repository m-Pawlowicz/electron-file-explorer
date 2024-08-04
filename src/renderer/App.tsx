import Folder from '@mui/icons-material/Folder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { DirectoryItem } from '../types';
import './App.css';
import { File } from './components/File';

const { filesystemIpc } = window.electron;

type FileTreeProps = {
  path?: string;
  isInitiallyOpen?: boolean;
};

function FileTree({ path = '/', isInitiallyOpen = false }: FileTreeProps) {
  const [open, setOpen] = useState(isInitiallyOpen);
  const [directoryContents, setDirectoryContents] = useState<DirectoryItem[]>(
    [],
  );

  useEffect(() => {
    const unsubscribe = filesystemIpc.on((args) => {
      if (args.path === path) {
        // we want to set new contents only for the component where path matches
        // otherwise we would set the same contents for every single component that has created a subscription via useEffect
        // the subscription created in this useEffect will persist until a component will be unmounted
        // so we spawn a single subscription for each folder, maybe it could be optimized??
        setDirectoryContents(args.contents);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onFolderClick = () => {
    if (!open) {
      filesystemIpc.sendMessage({ path });
    }
    setOpen((prev) => !prev);
  };

  return (
    <List
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        height: '100%',
      }}
    >
      <ListItemButton onClick={onFolderClick}>
        <Folder />
        {path}
      </ListItemButton>
      {open && (
        <List>
          {directoryContents.map((x, index) => (
            <li key={x.name + index}>
              {x.isDirectory ? (
                <FileTree path={x.path} key={x.name + index} />
              ) : (
                <File name={x.name} />
              )}
            </li>
          ))}
        </List>
      )}
    </List>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileTree isInitiallyOpen />} />
      </Routes>
    </Router>
  );
}

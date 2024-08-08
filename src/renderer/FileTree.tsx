import "./FileTree.css"
import Folder from '@mui/icons-material/Folder';
import List from '@mui/material/List';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { DirectoryItem } from '../types';
import { File } from './File';

const { filesystemIpc } = window.electron;

type FileTreeProps = {
  path?: string;
  isRoot?: boolean;
};

async function getPathContents(path: string) {
  return filesystemIpc.invoke({ path });
}

export function FileTree({ path = '/', isRoot = false }: FileTreeProps) {
  const [open, setOpen] = useState(false);
  const [directoryContents, setDirectoryContents] = useState<DirectoryItem[]>(
    [],
  );
  const [listPopoverButton, setListPopoverButton] =
    useState<HTMLButtonElement | null>(null);

  const listPopoverCallbackRef = useCallback((buttonRef: HTMLButtonElement) => {
    setListPopoverButton(buttonRef);
  }, []);

  useEffect(() => {
    if (!isRoot || open) {
      return;
    }

    // dispatch a click event for components with isInitiallyOpen set to true
    listPopoverButton?.click();
    setOpen(true);
  }, [isRoot, listPopoverButton, open]);

  const onFolderClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // prevent flipping to false when invoking click from useEffect
    if (event?.isTrusted) {
      setOpen((prev) => !prev);
    }

    setPathContents();

    async function setPathContents() {
      const pathData = await getPathContents(path);
      if (pathData.path === path) {
        setDirectoryContents(pathData.contents);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        height: '100%',
      }}
    >
      <Button
        onClick={onFolderClick}
        ref={listPopoverCallbackRef}
        component="button"
        variant="text"
      >
        {open ? <ExpandLess /> : <ChevronRight />}
        <Folder />
        {path}
      </Button>
      {open && (
        <List>
          {directoryContents.map((x, index) => (
            <ListItem key={x.id}>
              {x.isDirectory ? (
                <FileTree path={x.path} />
              ) : (
                <File name={x.name} />
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

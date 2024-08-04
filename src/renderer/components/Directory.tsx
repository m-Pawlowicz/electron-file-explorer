import { IconButton } from '@mui/material';
import { DirectoryItem } from '../../types';
import Folder from '@mui/icons-material/Folder';

export function Directory(params: Pick<DirectoryItem, 'name'>) {
  return (
    <IconButton aria-label={`open ${params.name} directory`}>
      <Folder />
      {params.name}
    </IconButton>
  );
}

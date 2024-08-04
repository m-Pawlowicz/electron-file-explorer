import { IconButton } from '@mui/material';
import { DirectoryItem } from '../../types';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';

export function File({ name }: Pick<DirectoryItem, 'name'>) {
  return (
    <IconButton aria-label={`open ${name} file`}>
      <InsertDriveFile />
      {name}
    </IconButton>
  );
}

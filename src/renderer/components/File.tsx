import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import { Button, ListItem, SvgIcon } from '@mui/material';
import { DirectoryItem } from '../../types';

export function File({ name }: Pick<DirectoryItem, 'name'>) {
  return (
    <ListItem>
      <Button
        aria-label={`open ${name} file`}
        component="button"
        variant="text"
        sx={{ color: 'white' }}
      >
        <InsertDriveFile />
        {name}
      </Button>
    </ListItem>
  );
}

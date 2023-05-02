import { type PropsWithChildren } from 'react';
import { Menu } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

type BookmarkMenuProps = {
  url: string;
  onBookmarkRemoved: (url: string) => void;
  setIsEditing: (isEditing: boolean) => void;
};

export const BookmarkMenu = ({
  url,
  onBookmarkRemoved,
  setIsEditing,
  children,
}: PropsWithChildren<BookmarkMenuProps>) => {
  return (
    <Menu shadow="md" width={200} withinPortal position="bottom-end">
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<Edit size={14} />} onClick={() => setIsEditing(true)}>
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<Trash size={14} />}
          onClick={() => onBookmarkRemoved(url)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

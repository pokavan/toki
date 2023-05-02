import { type PropsWithChildren } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Stack,
  Divider,
  Flex,
  Chip,
  Group,
  Header,
  Title,
} from '@mantine/core';
import { Bookmark as BookmarkIcon } from 'tabler-icons-react';
import { Bookmark } from 'types';

type AppShellProps = {
  onBookmarkCreated: (bookmark: Bookmark) => void;
  setSelectedTag: (tag) => void;
  tags: Array<string>;
  selectedTag?: string;
};

export const AppShell = ({
  tags,
  selectedTag,
  setSelectedTag,
  children,
}: PropsWithChildren<AppShellProps>) => {
  return (
    <MantineAppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Flex>
            <BookmarkIcon size="3em" />
            <Title order={1} size="h1">
              Bookmarks
            </Title>
          </Flex>
        </Header>
      }
      navbar={
        <Navbar width={{ base: 180 }} p="xs">
          <Stack>
            <Group position="center" mt="md">
              <Chip
                checked={!selectedTag}
                onClick={() => setSelectedTag(undefined)}
              >
                All
              </Chip>
            </Group>
            <Divider />
            <Chip.Group value={selectedTag ?? null} onChange={setSelectedTag}>
              <Group position="center" mt="md">
                {tags.map((tag) => (
                  <Chip value={tag}>{tag}</Chip>
                ))}
              </Group>
            </Chip.Group>
          </Stack>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </MantineAppShell>
  );
};

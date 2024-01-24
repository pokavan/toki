import { useState } from 'react';
import {
  Title,
  Card,
  Anchor,
  Stack,
  Overlay,
  Flex,
  Image,
  UnstyledButton,
  useMantineTheme,
  type CSSObject,
} from '@mantine/core';
import { GripVertical, DotsVertical } from 'tabler-icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { BookmarkMenu } from '../bookmark-menu';
import { BookmarkForm } from '../bookmark-form';
import type { Bookmark as TBookmark } from 'types';

type BookmarkProps = {
  url: string;
  label: string;
  onBookmarkRemoved: (url: string) => void;
  onBookmarkUpdated: (bookmark: TBookmark) => void;
  imgSrc?: string;
  tags?: Array<string>;
  allTags?: Array<string>;
};

export const Bookmark = ({
  url,
  label,
  imgSrc,
  onBookmarkRemoved,
  onBookmarkUpdated,
  tags,
  allTags,
}: BookmarkProps) => {
  const theme = useMantineTheme();
  const [isEditing, setIsEditing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });
  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const buttonStyle: CSSObject = {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    ':hover': {
      backgroundColor: theme.colors.gray[4],
    },
    pointerEvents: 'auto',
    transition: `opacity 0.6s`,
  };

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      style={dragStyle}
      sx={{
        ':hover': {
          backgroundColor: 'ButtonHighlight',
          '> :first-child button': {
            opacity: '1',
          },
        },
        height: isEditing ? 'auto' : '160px',
        maxHeight: isEditing ? '700px' : '160px',
        '> :first-child button': {
          opacity: '0',
        },
        transition: 'max-height 0.3s ease-in-out',
      }}
    >
      <Overlay opacity={0} sx={{ pointerEvents: 'none' }}>
        <Flex justify="space-between">
          <UnstyledButton
            onClick={(ev) => ev.stopPropagation()}
            onMouseUp={(ev) => ev.stopPropagation()}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            sx={{
              ...buttonStyle,
              ':hover': {
                ...buttonStyle[':hover'],
                cursor: isDragging ? 'grabbing' : 'grab',
              },
            }}
          >
            <GripVertical />
          </UnstyledButton>
          {/* {isEditing ? null : (
            <BookmarkMenu
              url={url}
              onBookmarkRemoved={onBookmarkRemoved}
              setIsEditing={setIsEditing}
            >
              <UnstyledButton sx={buttonStyle}>
                <DotsVertical />
              </UnstyledButton>
            </BookmarkMenu>
          )} */}
        </Flex>
      </Overlay>
      {isEditing ? (
        <Stack
          align="center"
          justify="space-between"
          sx={{
            height: '100%',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <Title size="h4" order={3}>
            {label}
          </Title>
          <BookmarkForm
            initialValues={{ url, label, tags, imgSrc }}
            onSubmit={(bookmark) => {
              onBookmarkUpdated(bookmark);
              setIsEditing(false);
            }}
            tags={allTags}
          />
        </Stack>
      ) : (
        <Anchor href={url} target="_blank">
          <Stack align="center" justify="center" sx={{ height: '100%' }}>
            <Flex gap="xs">
              {imgSrc ? <Image width="24" src={imgSrc} /> : null}
              <Title size="h4" order={3}>
                {label}
              </Title>
            </Flex>
          </Stack>
        </Anchor>
      )}
    </Card>
  );
};

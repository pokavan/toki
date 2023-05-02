import { useState } from 'react';
import { Grid } from '@mantine/core';
import {
  DndContext,
  useDroppable,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Bookmark } from '../bookmark/bookmark';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

export const BookmarkGrid = ({
  bookmarks,
  onBookmarkRemoved,
  onBookmarkUpdated,
  selectedTag,
  tags,
}) => {
  const [items, setItems] = useState(bookmarks ?? []);
  const { setNodeRef } = useDroppable({
    id: 'dropzone',
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(({ url }) => url)}
        strategy={rectSortingStrategy}
      >
        <Grid gutter="sm" ref={setNodeRef}>
          {(!selectedTag
            ? items ?? []
            : (items ?? []).filter(({ tags }) => tags?.includes(selectedTag))
          ).map((bookmark) => {
            return (
              <Grid.Col key={bookmark.url} lg={4} md={6} sm={12}>
                <Bookmark
                  {...bookmark}
                  onBookmarkRemoved={onBookmarkRemoved}
                  onBookmarkUpdated={onBookmarkUpdated}
                  allTags={tags}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(({ url }) => url === active.id);
        const newIndex = items.findIndex(({ url }) => url === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

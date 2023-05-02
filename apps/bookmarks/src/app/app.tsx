import { useCallback, useState } from 'react';
import { AppShell, BookmarkGrid } from 'ui-lib';
import { db, useLiveQuery } from 'store';
import type { Bookmark } from 'types';

export function App() {
  const [selectedTag, setSelectedTag] = useState<string>();
  const createBookmark = useCallback(async ({ url, label }: Bookmark) => {
    await db.bookmarks.add({
      url,
      label,
    });
  }, []);
  const updateBookmark = useCallback(async (bookmark: Bookmark) => {
    await db.bookmarks.update(bookmark.url, bookmark);
  }, []);
  const removeBookmark = useCallback(async (url: string) => {
    await db.bookmarks.delete(url);
  }, []);

  const bookmarks: Bookmark[] | undefined = useLiveQuery(() =>
    db.bookmarks.toArray()
  );

  const tags = Array.from(
    new Set(
      (bookmarks ?? [])
        .map(({ tags }) => tags)
        .flat()
        .filter(Boolean)
    )
  );

  return (
    <AppShell
      key={JSON.stringify(bookmarks)}
      tags={tags as Array<string>}
      selectedTag={selectedTag}
      setSelectedTag={setSelectedTag}
      onBookmarkCreated={createBookmark}
    >
      {bookmarks ? (
        <BookmarkGrid
          key={JSON.stringify(bookmarks)}
          selectedTag={selectedTag}
          bookmarks={bookmarks}
          onBookmarkRemoved={removeBookmark}
          onBookmarkUpdated={updateBookmark}
          tags={tags}
        />
      ) : null}
    </AppShell>
  );
}

export default App;

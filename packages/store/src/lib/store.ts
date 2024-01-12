import Dexie, { Table } from 'dexie';
import { getDefaultBookmarks } from 'utils';
import type { Bookmark } from 'types';
export { useLiveQuery } from 'dexie-react-hooks';

export class BookmarksDb extends Dexie {
  bookmarks!: Table<Bookmark>;

  constructor() {
    super('bookmarksDb');
    this.version(2).stores({
      bookmarks: '++url, label', // Primary key and indexed props
    });

    this.on('populate', () => {
      this.bookmarks.bulkAdd(getDefaultBookmarks());
    });
  }
}

export const db = new BookmarksDb();

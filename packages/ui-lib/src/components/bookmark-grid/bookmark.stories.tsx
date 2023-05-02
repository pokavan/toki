/* eslint-disable @typescript-eslint/no-empty-function */
// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { BookmarkGrid as BookmarkGridComponent } from './bookmark-grid';

const meta: Meta<typeof BookmarkGridComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ui-lib',
  component: BookmarkGridComponent,
};

export default meta;
type Story = StoryObj<typeof BookmarkGridComponent>;

export const BookmarkGrid: Story = {
  render: () => (
    <BookmarkGridComponent
      tags={[]}
      selectedTag={undefined}
      onBookmarkRemoved={() => {}}
      onBookmarkUpdated={() => {}}
      bookmarks={[
        { url: 'http://google.com', label: 'Google Search' },
        { url: 'https://storybook.js.org/', label: 'Storybook' },
        { url: 'https://github.com/', label: 'Github' },
        {
          url: 'https://developer.mozilla.org/en-US/',
          label: 'Mozilla Developer Network',
        },
      ]}
    />
  ),
};

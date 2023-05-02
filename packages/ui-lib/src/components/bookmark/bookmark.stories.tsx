/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react';

import { Bookmark as BookmarkComponent } from './bookmark';

const meta: Meta<typeof BookmarkComponent> = {
  title: 'ui-lib',
  component: BookmarkComponent,
};

export default meta;
type Story = StoryObj<typeof BookmarkComponent>;

export const Bookmark: Story = {
  render: () => (
    <BookmarkComponent
      onBookmarkRemoved={() => {}}
      onBookmarkUpdated={() => {}}
      label="Google"
      url="https://google.com"
    />
  ),
};

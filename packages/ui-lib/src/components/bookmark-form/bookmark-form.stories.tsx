/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';

import { BookmarkForm as BookmarkFormComponent } from '.';

const meta: Meta<typeof BookmarkFormComponent> = {
  title: 'ui-lib',
  component: BookmarkFormComponent,
  decorators: [
    (Story) => (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookmarkFormComponent>;

export const AddBookmarkModal: Story = {
  render: () => {
    return <BookmarkFormComponent tags={[]} onSubmit={() => {}} />;
  },
};

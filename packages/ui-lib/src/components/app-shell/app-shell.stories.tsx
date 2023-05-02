/* eslint-disable @typescript-eslint/no-empty-function */

import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';

import { AppShell as AppShellComponent } from './app-shell';

const meta: Meta<typeof AppShellComponent> = {
  title: 'ui-lib',
  component: AppShellComponent,
  decorators: [
    (Story) => (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppShellComponent>;

export const AppShell: Story = {
  render: () => (
    <AppShellComponent
      tags={[]}
      setSelectedTag={() => {}}
      onBookmarkCreated={() => {}}
    >
      Content goes here
    </AppShellComponent>
  ),
};

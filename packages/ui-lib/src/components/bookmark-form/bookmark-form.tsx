import {
  Button,
  Group,
  TextInput,
  Stack,
  Flex,
  MultiSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const urlPattern =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

export const BookmarkForm = ({ onSubmit, tags, initialValues = undefined }) => {
  const form = useForm({
    initialValues: initialValues ?? {
      url: '',
      label: '',
      imgSrc: '',
      tags: [],
    },

    validate: {
      url: (value) => (urlPattern.test(value) ? null : 'Invalid URL'),
    },
  });

  return (
    <Flex sx={{ width: '100%' }}>
      <form
        style={{ width: '100%' }}
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <Stack spacing="md">
          <TextInput
            label="Label"
            placeholder="Enter label..."
            {...form.getInputProps('label')}
          />

          <TextInput
            label="URL"
            placeholder="Enter URL..."
            {...form.getInputProps('url')}
          />

          <TextInput
            label="Image Src"
            placeholder="Enter image src..."
            {...form.getInputProps('imgSrc')}
          />

          <MultiSelect
            data={tags}
            label="Tags"
            {...form.getInputProps('tags')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Done</Button>
          </Group>
        </Stack>
      </form>
    </Flex>
  );
};

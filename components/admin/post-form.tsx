import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Post } from '~lib/prisma';
import { postInputsSchema } from '~lib/schemas';
import { PostInputs } from '~lib/types';

type Props = {
  onSubmit: SubmitHandler<PostInputs>;
  post?: Post;
};

export const PostForm: React.FC<Props> = ({ onSubmit, post }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<PostInputs>({ resolver: yupResolver(postInputsSchema) });
  const [publishedAt, setPublishedAt] = useState('');

  useEffect(() => {
    setValue('title', post?.title ?? '');
    setValue('body', post?.body ?? '');
    setValue('slug', post?.slug ?? '');
    setValue('publishedAt', post?.publishedAt ?? null);
    setPublishedAt(dayjs(post?.publishedAt).format('YYYY-MM-DDTHH:mm'));
  }, [post]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.body}>
          <FormLabel htmlFor="body">Body</FormLabel>
          <Textarea
            id="body"
            resize="vertical"
            size="lg"
            {...register('body')}
          />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.slug} isRequired>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input id="slug" {...register('slug')} />
          <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.publishedAt}>
          <FormLabel htmlFor="publishedAt">Published At</FormLabel>
          <Controller
            control={control}
            name="publishedAt"
            render={({ field: { onChange } }) => (
              <Input
                defaultValue={publishedAt}
                id="publishedAt"
                onFocus={(e) => {
                  // A clear button on Chrome's picker component does not fire onChange event on first load.
                  // Instead of onChange, use onFocus to reset value when the clear button was clicked.
                  if (!e.target.value) {
                    return onChange(null);
                  }

                  return onChange(e);
                }}
                type="datetime-local"
              />
            )}
          />
          <FormErrorMessage>{errors.publishedAt?.message}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="teal"
          isLoading={isSubmitting}
          mt="4"
          type="submit"
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

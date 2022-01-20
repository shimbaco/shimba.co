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
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Post } from '~lib/prisma';
import { postInputsSchema } from '~lib/schemas';
import { PostInputs } from '~lib/types';

type Props = {
  onSubmit: SubmitHandler<PostInputs>;
  post?: Post;
};

export const PostForm: React.FC<Props> = ({ onSubmit, post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInputs>({ resolver: yupResolver(postInputsSchema) });
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
          <Textarea id="body" resize="vertical" size="lg" />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.slug} isRequired>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input id="slug" {...register('slug')} />
          <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.publishedAt}>
          <FormLabel htmlFor="publishedAt">Published At</FormLabel>
          <Input id="publishedAt" type="datetime-local" />
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

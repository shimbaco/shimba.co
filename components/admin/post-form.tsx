import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Post } from '~lib/prisma';

type Props = {
  post?: Post;
};
type Inputs = Pick<Post, 'title' | 'body' | 'slug' | 'publishedAt'>;

export const PostForm: React.FC<Props> = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('title'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="Title"
          {...register('title', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <Button colorScheme="teal" isLoading={isSubmitting} mt="4" type="submit">
        Save
      </Button>
    </form>
  );
};

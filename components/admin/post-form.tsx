import cn from 'classnames';
import React from 'react';
import { Path, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

import { Post } from '~lib/prisma';

type Props = {
  post?: Post;
};
type Inputs = Pick<Post, 'title' | 'body' | 'slug' | 'publishedAt'>;
type TextFieldProps = {
  name: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  className?: string;
  defaultValue?: string | number | undefined;
  options?: { required: boolean };
};

const TextField: React.FC<TextFieldProps> = ({
  name,
  register,
  className,
  defaultValue,
  options,
  ...props
}) => {
  return (
    <input
      className={cn(
        className,
        'border-gray-300 focus:border-indigo-300 py-1 rounded-md'
      )}
      defaultValue={defaultValue}
      type="text"
      {...register(name, options)}
    />
  );
};

export const PostForm: React.FC<Props> = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('title'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="inline-block mb-1">Title</label>
        <TextField
          className="block"
          name="title"
          register={register}
          defaultValue={post?.title}
          options={{ required: true }}
        />
        {errors.title && (
          <span className="text-pink-700 text-sm">This field is required</span>
        )}
      </div>

      <div className="mt-2">
        <input
          className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
          type="submit"
          value="Save"
        />
      </div>
    </form>
  );
};

import * as yup from 'yup';

import { PostInputs } from '~lib/types';

export const postInputsSchema: yup.SchemaOf<PostInputs> = yup.object({
  title: yup.string().required().max(100),
  body: yup.string().nullable().defined().default(null),
  slug: yup.string().required().max(30),
  publishedAt: yup.date().nullable().defined().default(null),
});

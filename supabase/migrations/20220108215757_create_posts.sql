CREATE TABLE IF NOT EXISTS public.posts
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug citext COLLATE pg_catalog."default" NOT NULL,
  title character varying COLLATE pg_catalog."default" NOT NULL,
  body text COLLATE pg_catalog."default" NOT NULL,
  published_at timestamp with time zone,
  modified_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_slug_key UNIQUE (slug)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
  OWNER to postgres;

GRANT ALL ON TABLE public.posts TO anon;

GRANT ALL ON TABLE public.posts TO authenticated;

GRANT ALL ON TABLE public.posts TO postgres;

GRANT ALL ON TABLE public.posts TO service_role;

CREATE trigger update_updated_at_on_posts BEFORE UPDATE
  ON public.posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

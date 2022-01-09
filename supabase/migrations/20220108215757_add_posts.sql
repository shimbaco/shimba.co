-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.posts
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    body text COLLATE pg_catalog."default" NOT NULL,
    slug citext COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    published_at timestamp with time zone,
    modified_at timestamp with time zone,
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
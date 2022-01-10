CREATE FUNCTION update_updated_at() RETURNS trigger AS $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

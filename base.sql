
DO $$ DECLARE
    r RECORD;
BEGIN
    
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE style_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_key VARCHAR(50) NOT NULL UNIQUE,
  property_name VARCHAR(100) NOT NULL
);

CREATE TABLE user_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  alias_id UUID REFERENCES style_aliases(id), -- puede ser NULL si es uno nuevo
  short_key VARCHAR(50) NOT NULL,
  property_override VARCHAR(100),
  UNIQUE(user_id, short_key)
);

CREATE TABLE token_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE token_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES token_categories(id),
  token_key VARCHAR(100) NOT NULL,
  token_value VARCHAR(100) NOT NULL,
  UNIQUE(category_id, token_key)
);

CREATE TABLE user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id UUID REFERENCES token_categories(id) NOT NULL,
  base_token_id UUID REFERENCES token_definitions(id), -- opcional
  token_key VARCHAR(100) NOT NULL,
  token_value VARCHAR(100) NOT NULL,
  UNIQUE(user_id, category_id, token_key)
);

CREATE TABLE user_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_theme_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES user_themes(id) NOT NULL,
  user_token_id UUID REFERENCES user_tokens(id) NOT NULL,
  UNIQUE(theme_id, user_token_id)
);

CREATE TABLE global_style_variant_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE user_global_styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES user_themes(id),
  variant_type_id UUID REFERENCES global_style_variant_types(id),
  variant_key VARCHAR(50), -- '1', '2', '3', etc.
  properties JSONB NOT NULL,
  UNIQUE(theme_id, variant_type_id, variant_key)
);

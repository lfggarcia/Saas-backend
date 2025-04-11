
DO $$ DECLARE
    r RECORD;
BEGIN
    
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE "public"."app_collaborator_permissions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "collaborator_id" uuid,
    "permission_id" uuid,
    "granted_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."app_collaborators" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "app_id" uuid,
    "user_id" uuid,
    "added_at" timestamp DEFAULT now(),
    "role_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."apps" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamp DEFAULT now(),
    "user_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."collaborator_roles" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."component_pool" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "type_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."component_pool_properties" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "component_id" uuid,
    "key" text NOT NULL,
    "default_value" text,
    "type_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."component_types" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."feature_screens" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "feature_id" uuid,
    "screen_id" uuid,
    "environment" text DEFAULT 'production'::text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."feature_version_screens" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "feature_version_id" uuid,
    "screen_version_id" uuid,
    "environment" text DEFAULT 'production'::text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."feature_versions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "feature_id" uuid,
    "version" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "is_published" bool DEFAULT false,
    "created_by" uuid,
    "updated_by" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."features" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "version" text DEFAULT '1.0.0'::text,
    "is_active" bool DEFAULT true,
    "created_at" timestamp DEFAULT now(),
    "navigation_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."global_style_variant_types" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" varchar(50) NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."navigation_types" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."navigations" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "app_id" uuid NOT NULL,
    "name" text NOT NULL,
    "type_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."permission_type_catalog" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."permissions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "key" text NOT NULL,
    "label" text NOT NULL,
    "description" text,
    "type_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."property_types" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."role_permissions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "role_id" uuid NOT NULL,
    "permission_id" uuid NOT NULL,
    "granted_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."screen_component_overrides" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "screen_component_id" uuid,
    "key" text NOT NULL,
    "value" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."screen_components" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "screen_id" uuid,
    "component_id" uuid,
    "position_index" int4,
    "alias" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."screen_versions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "screen_id" uuid,
    "version" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "is_published" bool DEFAULT false,
    "created_by" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."screens" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "is_global" bool DEFAULT false,
    "created_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sessions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "token" text NOT NULL,
    "ip_address" text,
    "user_agent" text,
    "expires_at" timestamptz,
    "created_at" timestamptz DEFAULT now(),
    "user_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."style_aliases" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "short_key" varchar(50) NOT NULL,
    "property_name" varchar(100) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."token_categories" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."token_definitions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "category_id" uuid,
    "token_key" varchar(100) NOT NULL,
    "token_value" varchar(100) NOT NULL,
    "created_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."translation_keys" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "namespace" text,
    "key" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_aliases" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "short_key" varchar(50) NOT NULL,
    "property_override" varchar(100),
    "alias_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_global_styles" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "theme_id" uuid,
    "variant_type_id" uuid,
    "variant_key" varchar(50),
    "properties" jsonb NOT NULL,
    "created_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_languages" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "locale_code" varchar(10) NOT NULL,
    "display_name" varchar(100) NOT NULL,
    "is_default" bool DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_roles" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "role_id" uuid NOT NULL,
    "assigned_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_status_catalog" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_theme_tokens" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "theme_id" uuid NOT NULL,
    "user_token_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_themes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" varchar(100),
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "updated_by" uuid,
    "user_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_tokens" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "token_key" varchar(100) NOT NULL,
    "token_value" varchar(100) NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "base_token_id" uuid,
    "updated_by" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_translations" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "key_id" uuid NOT NULL,
    "language_id" uuid NOT NULL,
    "translation" text NOT NULL,
    "last_updated_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "username" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "full_name" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "status_id" uuid,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."app_collaborator_permissions" ADD FOREIGN KEY ("collaborator_id") REFERENCES "public"."app_collaborators"("id") ON DELETE CASCADE;
ALTER TABLE "public"."app_collaborator_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id");


-- Indices
CREATE UNIQUE INDEX "PK_be6d4d23efea145299137936089" ON public.app_collaborator_permissions USING btree (id);
CREATE UNIQUE INDEX "UQ_4e17c837734c7990dd53e31a932" ON public.app_collaborator_permissions USING btree (collaborator_id);
CREATE UNIQUE INDEX "UQ_98d02700a43eb716425a6d6ed4e" ON public.app_collaborator_permissions USING btree (permission_id);
CREATE UNIQUE INDEX app_collaborator_permissions_collaborator_id_permission_id_key ON public.app_collaborator_permissions USING btree (collaborator_id, permission_id);
ALTER TABLE "public"."app_collaborators" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."app_collaborators" ADD FOREIGN KEY ("role_id") REFERENCES "public"."collaborator_roles"("id");
ALTER TABLE "public"."app_collaborators" ADD FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_f070c66d4fbf47fe6f296a6a548" ON public.app_collaborators USING btree (id);
CREATE UNIQUE INDEX "UQ_b8993a2dc0acbcc49fcf057bd97" ON public.app_collaborators USING btree (app_id);
CREATE UNIQUE INDEX "UQ_a699e4df719e785388cfb81ac02" ON public.app_collaborators USING btree (user_id);
CREATE UNIQUE INDEX app_collaborators_app_id_user_id_key ON public.app_collaborators USING btree (app_id, user_id);
ALTER TABLE "public"."apps" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_c5121fda0f8268f1f7f84134e19" ON public.apps USING btree (id);


-- Indices
CREATE UNIQUE INDEX "PK_d02fedc00b3a4836ac54edc151c" ON public.collaborator_roles USING btree (id);
CREATE UNIQUE INDEX "UQ_56377b9abd78a5cd06cc8febc99" ON public.collaborator_roles USING btree (name);
CREATE UNIQUE INDEX collaborator_roles_name_key ON public.collaborator_roles USING btree (name);
ALTER TABLE "public"."component_pool" ADD FOREIGN KEY ("type_id") REFERENCES "public"."component_types"("id");


-- Indices
CREATE UNIQUE INDEX "PK_2e86830b7878a5eaaa58dd7eaed" ON public.component_pool USING btree (id);
CREATE UNIQUE INDEX "UQ_f4afbf11d05ab8ce248c64a1ca0" ON public.component_pool USING btree (name);
CREATE UNIQUE INDEX component_pool_name_key ON public.component_pool USING btree (name);
ALTER TABLE "public"."component_pool_properties" ADD FOREIGN KEY ("type_id") REFERENCES "public"."property_types"("id");
ALTER TABLE "public"."component_pool_properties" ADD FOREIGN KEY ("component_id") REFERENCES "public"."component_pool"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_ef559c28c4a2bee8aeabe2e4107" ON public.component_pool_properties USING btree (id);
CREATE UNIQUE INDEX "UQ_2be79fb60a6ed448a4dd9ba922f" ON public.component_pool_properties USING btree (component_id);
CREATE UNIQUE INDEX "UQ_b70c40fb18adeb35d0ee20036a3" ON public.component_pool_properties USING btree (key);
CREATE UNIQUE INDEX component_pool_properties_component_id_key_key ON public.component_pool_properties USING btree (component_id, key);


-- Indices
CREATE UNIQUE INDEX "PK_8a75c28f3e67b87f00442cac56a" ON public.component_types USING btree (id);
CREATE UNIQUE INDEX "UQ_da52ce52871813c122ec3934da0" ON public.component_types USING btree (name);
CREATE UNIQUE INDEX component_types_name_key ON public.component_types USING btree (name);
ALTER TABLE "public"."feature_screens" ADD FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE CASCADE;
ALTER TABLE "public"."feature_screens" ADD FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_d8e130096553132e1386607161f" ON public.feature_screens USING btree (id);
CREATE UNIQUE INDEX "UQ_a0fcf03dec11b836ceb1f7a8086" ON public.feature_screens USING btree (feature_id);
CREATE UNIQUE INDEX "UQ_8c438b897c93d9c11d2b367e9eb" ON public.feature_screens USING btree (screen_id);
CREATE UNIQUE INDEX "UQ_12d3511f60de1884dfee5f7d03d" ON public.feature_screens USING btree (environment);
CREATE UNIQUE INDEX feature_screens_feature_id_screen_id_environment_key ON public.feature_screens USING btree (environment, feature_id, screen_id);
ALTER TABLE "public"."feature_version_screens" ADD FOREIGN KEY ("screen_version_id") REFERENCES "public"."screen_versions"("id") ON DELETE CASCADE;
ALTER TABLE "public"."feature_version_screens" ADD FOREIGN KEY ("feature_version_id") REFERENCES "public"."feature_versions"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_8663aae95a72f68dd03da397810" ON public.feature_version_screens USING btree (id);
CREATE UNIQUE INDEX "UQ_0eb95d4a1803a0842b73be75fd1" ON public.feature_version_screens USING btree (feature_version_id);
CREATE UNIQUE INDEX "UQ_4bfa2ecd16365441e4e42006106" ON public.feature_version_screens USING btree (screen_version_id);
CREATE UNIQUE INDEX "UQ_028d9b4e4a3f3bf4de1575e15b3" ON public.feature_version_screens USING btree (environment);
CREATE UNIQUE INDEX feature_version_screens_feature_version_id_screen_version_i_key ON public.feature_version_screens USING btree (environment, feature_version_id, screen_version_id);
ALTER TABLE "public"."feature_versions" ADD FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE CASCADE;
ALTER TABLE "public"."feature_versions" ADD FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id");
ALTER TABLE "public"."feature_versions" ADD FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");


-- Indices
CREATE UNIQUE INDEX "PK_caa5758e5f0f182ee92a07f0ed0" ON public.feature_versions USING btree (id);
CREATE UNIQUE INDEX "UQ_e1e7e7622a3215a403327f6ca5b" ON public.feature_versions USING btree (feature_id);
CREATE UNIQUE INDEX "UQ_199d1951d72972e75f2d6915996" ON public.feature_versions USING btree (version);
CREATE UNIQUE INDEX feature_versions_feature_id_version_key ON public.feature_versions USING btree (feature_id, version);
ALTER TABLE "public"."features" ADD FOREIGN KEY ("navigation_id") REFERENCES "public"."navigations"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_5c1e336df2f4a7051e5bf08a941" ON public.features USING btree (id);


-- Indices
CREATE UNIQUE INDEX "PK_9c005d02c8b7e25353c9f5c482e" ON public.global_style_variant_types USING btree (id);
CREATE UNIQUE INDEX "UQ_6a96e901a6e79bf2b465684e691" ON public.global_style_variant_types USING btree (name);
CREATE UNIQUE INDEX global_style_variant_types_name_key ON public.global_style_variant_types USING btree (name);


-- Indices
CREATE UNIQUE INDEX "PK_53e49d829f52544a909532249a5" ON public.navigation_types USING btree (id);
CREATE UNIQUE INDEX "UQ_cdcf0fbed57bc1d2bdca0e1cbff" ON public.navigation_types USING btree (name);
CREATE UNIQUE INDEX navigation_types_name_key ON public.navigation_types USING btree (name);
ALTER TABLE "public"."navigations" ADD FOREIGN KEY ("type_id") REFERENCES "public"."navigation_types"("id");
ALTER TABLE "public"."navigations" ADD FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_3f38689f82ca58a9ed44bc560ae" ON public.navigations USING btree (id);
CREATE UNIQUE INDEX "UQ_7e2eafa4a48b25d626a527352d1" ON public.navigations USING btree (app_id);
CREATE UNIQUE INDEX "UQ_3e32258be055f1400000c6c4a4e" ON public.navigations USING btree (name);
CREATE UNIQUE INDEX navigations_app_id_name_key ON public.navigations USING btree (app_id, name);


-- Indices
CREATE UNIQUE INDEX "PK_141a4eb071f81933e738d252742" ON public.permission_type_catalog USING btree (id);
CREATE UNIQUE INDEX "UQ_5e25626b2ddae3aeaeff44ec9b6" ON public.permission_type_catalog USING btree (name);
CREATE UNIQUE INDEX permission_type_catalog_name_key ON public.permission_type_catalog USING btree (name);
ALTER TABLE "public"."permissions" ADD FOREIGN KEY ("type_id") REFERENCES "public"."permission_type_catalog"("id");


-- Indices
CREATE UNIQUE INDEX "PK_920331560282b8bd21bb02290df" ON public.permissions USING btree (id);
CREATE UNIQUE INDEX "UQ_017943867ed5ceef9c03edd9745" ON public.permissions USING btree (key);
CREATE UNIQUE INDEX permissions_key_key ON public.permissions USING btree (key);


-- Indices
CREATE UNIQUE INDEX "PK_129390b286b9c776438dfa475a8" ON public.property_types USING btree (id);
CREATE UNIQUE INDEX "UQ_3f23c3f28ed3e1a4b9d7f2ffa20" ON public.property_types USING btree (name);
CREATE UNIQUE INDEX property_types_name_key ON public.property_types USING btree (name);
ALTER TABLE "public"."role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;
ALTER TABLE "public"."role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_84059017c90bfcb701b8fa42297" ON public.role_permissions USING btree (id);
CREATE UNIQUE INDEX "UQ_178199805b901ccd220ab7740ec" ON public.role_permissions USING btree (role_id);
CREATE UNIQUE INDEX "UQ_17022daf3f885f7d35423e9971e" ON public.role_permissions USING btree (permission_id);
CREATE UNIQUE INDEX role_permissions_role_id_permission_id_key ON public.role_permissions USING btree (permission_id, role_id);


-- Indices
CREATE UNIQUE INDEX "PK_c1433d71a4838793a49dcad46ab" ON public.roles USING btree (id);
CREATE UNIQUE INDEX "UQ_648e3f5447f725579d7d4ffdfb7" ON public.roles USING btree (name);
CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);
ALTER TABLE "public"."screen_component_overrides" ADD FOREIGN KEY ("screen_component_id") REFERENCES "public"."screen_components"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_abd34875dfb0c136e82b64a3476" ON public.screen_component_overrides USING btree (id);
CREATE UNIQUE INDEX "UQ_4da6cb3334881f5abdb4a22a9de" ON public.screen_component_overrides USING btree (screen_component_id);
CREATE UNIQUE INDEX "UQ_f4716cf52178d96bd9fcc0aae58" ON public.screen_component_overrides USING btree (key);
CREATE UNIQUE INDEX screen_component_overrides_screen_component_id_key_key ON public.screen_component_overrides USING btree (key, screen_component_id);
ALTER TABLE "public"."screen_components" ADD FOREIGN KEY ("component_id") REFERENCES "public"."component_pool"("id") ON DELETE CASCADE;
ALTER TABLE "public"."screen_components" ADD FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_1c593a74a94442f41b57eb334ca" ON public.screen_components USING btree (id);
CREATE UNIQUE INDEX "UQ_8b0a5fc1bfce3d224c9b3991757" ON public.screen_components USING btree (screen_id);
CREATE UNIQUE INDEX "UQ_f3b29f4b90906de0b6c82c600c8" ON public.screen_components USING btree (component_id);
CREATE UNIQUE INDEX "UQ_7bcd45d72833b620314afb7037f" ON public.screen_components USING btree (alias);
CREATE INDEX idx_screen_components_screen ON public.screen_components USING btree (screen_id);
CREATE UNIQUE INDEX screen_components_screen_id_component_id_alias_key ON public.screen_components USING btree (alias, component_id, screen_id);
ALTER TABLE "public"."screen_versions" ADD FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE CASCADE;
ALTER TABLE "public"."screen_versions" ADD FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");


-- Indices
CREATE UNIQUE INDEX "PK_697329bffef91fa77460e905597" ON public.screen_versions USING btree (id);
CREATE UNIQUE INDEX "UQ_ced6d7b022074b7821a6501b1ca" ON public.screen_versions USING btree (screen_id);
CREATE UNIQUE INDEX "UQ_fcb7cad96f4016251e45bb77772" ON public.screen_versions USING btree (version);
CREATE UNIQUE INDEX screen_versions_screen_id_version_key ON public.screen_versions USING btree (screen_id, version);


-- Indices
CREATE UNIQUE INDEX "PK_15b65ed44367c5411efccdd7de1" ON public.screens USING btree (id);
ALTER TABLE "public"."sessions" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_3238ef96f18b355b671619111bc" ON public.sessions USING btree (id);
CREATE UNIQUE INDEX "UQ_e9f62f5dcb8a54b84234c9e7a06" ON public.sessions USING btree (token);
CREATE UNIQUE INDEX sessions_token_key ON public.sessions USING btree (token);


-- Indices
CREATE UNIQUE INDEX "PK_70bbe41815a04cb89e6ce41834c" ON public.style_aliases USING btree (id);
CREATE UNIQUE INDEX "UQ_86b72c35bff967f958dfbe237a4" ON public.style_aliases USING btree (short_key);
CREATE UNIQUE INDEX style_aliases_short_key_key ON public.style_aliases USING btree (short_key);


-- Indices
CREATE UNIQUE INDEX "PK_38014d023b6389c174f00d70570" ON public.token_categories USING btree (id);
CREATE UNIQUE INDEX "UQ_3f7eace6b177203b75e97caa81e" ON public.token_categories USING btree (name);
CREATE UNIQUE INDEX token_categories_name_key ON public.token_categories USING btree (name);
ALTER TABLE "public"."token_definitions" ADD FOREIGN KEY ("category_id") REFERENCES "public"."token_categories"("id");


-- Indices
CREATE UNIQUE INDEX "PK_0a02befda3c64c7b6c2c56cf77a" ON public.token_definitions USING btree (id);
CREATE UNIQUE INDEX "UQ_df2aa7555b8c6d35bef74cd45bc" ON public.token_definitions USING btree (category_id);
CREATE UNIQUE INDEX "UQ_2d0b7ca70dc58e9cc0334d3fb23" ON public.token_definitions USING btree (token_key);
CREATE UNIQUE INDEX token_definitions_category_id_token_key_key ON public.token_definitions USING btree (category_id, token_key);
ALTER TABLE "public"."translation_keys" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_b9fb6087506f44b1a451c8a5991" ON public.translation_keys USING btree (id);
CREATE UNIQUE INDEX "UQ_a315f559889cbe508fb6adb3e8c" ON public.translation_keys USING btree (user_id);
CREATE UNIQUE INDEX "UQ_13d6da8ac04a02980674f02755e" ON public.translation_keys USING btree (namespace);
CREATE UNIQUE INDEX "UQ_cf2395b8b962f90cd640e191446" ON public.translation_keys USING btree (key);
CREATE INDEX idx_translation_keys_user ON public.translation_keys USING btree (user_id);
CREATE UNIQUE INDEX translation_keys_user_id_namespace_key_key ON public.translation_keys USING btree (key, namespace, user_id);
ALTER TABLE "public"."user_aliases" ADD FOREIGN KEY ("alias_id") REFERENCES "public"."style_aliases"("id");
ALTER TABLE "public"."user_aliases" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_d9d1cde77cac5f8e90f45ac7cb7" ON public.user_aliases USING btree (id);
CREATE UNIQUE INDEX "UQ_4f813c49329afad212db1d8def4" ON public.user_aliases USING btree (user_id);
CREATE UNIQUE INDEX "UQ_54d6679d5e1e061b50025113781" ON public.user_aliases USING btree (short_key);
CREATE UNIQUE INDEX user_aliases_user_id_short_key_key ON public.user_aliases USING btree (short_key, user_id);
ALTER TABLE "public"."user_global_styles" ADD FOREIGN KEY ("theme_id") REFERENCES "public"."user_themes"("id");
ALTER TABLE "public"."user_global_styles" ADD FOREIGN KEY ("variant_type_id") REFERENCES "public"."global_style_variant_types"("id");


-- Indices
CREATE UNIQUE INDEX "PK_a3f05e8cf0178da02449783ed47" ON public.user_global_styles USING btree (id);
CREATE UNIQUE INDEX "UQ_185e624a4bc39128ec476a0ac5e" ON public.user_global_styles USING btree (theme_id);
CREATE UNIQUE INDEX "UQ_249aa6698b54cf1a9fe540df998" ON public.user_global_styles USING btree (variant_type_id);
CREATE UNIQUE INDEX "UQ_077737d041e870609202c619e73" ON public.user_global_styles USING btree (variant_key);
CREATE UNIQUE INDEX user_global_styles_theme_id_variant_type_id_variant_key_key ON public.user_global_styles USING btree (theme_id, variant_key, variant_type_id);
CREATE INDEX idx_user_global_styles_theme_variant ON public.user_global_styles USING btree (theme_id, variant_type_id);
ALTER TABLE "public"."user_languages" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_a98f4f961abaede9204f3b1dc7b" ON public.user_languages USING btree (id);
CREATE UNIQUE INDEX "UQ_1f9e6f03b56e66eee864aa6af95" ON public.user_languages USING btree (user_id);
CREATE UNIQUE INDEX "UQ_b73360f8c84f8d6b3ea1a1c8786" ON public.user_languages USING btree (locale_code);
CREATE UNIQUE INDEX user_languages_user_id_locale_code_key ON public.user_languages USING btree (locale_code, user_id);
ALTER TABLE "public"."user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_8acd5cf26ebd158416f477de799" ON public.user_roles USING btree (id);
CREATE UNIQUE INDEX "UQ_87b8888186ca9769c960e926870" ON public.user_roles USING btree (user_id);
CREATE UNIQUE INDEX "UQ_b23c65e50a758245a33ee35fda1" ON public.user_roles USING btree (role_id);
CREATE UNIQUE INDEX user_roles_user_id_role_id_key ON public.user_roles USING btree (role_id, user_id);


-- Indices
CREATE UNIQUE INDEX "PK_a7f03557052702289be59158609" ON public.user_status_catalog USING btree (id);
CREATE UNIQUE INDEX "UQ_60e4cceeaa4275065ed34c4bd53" ON public.user_status_catalog USING btree (name);
CREATE UNIQUE INDEX user_status_catalog_name_key ON public.user_status_catalog USING btree (name);
ALTER TABLE "public"."user_theme_tokens" ADD FOREIGN KEY ("user_token_id") REFERENCES "public"."user_tokens"("id");
ALTER TABLE "public"."user_theme_tokens" ADD FOREIGN KEY ("theme_id") REFERENCES "public"."user_themes"("id");


-- Indices
CREATE UNIQUE INDEX "PK_d2f2065ba80f17c95ef811cc019" ON public.user_theme_tokens USING btree (id);
CREATE UNIQUE INDEX "UQ_a6050543d5e5da1a9d7bfbbb7a4" ON public.user_theme_tokens USING btree (theme_id);
CREATE UNIQUE INDEX "UQ_28ab1c7a91d0ba22d0abeb90563" ON public.user_theme_tokens USING btree (user_token_id);
CREATE UNIQUE INDEX user_theme_tokens_theme_id_user_token_id_key ON public.user_theme_tokens USING btree (theme_id, user_token_id);
ALTER TABLE "public"."user_themes" ADD FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id");
ALTER TABLE "public"."user_themes" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_8945097dae90f61b5558f3f9e96" ON public.user_themes USING btree (id);
ALTER TABLE "public"."user_tokens" ADD FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id");
ALTER TABLE "public"."user_tokens" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."user_tokens" ADD FOREIGN KEY ("base_token_id") REFERENCES "public"."token_definitions"("id");
ALTER TABLE "public"."user_tokens" ADD FOREIGN KEY ("category_id") REFERENCES "public"."token_categories"("id");


-- Indices
CREATE UNIQUE INDEX "PK_63764db9d9aaa4af33e07b2f4bf" ON public.user_tokens USING btree (id);
CREATE UNIQUE INDEX "UQ_9e144a67be49e5bba91195ef5de" ON public.user_tokens USING btree (user_id);
CREATE UNIQUE INDEX "UQ_8c1787a4fc3b9f5ec1f3fedcc28" ON public.user_tokens USING btree (category_id);
CREATE UNIQUE INDEX "UQ_6a9964c4b6be00ae55eaae667f5" ON public.user_tokens USING btree (token_key);
CREATE UNIQUE INDEX user_tokens_user_id_category_id_token_key_key ON public.user_tokens USING btree (category_id, token_key, user_id);
ALTER TABLE "public"."user_translations" ADD FOREIGN KEY ("key_id") REFERENCES "public"."translation_keys"("id") ON DELETE CASCADE;
ALTER TABLE "public"."user_translations" ADD FOREIGN KEY ("language_id") REFERENCES "public"."user_languages"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX "PK_35f97f7c0e4322a7a16ed598f5e" ON public.user_translations USING btree (id);
CREATE UNIQUE INDEX "UQ_700452c396ceeb236c2d5386916" ON public.user_translations USING btree (key_id);
CREATE UNIQUE INDEX "UQ_8c224e431bcf2c33ed3a959795d" ON public.user_translations USING btree (language_id);
CREATE INDEX idx_user_translations_key_lang ON public.user_translations USING btree (key_id, language_id);
CREATE UNIQUE INDEX user_translations_key_id_language_id_key ON public.user_translations USING btree (key_id, language_id);
ALTER TABLE "public"."users" ADD FOREIGN KEY ("status_id") REFERENCES "public"."user_status_catalog"("id");


-- Indices
CREATE UNIQUE INDEX "PK_a3ffb1c0c8416b9fc6f907b7433" ON public.users USING btree (id);
CREATE UNIQUE INDEX "UQ_fe0bb3f6520ee0469504521e710" ON public.users USING btree (username);
CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON public.users USING btree (email);
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

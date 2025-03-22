
DO $$ DECLARE
    r RECORD;
BEGIN
    
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE aliases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE, 
    property VARCHAR(50) NOT NULL,    
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE token_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE, 
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE token_group_aliases (
    token_group_id UUID REFERENCES token_groups(id) NOT NULL,
    alias_id UUID REFERENCES aliases(id) NOT NULL,
    PRIMARY KEY (token_group_id, alias_id)
);


CREATE TABLE default_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_group_id UUID REFERENCES token_groups(id) NOT NULL,
    token_key VARCHAR(255) NOT NULL,       
    token_value VARCHAR(255) NOT NULL,     
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(token_group_id, token_key)
);


CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    max_apps INTEGER NOT NULL,
    max_features INTEGER NOT NULL,
    max_screens_per_feature INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id) NOT NULL,
    plan_id UUID REFERENCES plans(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE theme_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_id UUID REFERENCES themes(id) NOT NULL,
    token_group_id UUID REFERENCES token_groups(id) NOT NULL,
    token_key VARCHAR(255) NOT NULL,
    token_value VARCHAR(255) NOT NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(theme_id, token_group_id, token_key)
);


CREATE TABLE custom_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_id UUID REFERENCES themes(id) NOT NULL,
    user_id UUID REFERENCES users(id),
    token_group_id UUID REFERENCES token_groups(id) NOT NULL,
    token_key VARCHAR(255) NOT NULL,
    token_value VARCHAR(255) NOT NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(theme_id, user_id, token_group_id, token_key)
);


CREATE TABLE statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status_id UUID REFERENCES statuses(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


CREATE TABLE feature_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feature_id UUID REFERENCES features(id) NOT NULL,
    version VARCHAR(255) NOT NULL,
    replaces_feature_id UUID REFERENCES features(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE screens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feature_version_id UUID REFERENCES feature_versions(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    route_name VARCHAR(255),
    preload BOOLEAN DEFAULT FALSE,
    status_id UUID REFERENCES statuses(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE screen_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    screen_id UUID REFERENCES screens(id) NOT NULL,
    version VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE component_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE global_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_type_id UUID REFERENCES component_types(id) NOT NULL,
    default_props JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE translation_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id),
    key VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(application_id, key)
);


CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE translation_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    translation_key_id UUID REFERENCES translation_keys(id) NOT NULL,
    language_id UUID REFERENCES languages(id) NOT NULL,
    translation_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(translation_key_id, language_id)
);


CREATE TABLE screen_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    screen_version_id UUID REFERENCES screen_versions(id) NOT NULL,
    global_component_id UUID REFERENCES global_components(id) NOT NULL,
    props JSONB,
    translation_key_id UUID REFERENCES translation_keys(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    persist_config JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reducers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    initial_state JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reducer_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reducer_id UUID REFERENCES reducers(id) NOT NULL,
    action_name VARCHAR(255) NOT NULL,
    action_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE field_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE form_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    screen_component_id UUID REFERENCES screen_components(id) NOT NULL,
    field_type_id UUID REFERENCES field_types(id) NOT NULL,
    label VARCHAR(255) NOT NULL,
    placeholder VARCHAR(255),
    required BOOLEAN DEFAULT FALSE,
    props JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE validation_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE form_field_validations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_field_id UUID REFERENCES form_fields(id) NOT NULL,
    validation_type_id UUID REFERENCES validation_types(id) NOT NULL,
    validation_value VARCHAR(255),
    validation_message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE global_styles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_id UUID REFERENCES themes(id) NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(theme_id, name)
);


CREATE TABLE global_style_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_style_id UUID REFERENCES global_styles(id) NOT NULL,
    variant_name VARCHAR(50) NOT NULL,
    properties JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(global_style_id, variant_name)
);

-- EXTENSIONES BASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AJUSTES APLICADOS SOBRE LA BASE ORIGINAL

-- Aplicaciones con bundle_id
ALTER TABLE applications ADD COLUMN bundle_id VARCHAR(255) UNIQUE;

-- Usuarios con soporte a clientes multiusuario
ALTER TABLE users ADD COLUMN client_id UUID;

-- Features con flag de precarga
ALTER TABLE features ADD COLUMN preloaded BOOLEAN DEFAULT FALSE;

-- Componentes con eventos interpretables
ALTER TABLE screen_components ADD COLUMN events JSONB;

-- NUEVAS TABLAS

-- Licencias por app y bundle_id
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    key VARCHAR(255) NOT NULL UNIQUE,
    bundle_id VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP,
    user_limit INTEGER,
    status_id UUID REFERENCES statuses(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configuración iOS
CREATE TABLE ios_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id),
    display_name VARCHAR(255),
    bundle_id VARCHAR(255),
    provisioning_profile TEXT,
    p12_cert TEXT,
    entitlements JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configuración Android
CREATE TABLE android_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id),
    display_name VARCHAR(255),
    bundle_id VARCHAR(255),
    keystore_file TEXT,
    keystore_password TEXT,
    package_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Solicitudes de build
CREATE TABLE build_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) NOT NULL,
    platform VARCHAR(20), -- 'ios' o 'android'
    status_id UUID REFERENCES statuses(id),
    license_id UUID REFERENCES licenses(id),
    version VARCHAR(50),
    config_snapshot JSONB,
    log_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscripciones por usuario
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    plan_id UUID REFERENCES plans(id) NOT NULL,
    status_id UUID REFERENCES statuses(id),
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

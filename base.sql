CREATE DATABASE accounting_system;

\c accounting_system;

-- Catálogos Simples
CREATE TABLE user_status (
    id_status SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE product_status (
    id_status SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE document_types (
    id_type SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE document_status (
    id_status SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE currencies (
    id_currency SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Entidades para Empresas, Sucursales y Bodegas
CREATE TABLE companies (
    id_company SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    tax_number VARCHAR(20),
    registration_number VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    parent_id INT,
    NRC VARCHAR(20),
    DUI VARCHAR(20),
    is_natural_person BOOLEAN,
    FOREIGN KEY (parent_id) REFERENCES companies(id_company)
);

CREATE TABLE giros (
    id_giro SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE companies_giros (
    id_company_giros SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    id_giro INT NOT NULL,
    level INT NOT NULL,
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    FOREIGN KEY (id_giro) REFERENCES giros(id_giro)
);

CREATE TABLE branches (
    id_branch SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (id_company) REFERENCES companies(id_company)
);

CREATE TABLE warehouses (
    id_warehouse SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location TEXT
);

-- Tabla intermedia para la relación muchos a muchos
CREATE TABLE branch_warehouses (
    id_branch INT NOT NULL,
    id_warehouse INT NOT NULL,
    PRIMARY KEY (id_branch, id_warehouse),
    FOREIGN KEY (id_branch) REFERENCES branches(id_branch),
    FOREIGN KEY (id_warehouse) REFERENCES warehouses(id_warehouse)
);

-- Entidades para Usuarios, Roles y Permisos
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    id_company INT,
    id_client_company INT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    status_id INT,
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    FOREIGN KEY (id_client_company) REFERENCES companies(id_company),
    FOREIGN KEY (status_id) REFERENCES user_status(id_status)
);

CREATE TABLE user_tokens (
    id_token SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE roles (
    id_role SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE permissions (
    id_permission SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE modules (
    id_module SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE user_roles (
    id_user_role SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_role INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_role) REFERENCES roles(id_role)
);

CREATE TABLE role_permissions (
    id_role_permission SERIAL PRIMARY KEY,
    id_role INT NOT NULL,
    id_permission INT NOT NULL,
    FOREIGN KEY (id_role) REFERENCES roles(id_role),
    FOREIGN KEY (id_permission) REFERENCES permissions(id_permission)
);

CREATE TABLE module_permissions (
    id_module_permission SERIAL PRIMARY KEY,
    id_module INT NOT NULL,
    id_permission INT NOT NULL,
    FOREIGN KEY (id_module) REFERENCES modules(id_module),
    FOREIGN KEY (id_permission) REFERENCES permissions(id_permission)
);

-- Entidades de Contabilidad e Inventarios
CREATE TABLE accounts (
    id_account SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    parent_account_id INT NULL, -- Aquí está la relación recursiva
    account_number VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    account_type VARCHAR(50) NOT NULL, -- activo, pasivo, capital, ingreso, gasto
    level INT NOT NULL DEFAULT 1, -- Nivel jerárquico en el árbol para facilitar UI/reportes
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    FOREIGN KEY (parent_account_id) REFERENCES accounts(id_account)
);

CREATE TABLE fiscal_periods (
    id_period SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_company) REFERENCES companies(id_company)
);

CREATE TABLE journal_entries (
    id_journal_entry SERIAL PRIMARY KEY,
    id_company INT NOT NULL REFERENCES companies(id_company),
    id_branch INT NOT NULL REFERENCES branches(id_branch),
    entry_date DATE NOT NULL,
    description TEXT NOT NULL,
    id_currency INT NOT NULL REFERENCES currencies(id_currency),
    exchange_rate DECIMAL(12,4) NOT NULL DEFAULT 1.00,
    id_fiscal_period INT NOT NULL REFERENCES fiscal_periods(id_period),
    id_document_type INT NOT NULL REFERENCES document_types(id_type),
    id_document_reference INT NULL, -- Puede apuntar a facturas, compras, movimientos inventario, etc.
    total_debits DECIMAL(14,2),
    total_credits DECIMAL(14,2),
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INT REFERENCES users(id_user)
);

CREATE TABLE journal_entry_details (
    id_journal_entry_detail SERIAL PRIMARY KEY,
    id_journal_entry INT NOT NULL REFERENCES journal_entries(id_journal_entry),
    id_account INT NOT NULL REFERENCES accounts(id_account),
    debit DECIMAL(14,2) DEFAULT 0.00,
    credit DECIMAL(14,2) DEFAULT 0.00,
    description TEXT NULL
);

CREATE TABLE ledgers (
    id_ledger SERIAL PRIMARY KEY,
    id_account INT NOT NULL REFERENCES accounts(id_account),
    id_company INT NOT NULL REFERENCES companies(id_company),
    id_fiscal_period INT NOT NULL REFERENCES fiscal_periods(id_period),
    debit DECIMAL(14,2),
    credit DECIMAL(14,2),
    balance DECIMAL(14,2),
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Clientes y Proveedores
CREATE TABLE clients (
    id_client SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    tax_number VARCHAR(20),
    registration_number VARCHAR(20),
    NRC VARCHAR(20),
    DUI VARCHAR(20),
    is_natural_person BOOLEAN,
    FOREIGN KEY (id_company) REFERENCES companies(id_company)
);

CREATE TABLE providers (
    id_provider SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    tax_number VARCHAR(20),
    registration_number VARCHAR(20),
    FOREIGN KEY (id_company) REFERENCES companies(id_company)
);

-- Productos e Inventario
CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    id_company INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    unit_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    product_status_id INT,
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    FOREIGN KEY (product_status_id) REFERENCES product_status(id_status)
);

CREATE TABLE inventory_movements (
    id_inventory_movement SERIAL PRIMARY KEY,
    id_product INT NOT NULL,
    id_warehouse INT NOT NULL,
    movement_type VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10, 2),
    date TIMESTAMP NOT NULL,
    reference VARCHAR(100),
    id_user INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_warehouse) REFERENCES warehouses(id_warehouse),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Ventas, Facturas, Cotizaciones y Compras
CREATE TABLE sales_orders (
    id_sales_order SERIAL PRIMARY KEY,
    id_branch INT NOT NULL,
    id_client INT NOT NULL,
    order_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status_id INT,
    id_user INT NOT NULL,
    FOREIGN KEY (id_branch) REFERENCES branches(id_branch),
    FOREIGN KEY (id_client) REFERENCES clients(id_client),
    FOREIGN KEY (status_id) REFERENCES document_status(id_status),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE sales_order_details (
    id_detail SERIAL PRIMARY KEY,
    id_sales_order INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_sales_order) REFERENCES sales_orders(id_sales_order),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);

CREATE TABLE invoices (
    id_invoice SERIAL PRIMARY KEY,
    id_sales_order INT,
    id_branch INT NOT NULL,
    id_client INT NOT NULL,
    invoice_number VARCHAR(50) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    id_document_type INT NOT NULL,
    id_document_status INT NOT NULL,
    id_currency INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_sales_order) REFERENCES sales_orders(id_sales_order),
    FOREIGN KEY (id_branch) REFERENCES branches(id_branch),
    FOREIGN KEY (id_client) REFERENCES clients(id_client),
    FOREIGN KEY (id_document_type) REFERENCES document_types(id_type),
    FOREIGN KEY (id_document_status) REFERENCES document_status(id_status),
    FOREIGN KEY (id_currency) REFERENCES currencies(id_currency)
);

CREATE TABLE invoice_details (
    id_invoice_detail SERIAL PRIMARY KEY,
    id_invoice INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_invoice) REFERENCES invoices(id_invoice),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);

CREATE TABLE purchases (
    id_purchase SERIAL PRIMARY KEY,
    id_branch INT NOT NULL,
    id_provider INT NOT NULL,
    purchase_date DATE NOT NULL,
    invoice_number VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status_id INT,
    id_user INT NOT NULL,
    FOREIGN KEY (id_branch) REFERENCES branches(id_branch),
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider),
    FOREIGN KEY (status_id) REFERENCES document_status(id_status),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE purchase_details (
    id_purchase_detail SERIAL PRIMARY KEY,
    id_purchase INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_purchase) REFERENCES purchases(id_purchase),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);

-- Registro histórico de acciones
CREATE TABLE system_logs (
    id_log SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT,
    log_date TIMESTAMP NOT NULL,
    ip_address VARCHAR(50),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Taxonomías
CREATE TABLE taxonomies (
    id_taxonomy SERIAL PRIMARY KEY,
    id_company INT NOT NULL REFERENCES companies(id_company),
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE taxonomy_terms (
    id_term SERIAL PRIMARY KEY,
    id_taxonomy INT NOT NULL REFERENCES taxonomies(id_taxonomy),
    parent_term_id INT NULL REFERENCES taxonomy_terms(id_term),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE product_taxonomy_terms (
    id_product INT NOT NULL REFERENCES products(id_product),
    id_term INT NOT NULL REFERENCES taxonomy_terms(id_term),
    PRIMARY KEY (id_product, id_term)
);

-- Variaciones
CREATE TABLE variation_attributes (
    id_attribute SERIAL PRIMARY KEY,
    id_company INT NOT NULL REFERENCES companies(id_company),
    name VARCHAR(50) NOT NULL
);

CREATE TABLE variation_attribute_values (
    id_attribute_value SERIAL PRIMARY KEY,
    id_attribute INT NOT NULL REFERENCES variation_attributes(id_attribute),
    value VARCHAR(50) NOT NULL
);

CREATE TABLE product_variations (
    id_variation SERIAL PRIMARY KEY,
    id_product INT NOT NULL REFERENCES products(id_product),
    sku VARCHAR(50) UNIQUE NOT NULL,
    additional_price DECIMAL(10,2) DEFAULT 0.00
);

CREATE TABLE variation_attribute_combinations (
    id_variation INT NOT NULL REFERENCES product_variations(id_variation),
    id_attribute_value INT NOT NULL REFERENCES variation_attribute_values(id_attribute_value),
    PRIMARY KEY (id_variation, id_attribute_value)
);

CREATE TABLE variation_attribute_values (
    id_attribute_value SERIAL PRIMARY KEY,
    id_attribute INT NOT NULL REFERENCES variation_attributes(id_attribute),
    value VARCHAR(50) NOT NULL
);

-- Ajuste Kardex (Opcional pero recomendado)
ALTER TABLE inventory_movements ADD COLUMN id_variation INT NULL REFERENCES product_variations(id_variation);

ALTER TABLE inventory_movements ADD COLUMN id_variation INT NULL REFERENCES product_variations(id_variation);

-- para ventas:
ALTER TABLE sales_order_details ADD COLUMN id_variation INT NULL REFERENCES product_variations(id_variation);

ALTER TABLE invoice_details ADD COLUMN id_variation INT NULL REFERENCES product_variations(id_variation);

-- para compras:
ALTER TABLE purchase_details ADD COLUMN id_variation INT NULL REFERENCES product_variations(id_variation);

ALTER TABLE products ADD COLUMN has_variations BOOLEAN NOT NULL DEFAULT FALSE;

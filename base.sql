CREATE DATABASE accounting_system;

\c accounting_system;

-- Entidades para Usuarios, Roles y Permisos
CREATE TABLE users (
	id_user SERIAL PRIMARY KEY,
	id_company INT,
	id_client_company INT,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	status_id INT
);

CREATE TABLE user_tokens (
	id_token SERIAL PRIMARY KEY,
	id_user INT NOT NULL,
	token VARCHAR(255) NOT NULL,
	expires_at TIMESTAMP NOT NULL
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
	id_role INT NOT NULL
);

CREATE TABLE role_permissions (
	id_role_permission SERIAL PRIMARY KEY,
	id_role INT NOT NULL,
	id_permission INT NOT NULL
);

CREATE TABLE module_permissions (
	id_module_permission SERIAL PRIMARY KEY,
	id_module INT NOT NULL,
	id_permission INT NOT NULL
);

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

-- Entidades para Empresas, Sucursales y Bodegas
CREATE TABLE companies (
	id_company SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	address TEXT,
	tax_number VARCHAR(20),
	registration_number VARCHAR(20),
	phone VARCHAR(20),
	email VARCHAR(100)
);

CREATE TABLE branches (
	id_branch SERIAL PRIMARY KEY,
	id_company INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	address TEXT,
	phone VARCHAR(20),
	email VARCHAR(100)
);

CREATE TABLE warehouses (
	id_warehouse SERIAL PRIMARY KEY,
	id_branch INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	location TEXT
);

-- Entidades de Contabilidad e Inventarios
CREATE TABLE accounts (
	id_account SERIAL PRIMARY KEY,
	id_company INT NOT NULL,
	account_number VARCHAR(20) NOT NULL,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	account_type VARCHAR(20) NOT NULL
);

CREATE TABLE fiscal_periods (
	id_period SERIAL PRIMARY KEY,
	id_company INT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	status VARCHAR(20) NOT NULL
);

CREATE TABLE currencies (
	id_currency SERIAL PRIMARY KEY,
	code VARCHAR(10) NOT NULL,
	name VARCHAR(50) NOT NULL
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
	registration_number VARCHAR(20)
);

CREATE TABLE providers (
	id_provider SERIAL PRIMARY KEY,
	id_company INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	address TEXT,
	email VARCHAR(100),
	phone VARCHAR(20),
	tax_number VARCHAR(20),
	registration_number VARCHAR(20)
);

-- Productos e Inventario
CREATE TABLE products (
	id_product SERIAL PRIMARY KEY,
	id_company INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	unit_price DECIMAL(10, 2),
	cost_price DECIMAL(10, 2),
	product_status_id INT
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
	id_user INT NOT NULL
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
	id_user INT NOT NULL
);

CREATE TABLE sales_order_details (
	id_detail SERIAL PRIMARY KEY,
	id_sales_order INT NOT NULL,
	id_product INT NOT NULL,
	quantity INT NOT NULL,
	unit_price DECIMAL(10, 2) NOT NULL,
	subtotal DECIMAL(10, 2) NOT NULL
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
	total_amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE invoice_details (
	id_invoice_detail SERIAL PRIMARY KEY,
	id_invoice INT NOT NULL,
	id_product INT NOT NULL,
	quantity INT NOT NULL,
	unit_price DECIMAL(10, 2) NOT NULL,
	subtotal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE purchases (
	id_purchase SERIAL PRIMARY KEY,
	id_branch INT NOT NULL,
	id_provider INT NOT NULL,
	purchase_date DATE NOT NULL,
	invoice_number VARCHAR(50) NOT NULL,
	total_amount DECIMAL(10, 2) NOT NULL,
	status_id INT,
	id_user INT NOT NULL
);

CREATE TABLE purchase_details (
	id_purchase_detail SERIAL PRIMARY KEY,
	id_purchase INT NOT NULL,
	id_product INT NOT NULL,
	quantity INT NOT NULL,
	unit_cost DECIMAL(10, 2) NOT NULL,
	subtotal DECIMAL(10, 2) NOT NULL
);

-- Registro histórico de acciones
CREATE TABLE system_logs (
	id_log SERIAL PRIMARY KEY,
	id_user INT NOT NULL,
	action VARCHAR(100) NOT NULL,
	module VARCHAR(50) NOT NULL,
	description TEXT,
	log_date TIMESTAMP NOT NULL,
	ip_address VARCHAR(50)
);
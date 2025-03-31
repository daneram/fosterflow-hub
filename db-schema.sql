-- FosterFlow Hub PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  cognito_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(50),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files table (for S3 objects)
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  original_name VARCHAR(255) NOT NULL,
  s3_key VARCHAR(512) NOT NULL,
  content_type VARCHAR(255),
  size_bytes BIGINT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Records table
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  record_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  priority VARCHAR(50),
  completeness INTEGER DEFAULT 0,
  owner_id UUID REFERENCES users(id),
  compliance VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client-Records relationship (many-to-many)
CREATE TABLE client_records (
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  record_id UUID REFERENCES records(id) ON DELETE CASCADE,
  PRIMARY KEY (client_id, record_id)
);

-- Record Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Record-Tags relationship (many-to-many)
CREATE TABLE record_tags (
  record_id UUID REFERENCES records(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, tag_id)
);

-- Record-Files relationship (many-to-many)
CREATE TABLE record_files (
  record_id UUID REFERENCES records(id) ON DELETE CASCADE,
  file_id UUID REFERENCES files(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, file_id)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_name ON clients(last_name, first_name);
CREATE INDEX idx_records_type ON records(type);
CREATE INDEX idx_records_status ON records(status);
CREATE INDEX idx_files_user_id ON files(user_id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables with updated_at
CREATE TRIGGER update_users_modtime
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_clients_modtime
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_files_modtime
  BEFORE UPDATE ON files
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_records_modtime
  BEFORE UPDATE ON records
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Insert some initial tags
INSERT INTO tags (name) VALUES
  ('urgent'),
  ('important'),
  ('review'),
  ('confidential'),
  ('completed'),
  ('pending'),
  ('requires-signature'),
  ('legal'),
  ('medical'),
  ('education'),
  ('housing'),
  ('financial'),
  ('placement'),
  ('authority'),
  ('disruption'); 
import db from './db';

async function runMigrations() {
  try {
    console.log('Creating database tables...');

    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created users table.');

    // Projects table
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image LONGTEXT,
        category VARCHAR(100),
        price VARCHAR(50),
        visits VARCHAR(50),
        status VARCHAR(50) DEFAULT 'متاح',
        features JSON,
        gallery JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Ensure LONGTEXT even if table existed
    await db.query('ALTER TABLE projects MODIFY COLUMN image LONGTEXT');
    await db.query('ALTER TABLE projects MODIFY COLUMN gallery JSON'); // Keep JSON for the array but items will be long base64 strings
    console.log('Created/Updated projects table.');

    // Messages table
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created messages table.');

    console.log('All migrations completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();

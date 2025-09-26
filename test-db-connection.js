const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env file manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const mongoUri = envContent.match(/MONGODB_URI\s*=\s*(.+)/)[1].trim();

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log('Connection string:', mongoUri);
  
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Test query on owners collection
    const ownersCount = await mongoose.connection.db.collection('owners').countDocuments();
    console.log(`\nOwners collection has ${ownersCount} documents`);
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\nPossible issues:');
      console.error('1. Check if username and password are correct');
      console.error('2. Verify the user exists in MongoDB Atlas');
      console.error('3. Check if the user has proper database permissions');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\nPossible issues:');
      console.error('1. Check your internet connection');
      console.error('2. Verify the MongoDB Atlas cluster URL is correct');
    }
    
    if (error.message.includes('whitelist')) {
      console.error('\nPossible issues:');
      console.error('1. Your IP address might not be whitelisted in MongoDB Atlas');
      console.error('2. Go to MongoDB Atlas > Network Access and add your current IP');
    }
    
    process.exit(1);
  }
}

testConnection();
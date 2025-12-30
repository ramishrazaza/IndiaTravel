#!/usr/bin/env node

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const readline = require('readline');
const path = require('path');

// Import Admin model
const Admin = require(path.join(__dirname, '../models/Admin'));

// Database connection string
const MONGO_URI = 'mongodb://localhost:27017/indiatravel';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
};

async function createAdmin() {
    try {
        console.log('\n========================================');
        console.log('   India Travel - Create Admin User');
        console.log('========================================\n');

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✓ Connected to MongoDB\n');

        // Get admin details
        const username = await question('Username: ');
        const email = await question('Email: ');
        const password = await question('Password: ');
        const passwordConfirm = await question('Confirm Password: ');
        const fullName = await question('Full Name: ');
        const role = await question('Role (admin/superadmin) [admin]: ') || 'admin';

        // Validate inputs
        if (!username || !email || !password || !fullName) {
            console.log('\n✗ Error: All fields are required!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        if (password !== passwordConfirm) {
            console.log('\n✗ Error: Passwords do not match!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        if (!['admin', 'superadmin'].includes(role)) {
            console.log('\n✗ Error: Role must be either "admin" or "superadmin"!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingAdmin) {
            console.log('\n✗ Error: Admin with this username or email already exists!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        // Create new admin
        const newAdmin = new Admin({
            username,
            email,
            password,
            fullName,
            role,
            isActive: true
        });

        await newAdmin.save();
        console.log('\n✓ Admin user created successfully!');
        console.log('\nDetails:');
        console.log(`  Username: ${username}`);
        console.log(`  Email: ${email}`);
        console.log(`  Full Name: ${fullName}`);
        console.log(`  Role: ${role}`);
        console.log(`  Status: Active`);

        rl.close();
        await mongoose.connection.close();
        console.log('\n✓ Disconnected from MongoDB\n');
        process.exit(0);

    } catch (error) {
        console.error('\n✗ Error:', error.message);
        console.error('Stack:', error.stack);
        rl.close();
        try {
            await mongoose.connection.close();
        } catch (e) {
            // ignore
        }
        process.exit(1);
    }
}

// Run the script
createAdmin();

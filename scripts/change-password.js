#!/usr/bin/env node

const mongoose = require('mongoose');
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

async function changePassword() {
    try {
        console.log('\n========================================');
        console.log('   India Travel - Change Admin Password');
        console.log('========================================\n');

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✓ Connected to MongoDB\n');

        // Get admin username/email
        const identifier = await question('Enter username or email: ');

        // Find admin
        const admin = await Admin.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });

        if (!admin) {
            console.log('\n✗ Error: Admin user not found!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        console.log(`\n✓ Found admin: ${admin.fullName}\n`);

        // Verify old password
        const oldPassword = await question('Enter current password: ');
        const isPasswordValid = await admin.comparePassword(oldPassword);

        if (!isPasswordValid) {
            console.log('\n✗ Error: Current password is incorrect!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        // Get new password
        const newPassword = await question('Enter new password: ');
        const confirmPassword = await question('Confirm new password: ');

        if (newPassword !== confirmPassword) {
            console.log('\n✗ Error: Passwords do not match!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        if (newPassword.length < 6) {
            console.log('\n✗ Error: Password must be at least 6 characters long!');
            rl.close();
            await mongoose.connection.close();
            process.exit(1);
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        console.log('\n✓ Password changed successfully!');
        console.log(`\nAdmin: ${admin.fullName}`);
        console.log('Username:', admin.username);
        console.log('Status: Active');

        rl.close();
        await mongoose.connection.close();
        console.log('\n✓ Disconnected from MongoDB\n');
        process.exit(0);

    } catch (error) {
        console.error('\n✗ Error:', error.message);
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
changePassword();

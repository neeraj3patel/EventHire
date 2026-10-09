import { connectDB, disconnectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { Admin } from '../models/admin.model.js';

const seedAdmin = async () => {
  const adminName = env.ADMIN_NAME || 'Super Admin';
  const adminEmail = env.ADMIN_EMAIL || 'admin@automaxengineers.com';
  const adminPassword = env.ADMIN_PASSWORD || 'Admin@12345';

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
  }

  await connectDB();

  const admin = await Admin.findOneAndUpdate(
    { email: adminEmail },
    {
      $set: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  console.log(`Admin seed complete: ${admin.email}`);
  await disconnectDB();
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Admin seed failed:', error.message || error);
    process.exit(1);
  });

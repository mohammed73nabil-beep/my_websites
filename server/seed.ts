import db from './db';
import bcrypt from 'bcryptjs';

async function runSeeder() {
  try {
    console.log('Seeding database...');

    // Check if admin user exists
    const [users]: any = await db.query('SELECT * FROM users WHERE email = ?', ['admin@luxeweb.com']);
    
    if (users.length === 0) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['المدير العام', 'admin@luxeweb.com', hashedPassword, 'admin']
      );
      console.log('Admin user created (admin@luxeweb.com / admin123).');
    } else {
      console.log('Admin user already exists.');
    }

    // Check if projects exist
    const [projects]: any = await db.query('SELECT COUNT(*) as count FROM projects');
    if (projects[0].count === 0) {
      // Seed some dummy projects based on frontend MOCK_PROJECTS
      const mockProjects = [
        {
          title: 'أورا - متجر إلكتروني فاخر',
          description: 'نموذج متجر إلكتروني مصمم خصيصاً للعلامات التجارية الفاخرة، العطور، والمجوهرات.',
          image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000',
          category: 'متجر إلكتروني',
          price: '$5,000',
          visits: '10K',
          status: 'متاح',
          features: JSON.stringify(['تصميم متجاوب بالكامل', 'لوحة تحكم احترافية', 'نظام سلة مشتريات متقدم']),
          gallery: JSON.stringify([
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
          ])
        },
        {
          title: 'إيليت - موقع شركة عقارية',
          description: 'واجهة رقمية فخمة للشركات العقارية لعرض العقارات الفاخرة والمشاريع الحصرية.',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
          category: 'موقع شركة',
          price: '$3,500',
          visits: '5K',
          status: 'تحت المراجعة',
          features: JSON.stringify(['معرض صور عالي الدقة', 'نظام فلترة للعقارات', 'نموذج حجز استشارة']),
          gallery: JSON.stringify([
             'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
          ])
        }
      ];

      for (const p of mockProjects) {
        await db.query(
          'INSERT INTO projects (title, description, image, category, price, visits, status, features, gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.title, p.description, p.image, p.category, p.price, p.visits, p.status, p.features, p.gallery]
        );
      }
      console.log('Dummy projects seeded.');
    } else {
        console.log('Projects already exist, skipping project seed.');
    }

    console.log('Database seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

runSeeder();

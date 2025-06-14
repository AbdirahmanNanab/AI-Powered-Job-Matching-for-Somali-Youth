require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load models
const User = require('./models/User');
const Job = require('./models/Job');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  seed();
}).catch((err) => console.error('Mongo error', err));

// Manual mock data
const users = [
  // Job Seekers
  {
    name: 'Ali Yusuf',
    email: 'aliyusuf@example.com',
    password: 'password123',
    role: 'seeker',
    profile: {
      skills: ['JavaScript', 'React', 'Node.js'],
      bio: 'Junior developer from Mogadishu',
    }
  },
  {
    name: 'Fadumo Hassan',
    email: 'fadumo@example.com',
    password: 'password123',
    role: 'seeker',
    profile: {
      skills: ['Python', 'Data Science', 'TensorFlow'],
      bio: 'AI enthusiast',
    }
  },

  // Employers
  {
    name: 'SomTech Ltd',
    email: 'hr@somtech.com',
    password: 'password123',
    role: 'employer',
  },
  {
    name: 'MogDev Solutions',
    email: 'jobs@mogdev.so',
    password: 'password123',
    role: 'employer',
  },

  // Admins
  {
    name: 'System Admin',
    email: 'admin@aijob.so',
    password: 'admin123',
    role: 'admin',
  }
];

const jobs = [
  {
    title: 'Frontend Developer',
    description: 'Looking for React developer to join our team.',
    employerEmail: 'hr@somtech.com'
  },
  {
    title: 'Machine Learning Intern',
    description: 'AI intern with Python & TensorFlow knowledge.',
    employerEmail: 'jobs@mogdev.so'
  }
];

async function seed() {
  try {
    await User.deleteMany({});
    await Job.deleteMany({});

    const userMap = {};

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({
        ...user,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      userMap[user.email] = savedUser._id;
    }

    for (const job of jobs) {
      const newJob = new Job({
        title: job.title,
        description: job.description,
        employerId: userMap[job.employerEmail],
        applicants: [],
        shortlisted: [],
      });
      await newJob.save();
    }

    console.log('✅ Mock data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (whitelist.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-No-CSRF'],
  credential: true
}

export default corsOptions;
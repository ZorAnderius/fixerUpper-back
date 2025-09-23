const whitelist = ['http://localhost:3000', 'http://localhost:5180', 'http://localhost:5180'];

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
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  credentials: true
}

export default corsOptions;
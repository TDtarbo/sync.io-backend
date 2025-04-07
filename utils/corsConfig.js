const allowedOrigins = [
    process.env.FRONT_END
]

const allowedHeaders = [
    'Content-Type',
    'Authorization',
    'Cookie'
]

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: allowedHeaders
}

export {corsOptions, allowedOrigins}
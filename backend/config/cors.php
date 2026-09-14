<?php

return [
    'paths'=> ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods'=> ['*'],
    'allowed_origins' => [
        'https://your-app.vercel.app',
        'http://localhost:5173', // keep for local dev
    ],
    'allowed_headers'=> ['*'],
    // 'supports_credentials'=> true
];

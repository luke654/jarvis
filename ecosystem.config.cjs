module.exports = {
  apps: [
    {
      name: 'jarvis-server',
      script: '/var/www/html/jarvis/current/server/index.js',
      cwd: '/var/www/html/jarvis/persistent',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
}

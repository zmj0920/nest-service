module.exports = {
  apps: [
    {
      name: 'nest-admin',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

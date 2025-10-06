module.exports = {
   apps: [
      {
         name: 'template-backend',
         script: 'dist/server.js',
         instances: 1, // Use all available CPU cores (max)
         exec_mode: 'fork', // Enable cluster mode for more CPU
         watch: false,
      },
   ],
}

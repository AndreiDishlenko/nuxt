module.exports = {
    apps: [
        {
            name: 'nuxtff.com',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: '.output/server/index.mjs',
            env: {
                NODE_ENV: 'production',
                NITRO_PORT: 3000,
                NITRO_HOST: '127.0.0.1'
            },
        }
    ]
}
  
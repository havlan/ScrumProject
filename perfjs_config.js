module.exports = {
    settings: {
        concurrency: 50,  // -c
        max_requests: 1000,  // -n
        output_format: 'json' // -o 'text' or 'json'
    },
    targets: {
        // can have multiple targets here
        // pick one using the --target commandline argument
        local: {
            host: 'localhost',
            port: 3000,
            path: '/getAbsenceNum',
            headers: {
                'X-Optional-Header': "header value"
            }
        },
        google: {
            host: 'www.google.com',
            port: 80,
            path: '/'
        }
    }
};
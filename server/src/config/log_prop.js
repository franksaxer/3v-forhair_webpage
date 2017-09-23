/* Properties */
const path_connections = __dirname + '/../../log/connections.log';

const options_bunyan = {
        name: 'connections',
        level: 'info',
        streams: [
        {
                type: 'rotating-file',
                level: 'trace',
                period: '1d',
                count: 14,
                path: path_connections
        },
        {
                stream: process.stderr
        }]
}


// Define what will be exported.
module.exports = {
        options_bunyan: options_bunyan
}

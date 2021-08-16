import {execSync} from 'child_process';

const githubCredsOutput = execSync('git credential fill', {
    input: 'url=https://github.com',
    stdio: ['pipe', 'pipe', 'inherit'],
    encoding: 'utf8'
});
const githubCreds = Object.fromEntries(githubCredsOutput.split('\n').map(line => line.match(/(.*?)=(.*)/)?.slice(1) as [string, string]).filter(v => v));
// const githubCreds = {
//     password: require('./secrets').password
// }

const _exports = {
    client: {
        service: {
            name: 'github',
            url: 'https://api.github.com/graphql',
            headers: {
                authorization: `Bearer ${githubCreds.password}`
            },
            // optional disable SSL validation check
            skipSSLValidation: true
        }
    }
};

export = _exports;

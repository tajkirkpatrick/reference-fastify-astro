var fs = require('fs');

function log(str: string): void {
    return console.log(`=> ${str}`);
}

const postbuild = () => {
    log('opening main.js');
    fs.readFile('dist/main.js', 'utf8', function (err: any, data: any) {
        try {
            log('replacing text');
            var formatted = data.replace(
                "require('../dist/server/entry.mjs')",
                "import('../dist/server/entry.mjs')"
            );
            log('replaced text, writing file');
            fs.writeFile(
                'dist/main.js',
                formatted,
                'utf8',
                function (err: any) {
                    if (err) return console.log(err);
                }
            );
            log('main.js written successfully');
        } catch (error) {
            console.log(error);
        }
    });
    return Promise.resolve();
};

postbuild().then(() => log('SUCCESS: replaced required imports on .mjs files'));

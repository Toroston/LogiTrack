import fs from 'fs';
console.info("Incrementing build number...");
fs.readFile('src/versioninfo.json', function (err, content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    metadata.build = metadata.build + 1;
    fs.writeFile('src/versioninfo.json', JSON.stringify(metadata), function (err) {
        if (err) throw err;
        console.info(`Current build number: ${metadata.major}.${metadata.minor}.${metadata.build}`);
    })
});
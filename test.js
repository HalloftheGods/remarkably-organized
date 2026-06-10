const { compressToEncodedURIComponent } = require('lz-string');
console.log(compressToEncodedURIComponent(JSON.stringify({ design: { themeId: 'test' } })));

import fs from 'fs';

const filePath = './src/lib/components/organisms/TopNav.organism.svelte';
let code = fs.readFileSync(filePath, 'utf-8');

console.log("TopNav loaded successfully.");

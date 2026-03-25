import path from 'path';
import fs from 'fs';

const dirname = import.meta.dirname;
console.log("Current Dir:", dirname);

const uploadsDir = path.join(dirname, 'public/uploads');
console.log("Joined Path (root):", uploadsDir);

const serverUtilsDir = path.join(dirname, 'server/utils');
const joinedFromUtils = path.join(serverUtilsDir, '../../public/uploads');
console.log("Joined Path (from utils):", joinedFromUtils);

console.log("Exists?", fs.existsSync(joinedFromUtils));

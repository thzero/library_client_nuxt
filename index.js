// Plugins
// import vue from '@vitejs/plugin-vue'
// import { splitVendorChunkPlugin } from 'vite'

// Utilities
// import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import fs from 'fs';
import path from 'path';

class library {
    init() {
      this.configEnv = process.env.NODE_ENV;
      console.log('vue.config.NODE_ENV', this.configEnv);
      const config = process.env._CONFIG;
      console.log('vue.config._CONFIG', config);
      if (config) {
        const filename = path.join(__dirname, `./src/config/${this.configEnv}.json`);
        console.log('vue.config.filename', filename);
        fs.writeFileSync(filename, config);
        const contents = fs.readFileSync(filename, 'utf8');
        console.log('vue.config.file', contents);
      }
      else
        this.configEnv = 'development';
      console.log('vue.config._CONFIG_ENV', this.configEnv);
      
      const dir = path.join(__dirname, 'node_modules', '@thzero');
      const dirs = fs.readdirSync(dir);
      
      console.log('\tOpenSource...');
      
      let file;
      const items = [];
      let data;
      for (const item of dirs) {
        try {
          file = path.join(dir, item, 'openSource.js');
          console.log(`\t${file}...`);
          if (!fs.existsSync(file)) {
            console.log('\t...not found.');
            continue;
          }
      
          data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
          // items.push(['@thzero', item, 'openSource.js'].join('/'));
          items.push(data.replace('export default', ''));
          console.log('\t...processed.');
        }
        catch (err) {
          console.log('\t...failed.', err);
        }
      }
      
      try {
        const openSourceJs = `/* eslint-disable */\n/* GENERATED FILE - DO NOT EDIT */\nexport function useDependenciesClientBase () { return [ ${items.join(`, `)} ]; }`;
        fs.writeFileSync(path.join(__dirname, 'openSource.js'), openSourceJs);
      } catch (err) {
        console.log(err);
      }
    }

    alias() { 
      return {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        'local-config': fileURLToPath(new URL(`./config/${this.configEnv}.json`, import.meta.url)),
        'open-source-config': fileURLToPath(new URL(`./openSource.js`, import.meta.url)),
      };
    }
}

export default new library();

// // Plugins
// // import vue from '@vitejs/plugin-vue'
// // import { splitVendorChunkPlugin } from 'vite'

// // Utilities
// // import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'node:url'

// import fs from 'fs';
// import path from 'path';

// class library {
//     configEnv: any;

//     init() {
//       this.configEnv = process.env.NODE_ENV;
//       console.log('vue.config.NODE_ENV', this.configEnv);
//       const config = process.env._CONFIG;
//       console.log('vue.config._CONFIG', config);
//       if (config) {
//         const filename = path.join(__dirname, `./src/config/${this.configEnv}.json`);
//         console.log('vue.config.filename', filename);
//         fs.writeFileSync(filename, config);
//         const contents = fs.readFileSync(filename, 'utf8');
//         console.log('vue.config.file', contents);
//       }
//       else
//         this.configEnv = 'development';
//       console.log('vue.config._CONFIG_ENV', this.configEnv);
      
//       const dir = path.join(__dirname, 'node_modules', '@thzero');
//       const dirs = fs.readdirSync(dir);
      
//       console.log('\tOpenSource...');
      
//       let file;
//       const items = [];
//       let data;
//       for (const item of dirs) {
//         try {
//           file = path.join(dir, item, 'openSource.js');
//           console.log(`\t${file}...`);
//           if (!fs.existsSync(file)) {
//             console.log('\t...not found.');
//             continue;
//           }
      
//           data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
//           // items.push(['@thzero', item, 'openSource.js'].join('/'));
//           items.push(data.replace('export default', ''));
//           console.log('\t...processed.');
//         }
//         catch (err) {
//           console.log('\t...failed.', err);
//         }
//       }
      
//       try {
//         const openSourceJs = `/* eslint-disable */\n/* GENERATED FILE - DO NOT EDIT */\nexport function useDependenciesClientBase () { return [ ${items.join(`, `)} ]; }`;
//         fs.writeFileSync(path.join(__dirname, 'openSource.js'), openSourceJs);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     alias() { 
//       return {
//         '@': fileURLToPath(new URL('./', import.meta.url)),
//         'local-config': fileURLToPath(new URL(`./config/${this.configEnv}.json`, import.meta.url)),
//         'open-source-config': fileURLToPath(new URL(`./openSource.js`, import.meta.url)),
//       };
//     }
// }

// export default new library();
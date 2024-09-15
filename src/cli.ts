import { Command } from 'commander';
import { CAYML } from './cayml';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .version('0.1.0')
  .description('CAYML CLI tool for generating Next.js projects');

program
  .command('generate <yamlFile> <outputDir>')
  .description('Generate a Next.js project from CAYML configuration')
  .action((yamlFile, outputDir) => {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const cayml = new CAYML(outputDir);
    cayml.generateFromYAML(yamlFile);

    // Create package.json for Next.js project
    const packageJson = {
      name: path.basename(outputDir),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        next: '12.1.6',
        react: '18.1.0',
        'react-dom': '18.1.0'
      },
      devDependencies: {
        '@types/node': '17.0.35',
        '@types/react': '18.0.9',
        '@types/react-dom': '18.0.5',
        typescript: '4.7.2'
      }
    };

    fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2));

    console.log('Next.js project generated successfully!');
  });

program.parse(process.argv);
import { Command } from 'commander';
import { CAYML } from './cayml';

const program = new Command();

program
  .version('0.1.0')
  .description('CAYML CLI tool for managing CAYML projects');

program
  .command('generate <yamlFile>')
  .description('Generate application files from CAYML configuration')
  .action((yamlFile) => {
    const cayml = new CAYML();
    cayml.generateFromYAML(yamlFile);
    console.log('Generation complete!');
  });

program
  .command('validate <yamlFile>')
  .description('Validate a CAYML configuration file')
  .action((yamlFile) => {
    // Implement validation logic
    console.log('Validation complete!');
  });

// Add more commands as needed

program.parse(process.argv);
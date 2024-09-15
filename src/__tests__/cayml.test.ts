import { CAYML } from '../cayml';
import * as fs from 'fs';
import * as path from 'path';

describe('CAYML', () => {
  let cayml: CAYML;

  beforeEach(() => {
    cayml = new CAYML();
  });

  test('generates files from YAML', () => {
    const yamlContent = `
      meta:
        title: "Test App"
      pages:
        home:
          route: "/"
          component: "HomePage"
    `;
    const yamlPath = path.join(__dirname, 'test.yaml');
    fs.writeFileSync(yamlPath, yamlContent);

    cayml.generateFromYAML(yamlPath);

    // Add assertions to check if files were generated correctly
    expect(fs.existsSync(path.join(__dirname, '../src/pages/home.tsx'))).toBeTruthy();

    // Clean up
    fs.unlinkSync(yamlPath);
  });

  // Add more tests for other CAYML functionalities
});
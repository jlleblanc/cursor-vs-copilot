import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export class CAYML {
  private project: Project;

  constructor(private outputDir: string) {
    this.project = new Project({
      tsConfigFilePath: path.join(outputDir, 'tsconfig.json'),
    });
  }

  public generateFromYAML(yamlFilePath: string): void {
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    const config = yaml.load(yamlContent) as any;

    this.generateNextConfig();
    this.generatePages(config.pages);
    this.generateComponents(config.components);
    this.generateStyles(config.styles);

    this.project.saveSync();
  }

  private generateNextConfig(): void {
    const configPath = path.join(this.outputDir, 'next.config.js');
    fs.writeFileSync(configPath, `
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        reactStrictMode: true,
      }

      module.exports = nextConfig
    `);
  }

  private generatePages(pages: any): void {
    for (const [pageName, pageConfig] of Object.entries(pages)) {
      const sourceFile = this.project.createSourceFile(
        path.join(this.outputDir, 'pages', `${pageName}.tsx`),
        '',
        { overwrite: true }
      );

      this.generatePageComponent(sourceFile, pageName, pageConfig);
    }
  }

  private generatePageComponent(sourceFile: SourceFile, pageName: string, pageConfig: any): void {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'react',
      namedImports: ['React'],
    });

    const componentName = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page`;

    sourceFile.addFunction({
      name: componentName,
      isExported: true,
      statements: (writer) => {
        writer.writeLine(`return (`);
        writer.writeLine(`  <div>`);
        writer.writeLine(`    <h1>${pageConfig.title || pageName}</h1>`);
        writer.writeLine(`  </div>`);
        writer.writeLine(`);`);
      },
    });

    sourceFile.addExportAssignment({
      expression: componentName,
      isExportEquals: false,
    });
  }

  private generateComponents(components: any): void {
    if (!components) return;

    for (const [componentName, componentConfig] of Object.entries(components)) {
      const sourceFile = this.project.createSourceFile(
        path.join(this.outputDir, 'components', `${componentName}.tsx`),
        '',
        { overwrite: true }
      );

      this.generateComponent(sourceFile, componentName, componentConfig);
    }
  }

  private generateComponent(sourceFile: SourceFile, componentName: string, componentConfig: any): void {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'react',
      namedImports: ['React'],
    });

    sourceFile.addFunction({
      name: componentName,
      isExported: true,
      statements: (writer) => {
        writer.writeLine(`return (`);
        writer.writeLine(`  <div>`);
        writer.writeLine(`    <h2>${componentName}</h2>`);
        writer.writeLine(`  </div>`);
        writer.writeLine(`);`);
      },
    });
  }

  private generateStyles(styles: any): void {
    if (!styles) return;

    const globalStylesPath = path.join(this.outputDir, 'styles', 'globals.css');
    fs.writeFileSync(globalStylesPath, `
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      * {
        box-sizing: border-box;
      }
    `);
  }
}

// Usage
const cayml = new CAYML('path/to/output/directory');
cayml.generateFromYAML('path/to/your/cayml.yaml');
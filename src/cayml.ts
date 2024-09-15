import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

class CAYML {
  private project: Project;

  constructor() {
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });
  }

  public generateFromYAML(yamlFilePath: string): void {
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    const config = yaml.load(yamlContent) as any;

    this.generateMetaInfo(config.meta);
    this.generatePages(config.pages);
    this.generateComponents(config.components);
    this.generateAPIRoutes(config.api);
    this.generateState(config.state);
    this.generateStyles(config.styles);

    this.project.saveSync();
  }

  private generateMetaInfo(meta: any): void {
    // Generate meta information (e.g., project config)
  }

  private generatePages(pages: any): void {
    for (const [pageName, pageConfig] of Object.entries(pages)) {
      const sourceFile = this.project.createSourceFile(
        `src/pages/${pageName}.tsx`,
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
        writer.writeLine(`    <h1>${pageConfig.meta.title}</h1>`);
        writer.writeLine(`  </div>`);
        writer.writeLine(`);`);
      },
    });
  }

  private generateComponents(components: any): void {
    for (const [componentName, componentConfig] of Object.entries(components)) {
      const sourceFile = this.project.createSourceFile(
        `src/components/${componentName}.tsx`,
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
      parameters: [
        {
          name: 'props',
          type: this.generatePropsType(componentConfig.props),
        },
      ],
      statements: (writer) => {
        writer.writeLine(`return (`);
        this.generateJSX(writer, componentConfig.elements);
        writer.writeLine(`);`);
      },
    });
  }

  private generatePropsType(props: any): string {
    const propsEntries = Object.entries(props);
    if (propsEntries.length === 0) return '{}';

    return `{ ${propsEntries.map(([key, type]) => `${key}: ${type}`).join(', ')} }`;
  }

  private generateJSX(writer: any, elements: any[]): void {
    elements.forEach((element) => {
      const [tagName, config] = Object.entries(element)[0];
      writer.writeLine(`  <${tagName}`);

      if (config.class) {
        writer.write(` className="${config.class}"`);
      }

      if (config.children) {
        writer.writeLine(`>`);
        if (typeof config.children === 'string') {
          writer.writeLine(`    ${config.children}`);
        } else {
          this.generateJSX(writer, config.children);
        }
        writer.writeLine(`  </${tagName}>`);
      } else {
        writer.writeLine(` />`);
      }
    });
  }

  private generateAPIRoutes(api: any): void {
    // Generate API routes
  }

  private generateState(state: any): void {
    // Generate state management code
  }

  private generateStyles(styles: any): void {
    // Generate styling code or configuration
  }
}

// Usage
const cayml = new CAYML();
cayml.generateFromYAML('path/to/your/cayml.yaml');
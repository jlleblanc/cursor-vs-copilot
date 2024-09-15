# CAYML: Comprehensive Style Guide

## Table of Contents
1. [Introduction to CAYML](#1-introduction-to-cayml)
2. [Project Structure](#2-project-structure)
3. [Input Format](#3-input-format)
4. [Meta Information](#4-meta-information)
5. [Page/Route Definitions](#5-pageroute-definitions)
6. [Component Definitions](#6-component-definitions)
7. [API Route Definitions](#7-api-route-definitions)
8. [State Management](#8-state-management)
9. [Styling](#9-styling)
10. [Naming Conventions](#10-naming-conventions)
11. [Code Style](#11-code-style)
12. [Performance Considerations](#12-performance-considerations)
13. [Accessibility](#13-accessibility)
14. [SEO](#14-seo)
15. [Internationalization](#15-internationalization)
16. [Testing](#16-testing)
17. [Documentation](#17-documentation)
18. [CLI Tool](#18-cli-tool)

## 1. Introduction to CAYML

CAYML (Component Architecture YAML) is a meta framework designed to accelerate the development of component-based applications through the use of concise, YAML-based configurations. It enables developers to quickly define the structure, components, and behavior of their applications in a human-readable yet machine-parseable format.

### Core Principles of CAYML:

1. **Rapid Development**: Quickly scaffold and iterate on component-based applications.
2. **Declarative Configuration**: Use YAML to describe your application's structure and behavior.
3. **Full Stack**: Cover all aspects of modern web application development, from frontend components to API routes.
4. **Machine and Human Friendly**: Easily read by both developers and parsed by automated tools.
5. **Best Practices Built-in**: Encourage component-based architecture best practices.
6. **Framework Agnostic**: Define application structure and behavior independently of any specific framework.

## 2. Project Structure

Define the overall project structure using the following top-level keys:

```yaml
meta:
  # Project-wide configurations and shadcn component list
pages:
  # Page/route definitions
components:
  # Component definitions
api:
  # API route definitions
state:
  # Global state management
styles:
  # Custom styling configurations
public:
  # Static assets
```

## 3. Input Format

- Use YAML for all CAYML configurations
- Maintain a flat structure where possible to improve readability
- Use meaningful, descriptive key names
- Use comments to explain complex structures or provide additional context

Example:
```yaml
# CAYML Project Configuration
project:
  name: "my-cayml-app"
  description: "A sample application built with CAYML"
```

## 4. Meta Information

Define project-wide configurations and the unified shadcn component list under the `meta` key:

```yaml
meta:
  title: "My CAYML App"
  description: "A powerful component-based application"
  favicon: "/favicon.ico"
  dependencies:
    shadcn: "latest"
  shadcn:
    components:
      - Card
      - CardHeader
      - CardTitle
      - CardContent
      - Input
      - Button
      - AlertDialog
      - AlertDialogTrigger
      - AlertDialogContent
      - AlertDialogHeader
      - AlertDialogTitle
      - AlertDialogDescription
      - AlertDialogFooter
      - AlertDialogCancel
      - AlertDialogAction
```

## 5. Page/Route Definitions

Define pages or routes under the `pages` key:

```yaml
pages:
  home:
    route: "/"
    component: "HomePage"
    meta:
      title: "Welcome to My App"
      description: "This is the homepage"
    layout: "MainLayout"
  about:
    route: "/about"
    component: "AboutPage"
    meta:
      title: "About Us"
      description: "Learn more about our company"
    layout: "MainLayout"
```

## 6. Component Definitions

Define reusable components under the `components` key using the concise syntax:

```yaml
components:
  Header:
    props:
      title: string
      showNav: boolean
    elements:
      - header:
          class: styles.header
          children:
            - h1: 
                content: $title
            - Nav:
                condition: $showNav
    styles:
      header: "bg-blue-500 text-white p-4"

  Button:
    props:
      text: string
      onClick: "() => void"
    elements:
      - button:
          class: styles.button
          onClick: $onClick
          content: $text
    styles:
      button: "bg-green-500 text-white px-4 py-2 rounded"

  LoginForm:
    props:
      onSubmit: "(username: string, password: string) => void"
    elements:
      - Card:
          children:
            - CardHeader:
                children:
                  - CardTitle:
                      content: "Login"
            - CardContent:
                children:
                  - form:
                      onSubmit: $handleSubmit
                      children:
                        - Input:
                            name: username
                            placeholder: "Username"
                        - Input:
                            name: password
                            type: password
                            placeholder: "Password"
                        - Button:
                            type: submit
                            content: "Log in"
```

## 7. API Route Definitions

Define API routes under the `api` key:

```yaml
api:
  getUsers:
    route: "/api/users"
    method: "GET"
    handler: |
      async function handler(req, res) {
        const users = await fetchUsers();
        return users;
      }
  createUser:
    route: "/api/users"
    method: "POST"
    handler: |
      async function handler(req, res) {
        const newUser = await createUser(req.body);
        return newUser;
      }
```

## 8. State Management

Define global state under the `state` key:

```yaml
state:
  initialState:
    user: null
    theme: "light"
  global:
    store:
      - key: "currentUser"
        defaultValue: null
      - key: "appTheme"
        defaultValue: "light"
```

## 9. Styling

Use utility-first CSS (e.g., Tailwind CSS) as the primary styling method:

```yaml
styles:
  utility:
    extend:
      colors:
        primary: "#3498db"
        secondary: "#2ecc71"
  custom:
    buttonHover: "hover:brightness-110 transition-all duration-200"
  shadcn:
    theme:
      colors:
        primary: "#3498db"
        secondary: "#2ecc71"
      borderRadius:
        default: "0.5rem"
    components:
      Button:
        defaultVariants:
          size: "sm"
          variant: "outline"
```

## 10. Naming Conventions

- File names: Use kebab-case (e.g., `home-page.tsx`, `api-utils.ts`)
- Component names: Use PascalCase (e.g., `HomePage`, `NavBar`)
- Function and variable names: Use camelCase (e.g., `fetchUsers`, `isLoading`)
- CSS class names: Use kebab-case (e.g., `nav-item`, `btn-primary`)

## 11. Code Style

- Use TypeScript for improved type safety and developer experience
- Follow ESLint and Prettier configurations for consistent code formatting
- Use functional components and hooks for React-like frameworks
- Implement error boundaries or similar error-handling mechanisms

## 12. Performance Considerations

- Use code splitting and lazy loading when supported by the chosen framework
- Implement proper caching strategies for API routes and data fetching
- Optimize images and assets
- Minimize use of client-side JavaScript where possible

## 13. Accessibility

- Use semantic HTML elements
- Provide alternative text for images
- Ensure proper color contrast
- Implement keyboard navigation support

## 14. SEO

- Use appropriate meta tags in page definitions
- Implement structured data where appropriate
- Create a sitemap.xml and robots.txt

## 15. Internationalization

- Use appropriate i18n methods based on the chosen framework
- Store translations in YAML or JSON files
- Implement RTL support for appropriate languages

## 16. Testing

- Write unit tests for utility functions and components
- Implement integration tests for complex interactions
- Use appropriate testing libraries based on the chosen framework
- Perform end-to-end testing with tools like Cypress or Playwright

## 17. Documentation

- Use appropriate documentation comments for functions and components (e.g., JSDoc for JavaScript/TypeScript)
- Maintain a README.md file with project setup and contribution guidelines
- Create user documentation for any CLI tools associated with the framework

## 18. CLI Tool

CAYML provides a command-line interface (CLI) tool for managing CAYML projects.

### Installation

```bash
npm install -g cayml-cli
```

### Usage

```bash
cayml [global options] command [command options] [arguments...]
```

### Global Options

- `--config FILE, -c FILE`: Specify the CAYML configuration file (default: "cayml.yaml")
- `--framework FRAMEWORK, -f FRAMEWORK`: Specify the output framework (e.g., "react", "vue", "angular", "svelte")
- `--verbose, -v`: Enable verbose output
- `--quiet, -q`: Suppress all output except errors
- `--version, -V`: Print the version information
- `--help, -h`: Show help message

### Commands

- `new NAME`: Create a new CAYML project
- `generate`: Generate application files from CAYML configuration
- `update`: Update an existing application based on CAYML changes
- `validate`: Validate a CAYML configuration file
- `add COMPONENT`: Add a new component to the CAYML configuration
- `remove COMPONENT`: Remove a component from the CAYML configuration
- `list`: List all components in the CAYML configuration
- `run SCRIPT`: Run a defined script from the CAYML configuration

For detailed information on each command and its options, use `cayml [command] --help`.

This comprehensive guide provides a solid foundation for developing applications using the CAYML framework. It covers all major aspects of modern web application development while remaining framework-agnostic. Use this as a reference document for your projects and expand upon it as needed for specific implementations.

# AI Agents Documentation

## Overview

This document describes the AI agents and their skills used in this portfolio project.

## Project Stack

- **Framework**: Astro.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Internationalization**: i18n (English, Vietnamese)

## Agent Skills

### 1. Code Generation Agent

- Generates React components based on specifications
- Creates TypeScript interfaces and types
- Generates utility functions and hooks

### 2. Documentation Agent

- Writes project documentation
- Creates API documentation
- Generates README files

### 3. Testing Agent

- Creates unit tests
- Generates integration tests
- Produces test coverage reports

### 4. Performance Agent

- Analyzes code performance
- Suggests optimization improvements
- Monitors bundle size

### 5. Localization Agent

- Assists with i18n implementation
- Manages translation keys (en, vi)
- Validates language strings

### 6. Frontend Code Structure (React / Astro)

#### 1. Component Structure

- Each component includes:
  - Component file: `.tsx`
  - Style file: `.module.scss`
    - Tailwind CSS utilities can be applied using `@apply`
- `className` conventions:
  - Outer wrapper: `.ctn`
  - Main content: `.main`
  - Supporting sections: `.left`, `.right`, etc.
- Use semantic HTML5 elements based on context:
  - `article`, `aside`, `header`, `footer`, `ul`, `li`, `ol`, `div`, etc.
- Components:
  - Must use `export default`
  - Should be re-exported through an `index.ts` file for centralized exports

#### 2. Actions / Business Logic

- Business logic must be separated from UI components
- Place logic in dedicated folders:
  - `utils/`
  - `helpers/`
- Components should focus only on:
  - Rendering UI
  - Receiving props
  - Calling helper or action functions

---

import StyleDictionary from 'style-dictionary';

// Custom format for CSS variables with Matrix theme
StyleDictionary.registerFormat({
  name: 'css/matrix-variables',
  format: function({ dictionary, file, options }) {
    const { outputReferences } = options;

    let output = `/**
 * Sendell-Trix Design Tokens
 * Matrix-inspired design system
 *
 * Auto-generated - Do not edit directly
 * @generated
 */

:root {\n`;

    dictionary.allTokens.forEach(token => {
      let value = outputReferences
        ? StyleDictionary.formatHelpers.createPropertyFormatter({
            outputReferences,
            dictionary,
            format: 'css'
          })({ ...token, value: token.value })
        : token.value;

      // Clean up the formatted value
      if (typeof value === 'string' && value.includes(': ')) {
        value = value.split(': ')[1].replace(';', '');
      }

      const name = token.name.replace(/\./g, '-');
      output += `  --st-${name}: ${value};\n`;
    });

    output += `}\n`;
    return output;
  }
});

// Custom format for JavaScript ES modules
StyleDictionary.registerFormat({
  name: 'javascript/es6-matrix',
  format: function({ dictionary }) {
    let output = `/**
 * Sendell-Trix Design Tokens
 * Matrix-inspired design system
 *
 * Auto-generated - Do not edit directly
 * @generated
 */

`;

    dictionary.allTokens.forEach(token => {
      const name = token.name
        .split('-')
        .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      const value = typeof token.value === 'string' ? `"${token.value}"` : token.value;
      output += `export const ${name} = ${value};\n`;
    });

    return output;
  }
});

// Custom format for TypeScript declarations
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations-matrix',
  format: function({ dictionary }) {
    let output = `/**
 * Sendell-Trix Design Tokens
 * Matrix-inspired design system
 *
 * Auto-generated - Do not edit directly
 * @generated
 */

`;

    dictionary.allTokens.forEach(token => {
      const name = token.name
        .split('-')
        .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      output += `export declare const ${name}: string;\n`;
    });

    return output;
  }
});

// Custom transform for token names
StyleDictionary.registerTransform({
  name: 'name/kebab-matrix',
  type: 'name',
  transform: function(token) {
    return token.path.join('-').toLowerCase();
  }
});

// Custom transform group
StyleDictionary.registerTransformGroup({
  name: 'matrix-css',
  transforms: ['attribute/cti', 'name/kebab-matrix', 'time/seconds', 'size/rem', 'color/css']
});

StyleDictionary.registerTransformGroup({
  name: 'matrix-js',
  transforms: ['attribute/cti', 'name/kebab-matrix', 'time/seconds', 'size/rem', 'color/css']
});

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'matrix-css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/matrix-variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    js: {
      transformGroup: 'matrix-js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6-matrix'
        }
      ]
    },
    ts: {
      transformGroup: 'matrix-js',
      buildPath: 'dist/ts/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations-matrix'
        }
      ]
    },
    json: {
      transformGroup: 'matrix-js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
});

// Build all platforms
await sd.buildAllPlatforms();

console.log('\\n✅ Tokens built successfully!');
console.log('📁 Output directories:');
console.log('   - dist/css/variables.css');
console.log('   - dist/js/tokens.js');
console.log('   - dist/ts/tokens.d.ts');
console.log('   - dist/json/tokens.json');

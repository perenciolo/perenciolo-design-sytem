import css from "@modular-css/rollup";
import ts from 'rollup-plugin-typescript2';

export default {
  input: [
    'src/index.ts',
    'src/atoms/Color/index.ts',
    'src/atoms/Margin/index.ts',
    'src/molecules/Select/index.ts',
  ],
  output: {
    dir: 'lib',
    format: 'esm',
    sourcemap: true
  },
  plugins: [ts(), css()],
  preserveModules: true,
  external: ['react', '@perenciolo-design-system/foundation', '@perenciolo-design-system/scss', 'classnames']
}

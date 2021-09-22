const fs = require('fs')
const path = require('path')
const sass = require('node-sass')

const getComponents = () => {
  let allComponents = []
  const types = ['atoms', 'molecules']

  types.forEach(type => {
    const allFiles = fs.readdirSync(path.resolve('src', type)).map(file => ({
      input: path.resolve('src', type, file),
      output: path.resolve('lib', file.replace('.scss','.module.css'))
    }))
    allComponents = [
      ...allComponents,
      ...allFiles
    ]
  })
  return allComponents
}

const compile = (source, filename) => {
  const result = sass.renderSync({
    data: fs.readFileSync(source).toString(),
    outputStyle: 'expanded',
    includePaths: [path.resolve('src')]
  })

  fs.writeFileSync(
    filename,
    result.css.toString()
  )
}

try {
  fs.mkdirSync(path.resolve('lib'))
} catch (error) {}

compile(path.resolve('src', 'global.scss'), path.resolve('lib', 'global.module.css'))

getComponents().forEach(({ input, output }) => {
  compile(input, output)
})

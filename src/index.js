import globby from 'globby'
import {
  getImportPath,
  defaultImport,
  createImportDeclaration,
  template
} from 's2s-utils'

const builders = {
  root: template(`export default function* rootSaga() {yield all(OBJ)}`)
}

function trimDotSlash(path) {
  return path.replace('./', '')
}

module.exports = (babel) => {
  var t = babel.types;

  return {
    name: "s2s-redux-sagas-root",
    visitor: {
      Program: {
        exit(path, state) {
	        const { input, output } = state.opts

          if (!input) {
            throw new Error('require input option')
          }

          if (!output) {
            throw new Error('require output option')
          }

          const files = globby.sync(input)
          const index = files.indexOf(output)

          if (index > -1) {
            files.splice(index, 1);
          }

          const imports = files
                .map(f => defaultImport(trimDotSlash(getImportPath(output, f)), getImportPath(output, f)))

          const props = files
                .map(f => trimDotSlash(getImportPath(output, f)))
                .map(x => t.identifier(x))
                .map(name => t.SpreadElement(name))

          path.node.body = [
            createImportDeclaration('all', "redux-saga/effects"),
            ...imports,
            builders.root({ OBJ: t.ArrayExpression(props) }),
          ]
        }
      }
    }
  }
}

const path = require('path')
const fs = require('fs-extra')

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)

async function start() {
  // 复制types
  await fs.copy(resolve('types'), resolve('lib/types'))
  await fs.copy(resolve('README.md'), resolve('lib/README.md'))
  // 复制package.json
  const pkg = fs.readFileSync(resolve('package.json'))
  const pkgJSON = JSON.parse(pkg, 'utf-8')
  const newPkg = resolve('lib/package.json')
  pkgJSON.main = 'index.js'
  pkgJSON.module = 'index.esm.js'
  delete pkgJSON.private
  delete pkgJSON.devDependencies
  fs.writeFileSync(newPkg, JSON.stringify(pkgJSON, null, 2), 'utf-8')
}

start()

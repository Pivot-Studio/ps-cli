# ps-cli

## description

A highly customized CLI tool supporting for npm、pnpm and yarn. No more agonizing about switching between different package managers for different projects.

Users can only remenber one command usage，and use Node more conveniently

## start

`npm install ps-psc -g`

- ~~克隆项目~~(以下均被废弃)

```
`git clone xxx`

- link 到本地全局依赖中（目前还没有发布 npm 包）

`npm link`
```

## usage

`psc`

![](./psc-example.png)

#### 创建组件或者 vue 项目架构 `psc create` （目前默认`psc`也是该作用）

- 支持创建 Vue2 版本以及 React+TypeScript 的项目 tempalte
- 支持创建 Vue2 类组件以及 React 的类组件或者 Hook 函数组件

#### debugger

> 注意一下，以下命令是用于整合 3 种不同包管理工具的，**无论什么命令都可以在命令最后加一个`?`来进行调试**，打印出最终转化的命令

例子：

```bash
psc i something -D ?

// output
# npm install something -D
# yarn add something -D
# pnpm install something -D
```

#### init

```bash
psc init

# npm init
# yarn init
# pnpm init
```

#### i / ui --- install / uninstall

```bash
psc i

# npm install
# yarn install
# pnpm install
```

```bash
psc i --frozen

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
```

```bash
psc i axios

# npm i axios
# yarn add axios
# pnpm add axios
```

```bash
psc i axios -g

# npm i axios -g
# yarn add global axios
# pnpm add -g axios
```

```bash
psc ui <package>

# npm uninstall <package>
# yarn uninstall <package>
# pnpm uninstall <package>
```

```bash
psc ui <package> -g

# npm uninstall <package> -g
# yarn global uninstall <package>
# pnpm remove --global <package>
```

#### u --- update

```bash
psc u <package> -s/-d

# npm upgrade <package>
# yarn upgrade <package>
# pnpm update <package>
```

```bash
psc u -g

# npm upgrade -g
# yarn global upgrade
# pnpm update -g
```

```bash
psc u -i axios <--latest>

# (nonsupport for npm)
# yarn upgrade-interactive axios --latest
# pnpm update -i axios --latest
```

#### x ---- execute

```bash
psc x jest

# npx jest
# yarn dlx jest
# pnpm dlx jest
```

#### r ---- run

```bash
psc r

# npm run dev/serve/start
# yarn run dev/serve/start
# pnpm run dev/serve/start
```

```bash
psc r dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

#### ls ---- list

```bash
psc ls <axios>

# npm list axios
# yarn list axios
# pnpm list axios
```

```bash
psc ls <axios> -v

# npm view axios versions
# npm view axios versions
# npm view axios versions
```

## changelogs

### v0.0.1

- 功能基本齐全，已经支持三种包管理工具（**npm**、**yarn**、**pnpm**）的自动识别使用。
  【注】：这里是根据 Lockfile 来识别的。因此项目根目录下要有对应的 Lockfile
  没有也没关系噢~~~

- 为了可以节省出更多的时间摸鱼（不是），默认 `psc r` 命令可以自动解析你的`package.json`并执行其中的 run-start 命令

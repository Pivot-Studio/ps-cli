# ps-cli

## description

A highly customized CLI tool

## start

- 克隆项目

`git clone xxx`

- link 到本地全局依赖中（目前还没有发布 npm 包）

`npm link`

## usage

`psc`

![](./psc-example.png)

#### 创建组件或者 vue 项目架构 `psc create` （目前默认`psc`也是该作用）

> 注意一下，以下命令是用于整合 3 种不同包管理工具的，**无论什么命令都可以在命令最后加一个`?`来进行调试**，打印出最终转化的命令

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
# yarn upgrade -g
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
psc r dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

## histroy

#### v0.0.0

目前只支持通过 `psc` 来动态创建一个 Vue 组件文件

#### v0.0.1

- 重构了一下总体代码结构，将不同用途的代码抽离。
- 修改了一下**创建组件**的方式，现在是通过 `psc create component` 来触发。
- 加入了安装依赖和删除依赖的功能：`psc i/ui <package> -g/-d/-s`

#### v0.0.2

- 优化了选择创建的方式
- 添加了创建 Vue 项目架构的功能
- 支持适配 3 种包管理器的使用（npm、yarn、pnpm），但目前只支持 npm
  > 确保一定项目一定要有`package-lock.json`等包管理锁文件才可以正常使用~~~~~
- 移除了`Commander`命令行一系列管理工具，使用自定义解析

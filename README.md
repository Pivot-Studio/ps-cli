# @ps/zues
>  [开发同学可以点击这里查看更多](https://pivotstudio.feishu.cn/docx/doxcnhVUayYGvNDWHIjyBdhZkSg)
## description

A highly customized CLI tool supporting for npm、pnpm and yarn. No more agonizing about switching between different package managers for different projects.

Users can only remenber one command usage，and use Node more conveniently

## features

- 内聚了npm、pnpm、yarn三种包管理器的命令 

## changelogs

### v0.0.1

- 功能基本齐全，已经支持三种包管理工具（**npm**、**yarn**、**pnpm**）的自动识别使用。
  【注】：这里是根据 Lockfile 来识别的。因此项目根目录下要有对应的 Lockfile
  没有也没关系噢~~~

- 为了可以节省出更多的时间摸鱼（不是），默认 `zeus r` 命令可以自动解析你的`package.json`并执行其中的 run-start 命令



## 开发须知

1. clone到本地
2. 在项目根目录上执行`npm link`
3. 启动： `npm run start` 。启动后在本地执行`zeus xxx`命令即可看到编译效果
4. 打包： `npm run build`
## start

- ~~克隆项目~~(以下均被废弃)

```
`git clone xxx`

- link 到本地全局依赖中（目前还没有发布 npm 包）

`npm link`
```

## usage

`zeus`

![](./zeus-example.png)

#### 创建组件或者 vue 项目架构 `zeus create` （目前默认`zeus`也是该作用）

- 支持创建 Vue2 版本以及 React+TypeScript 的项目 tempalte
- 支持创建 Vue2 类组件以及 React 的类组件或者 Hook 函数组件

#### debugger

> 注意一下，以下命令是用于整合 3 种不同包管理工具的，**无论什么命令都可以在命令最后加一个`?`来进行调试**，打印出最终转化的命令

例子：

```bash
zeus i something -D ?

// output
# npm install something -D
# yarn add something -D
# pnpm install something -D
```

#### init

```bash
zeus init

# npm init
# yarn init
# pnpm init
```

#### i / ui --- install / uninstall

```bash
zeus i

# npm install
# yarn install
# pnpm install
```

```bash
zeus i --frozen

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
```

```bash
zeus i axios

# npm i axios
# yarn add axios
# pnpm add axios
```

```bash
zeus i axios -g

# npm i axios -g
# yarn add global axios
# pnpm add -g axios
```

```bash
zeus ui <package>

# npm uninstall <package>
# yarn uninstall <package>
# pnpm uninstall <package>
```

```bash
zeus ui <package> -g

# npm uninstall <package> -g
# yarn global uninstall <package>
# pnpm remove --global <package>
```

#### u --- update

```bash
zeus u <package> -s/-d

# npm upgrade <package>
# yarn upgrade <package>
# pnpm update <package>
```

```bash
zeus u -g

# npm upgrade -g
# yarn global upgrade
# pnpm update -g
```

```bash
zeus u -i axios <--latest>

# (nonsupport for npm)
# yarn upgrade-interactive axios --latest
# pnpm update -i axios --latest
```

#### x ---- execute

```bash
zeus x jest

# npx jest
# yarn dlx jest
# pnpm dlx jest
```

#### r ---- run

```bash
zeus r

# npm run dev/serve/start
# yarn run dev/serve/start
# pnpm run dev/serve/start
```

```bash
zeus r dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

#### ls ---- list

```bash
zeus ls <axios>

# npm list axios
# yarn list axios
# pnpm list axios
```

```bash
zeus ls <axios> -v

# npm view axios versions
# npm view axios versions
# npm view axios versions
```


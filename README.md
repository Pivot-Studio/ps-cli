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

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

#### 创建 Vue 组件 `psc create component` （目前默认`psc`也是该作用）

#### 安装或者删除依赖包 `psc i/ui <package> -g/-d/-s`

## histroy

#### v0.0.0

目前只支持通过 `psc` 来动态创建一个 Vue 组件文件

#### v0.0.1

- 重构了一下总体代码结构，将不同用途的代码抽离。
- 修改了一下**创建组件**的方式，现在是通过 `psc create component` 来触发。
- 加入了安装依赖和删除依赖的功能：`psc i/ui <package> -g/-d/-s`

<!-- #### 3.17

可以创建文件夹但文件夹里面的文件创建失败 -->

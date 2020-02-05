<p align="center">
    <img src="./sources/logo.png" alt="Image" width="320" height="304"/>
</p>

# aiyou-download-git（超轻量Git Repository下载工具）- 哎呦系列
![nodejs>8.0](https://img.shields.io/badge/nodejs-%3E%208.0-brightgreen.svg) 
![npm>6.0](https://img.shields.io/badge/npm-%20%3E%206.0-brightgreen.svg) 
![aiyou_dowload_git](https://img.shields.io/badge/aiyou_dowload_git-1.0.0-brightgreen.svg) 
![aiyou-bud](https://img.shields.io/badge/aiyou-bud-brightgreen.svg)

- [🔥功能列表](##功能列表)
- [✨使用介绍](#使用介绍)
- [🚀快速上手](#快速上手)
- [📚开发文档](#开发文档)
- [📞社区交流](#社区交流)

***
## aiyou-download-git是什么鬼？
aiyou-download-git是**哎呦系列**中，用于拉取远程或本地的Repository代码并且支持下载Repository的压缩包的工具包。

- ✂️轻量：`ES6`class代码编写，有良好的`jsdoc`注释，后续会添加`jest`单元测试以及`typescript`支持。
- ⚡易用：可作为命令行工具来全局使用，也可作为第三方依赖包使用。
- 💉高效：支持多种git仓库及本地git仓库的源码或压缩包下载。
- ⚙️️简单: 只有3个api，分别是get、clone、download，命令行工具也如此。

| nodejs | npm   | size   |
| ------ | ----- | ------ |
| > 8.0  | > 6.0 | 我管它 |

## 🔥功能列表
aiyou-download-git程序，可以同时运行在windows和类unux的电脑中：

| api                                    | 效果                                                           |
| -------------------------------------- | -------------------------------------------------------------- |
| aiyou-dg                               | 打开 aiyou-download-git 程序的帮助文档                         |
| aiyou-dg get  仓库所有者/仓库名称      | 获取一份github上该所有者的指定仓库名称的代码                   |
| aiyou-dg clone  仓库所有者/仓库名称    | 克隆一份github上该所有者的指定仓库名称master分支上的代码       |
| aiyou-dg download  仓库所有者/仓库名称 | 下载一份github上该所有者的指定仓库名称master分支上的代码压缩包 |
| ...                                    | 后续功能待优化                                                 |
***

## ✨使用介绍
### ⚔️安装指南
全局安装：

```bash
    npm install -g aiyou-dg
```

***

作为第三方依赖安装：

```bash
    npm install aiyou-dg
```

### 📈使用方法
全局使用（全局安装后的使用方式），在命令行工具中逐行输入以下命令：

```bash
    mkdir temporary-directory
    cd temporary-directory
    aiyou-dg
```

***

局部使用（作为第三方依赖包来使用），在node环境下的js文件中复制以下代码进行粘贴：

```javascript
const AiYouDownloadGit = require ('aiyou-dg');
const aiyouDG = new AiYouDownloadGit ();

aiyouDG.get ({
    /* github上 该仓库的所有者/该仓库名称 */
    currentUrl: 'ilovejwl/aiyou-download-git',
    /* 指定存放目录，可相对路径也可绝对路径 */
    targetPath: './temp/aiyou-download-git',
    /* 其它相关选项，一般可不动它*/
    option: {
        git: 'git',
        mode: 'clone',
        branchName: 'master',
        depthOne: false
    },
    /* 成功或者失败的回调函数 */
    hooks: function (reason) {
        let success = !!reason;
        if (success) {
            // 获取代码成功之后做些啥...
            console.log('SUCCESS!')
        } else {
            // 获取代码失败之后做些啥...
            console.error(reason)
        }
    }
});
    
```

***

### 😎浮夸的效果
![aiyou-dg](./sources/20200204110614.png)![成功](./sources/20200204110914-s.png)![失败](./sources/20200204110958-b.png)
***

## 🚀快速上手
**安装**->**使用**

## 📚开发文档
aiyou-download-git是最简单，易用的获得Repository仓库代码的工具。

## 代码仓库
[github链接](https://github.com/ilovejwl/aiyou-download-git)

## 📞社区交流
aiyou-download-git是**哎呦系列**中一员，之后还会有其它的成员陆续上来。
加群交流：756892437
![qq群](./sources/20200204113427-qq.jpg)

### 感谢以下开源工具

- chalk
- commander
- cli-spinners
- figlet
- inquirer
- ora
- yargs



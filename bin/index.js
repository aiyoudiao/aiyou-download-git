#!/usr/bin/env node

/*
 * @Descripttion: 命令行工具：用于拉取远程或本地的Repository代码并且支持下载Repository的压缩包的工具包
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-03 17:03:36
 * @LastEditTime: 2020-02-28 22:54:56
 * @LastEditors: ilovejwl
 */
const Commander = require ('commander');
const program = new Commander.Command ();
const chalk = require ('chalk');
const inquirer = require ('inquirer');
const version = require ('../package').version;
const AiYouDownloadGit = require ('../index');

const aiyouDG = new AiYouDownloadGit ();
const loading = require ('./common/loading').init;

const getCodeInteractionConfig = require ('./data/getCode');
const cloneCodeInteractionConfig = require ('./data/cloneCode');
const downloadCodeInteractionConfig = require ('./data/downloadCode');

new class AiYouCLI {
  constructor () {
    this.init ();
  }

  init () {
    this.initCommand ();
    this.initEvents ();
    program.parse (process.argv);

    if (process.argv.length === 2) {
      setTimeout (() => {
        program.help (str => {
          return chalk.green (`${str}\r\n`);
        });
      }, 160);
    }
  }

  initCommand () {
    this.initHelp ();
    this.initUsage ();
    this.initVersion ();
    this.initGetCommand ();
    this.initCloneCommand ();
    this.initDownloadCommand ();
  }

  initEvents () {
    program.on ('command:*', function () {
      console.error (
        '请检查命令: %s 有效性\n使用 --help 查看所有的有效命令。',
        program.args.join (' ')
      );
      process.exit (1);
    });
  }

  getCode ({ currentUrl, targetPath, option }) {
    let status = 'loading';

    loading (() => {
      if (status === 'loading') {
        status = 'no';
        aiyouDG
          .get ({
            currentUrl,
            targetPath,
            option
          })
          .then (function () {
            status = 'yes';
          })
          .catch (err => {
            err && console.log ('\r\n', err);
            status = 'bad';
          });
      }

      switch (status) {
      case 'yes':
        return 'yes';
      case 'bad':
        return 'bad';
      default:
        return false;
      }
    }, 'aiyou-dg');
  }

  // #region 初始化命令 区域 Code Module
  initHelp () {
    program.helpOption ('-h, --help', '显示aiyou-dg帮助文档');
    program.on ('--help', () => {
      // console.log ('调用了--help');
    });
  }

  initUsage () {
    program.name ('aiyou-dg').usage ('<command> [options]');
  }

  initVersion () {
    program.version (
      'aiyou-dg：' + (version || '1.0.0'),
      '-v, --version',
      '打印aiyou-dg版本号'
    );
  }

  initGetCommand () {
    program
      .command ('get [name]') /* 定义子命令 */
      .alias ('g') /* 子命令缩写 */
      .description ('得到指定名称的仓库代码。') /* 描述 */
      .option ('-a,--action <action>') /* 附加参数 */
      .action ((name, option) => {
        console.log ('得到指定名称的仓库代码');
      }); /* 回调函数 */

    program.on ('command:get', () => {
      setTimeout (() => {
        this.startActionInteractionByGetCode ()
          .then (answers => {
            // console.log (answers);
            const { authorName, warehouseName, downloadPath, isMaster } = answers;
            const currentUrl = authorName + '/' + warehouseName;
            const targetPath = downloadPath + Date.now ();
            const branchName = isMaster ? 'master' : answers.branchName;

            const config = {
              //   currentUrl: 'D:\\openSource\\home-public-warehouse-AiYouUI',
              currentUrl: currentUrl, // : 'ilovejwl/aiyou-download-git',
              targetPath: targetPath, // : './aiyou-ui/web-front' + Date.now (),
              option: {
                git: 'git',
                mode: 'clone',
                branchName: branchName, // : 'master',
                depthOne: false
              }
            };
            // console.log(config)
            // console.log ('得到指定名称的仓库代码');

            // const config = {
            //   //   currentUrl: 'D:\\openSource\\home-public-warehouse-AiYouUI',
            //   currentUrl: 'ilovejwl/aiyou-download-git',
            //   targetPath: './aiyou-ui/web-front' + Date.now (),
            //   option: {
            //     git: 'git',
            //     // mode: 'clone',
            //     mode: 'download',
            //     branchName: 'master',
            //     depthOne: false,
            //   },
            // };

            this.getCode (config);
          })
          .catch (err => {
            console.log (err);
          });
      }, 1000);
    });
  }

  initCloneCommand () {
    program
      .command ('clone [name]') /* 定义子命令 */
      .alias ('c') /* 子命令缩写 */
      .description ('克隆指定名称的仓库代码。') /* 描述 */
      .option ('-a,--action <action>') /* 附加参数 */
      .action ((name, option) => {
        console.log ('克隆指定名称的仓库代码');
      }); /* 回调函数 */
    program.on ('command:clone', () => {
      // console.log ('克隆指定名称的仓库代码');
      setTimeout (() => {
        this.startActionInteractionByCloneCode ()
          .then (answers => {
            // console.log (answers);
            const {
              authorName,
              warehouseName,
              downloadPath,
              isLocalWarehouse,
              localWarehouseAddress
            } = answers;
            let currentUrl;
            if (isLocalWarehouse) {
              currentUrl = localWarehouseAddress;
            } else {
              currentUrl = authorName + '/' + warehouseName;
            }
            const targetPath = downloadPath + Date.now ();
            const branchName = null;

            const config = {
              //   currentUrl: 'D:\\openSource\\home-public-warehouse-AiYouUI',
              currentUrl: currentUrl, // : 'ilovejwl/aiyou-download-git',
              targetPath: targetPath, // : './aiyou-ui/web-front' + Date.now (),
              option: {
                git: 'git',
                mode: 'clone',
                branchName: branchName, // : 'master',
                depthOne: false
              }
            };
            this.getCode (config);
          })
          .catch (err => {
            console.log (err);
          });
      }, 1000);
    });
  }

  initDownloadCommand () {
    program
      .command ('download [name]') /* 定义子命令 */
      .alias ('d') /* 子命令缩写 */
      .description ('下载指定名称的仓库代码。') /* 描述 */
      .option ('-a,--action <action>') /* 附加参数 */
      .action ((name, option) => {
        console.log ('下载指定名称的仓库代码。');
      }); /* 回调函数 */

    program.on ('command:download', () => {
      // console.log ('下载指定名称的仓库代码。');
      setTimeout (() => {
        this.startActionInteractionByDownloadCode ()
          .then (answers => {
            // console.log (answers);
            const { authorName, warehouseName, downloadPath, isMaster } = answers;
            const currentUrl = authorName + '/' + warehouseName;
            const targetPath = downloadPath + Date.now ();
            const branchName = isMaster ? 'master' : answers.branchName;

            const config = {
              //   currentUrl: 'D:\\openSource\\home-public-warehouse-AiYouUI',
              currentUrl: currentUrl, // : 'ilovejwl/aiyou-download-git',
              targetPath: targetPath, // : './aiyou-ui/web-front' + Date.now (),
              option: {
                git: 'git',
                mode: 'download',
                branchName: branchName, // : 'master',
                depthOne: false
              }
            };

            this.getCode (config);
          })
          .catch (err => {
            console.log (err);
          });
      }, 1000);
    });
  }

  // #endregion 初始化命令 区域 Code Module End

  // #region 命令处理区域 如交互 Code Module
  startActionInteractionByGetCode () {
    return inquirer.prompt (getCodeInteractionConfig);
  }

  startActionInteractionByDownloadCode () {
    return inquirer.prompt (downloadCodeInteractionConfig);
  }

  startActionInteractionByCloneCode () {
    return inquirer.prompt (cloneCodeInteractionConfig);
  }

  // #endregion 命令处理区域 如交互 Code Module End
} ();
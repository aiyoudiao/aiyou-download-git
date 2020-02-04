/*
 * @Descripttion: 用于拉取远程或本地的Repository代码并且支持下载Repository的压缩包的工具包。
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-03 10:04:09
 * @LastEditTime : 2020-02-04 09:17:41
 * @LastEditors  : ilovejwl
 */
const gitClone = require ('git-clone');
const download = require ('download');
const remove = require ('rimraf').sync;
const out = require ('./bin/common/output').out;

/**
 * @description aiyou-download-git是哎呦系列中，用于拉取远程或本地的Repository代码并且支持下载Repository的压缩包的工具包。
 * @author ilovejwl
 * @date 2020-02-03
 * @class AiYouDownloadGit
 */
class AiYouDownloadGit {
  constructor () {
    out ('aiyou-dg');
  }

  /**
   * @description 根据你配置中的选项来获取一份git上的代码
   * @author ilovejwl
   * @public
   * @date 2020-02-03
   * @param {obejct} {currentUrl, targetPath, option, hooks}
   * @memberof AiYouDownloadGit
   */
  get ({ currentUrl, targetPath, option, hooks }) {
    const isFunction = optionIsFunction ();
    const isNotFunction = !isFunction;
    const invalid = optionIsNullOrEmptyOrUndefined ();

    hooks = isFunction ? option : hooks;
    option = isNotFunction || invalid ? option : {};
    const mode = option.mode || undefined;

    const warehouseAddress = this.initialization (currentUrl);
    currentUrl = this.generateTheURLOfTheWarehouse (warehouseAddress, mode);
    currentUrl = currentUrl || warehouseAddress.url;

    if (mode === 'clone') {
      const { checkoutBranchName } = warehouseAddress;
      option.checkoutBranchName = checkoutBranchName;
      this.clone (currentUrl, targetPath, option, hooks);
    } else {
      this.download (currentUrl, targetPath, option, hooks);
    }

    function optionIsFunction () {
      return Object.prototype.toString.call (option) === '[object Function]';
    }

    function optionIsNullOrEmptyOrUndefined () {
      return !option;
    }
  }

  /**
   * @description 初始化仓库地址
   * @author ilovejwl
   * @private
   * @date 2020-02-03
   * @param {string} warehouseAddress
   * @returns 返回一个分解后的仓库地址数据对象
   * @memberof AiYouDownloadGit
   */
  initialization (warehouseAddress) {
    const regexp = new RegExp (
      '^(?:(github|gitlab|bitbucket|git\\.imooc):)?(?:(.+):)?([^/]+)\\/([^#]+)(?:#(.+))?$'
    );
    const argumentList = regexp.exec (warehouseAddress);
    /* 特殊处理：本地仓库 */
    if (!argumentList) {
      return {
        url: warehouseAddress,
        checkoutBranchName: 'master'
      };
    }

    const [
      ,
      type = 'github',
      domain,
      owner,
      name,
      checkoutBranchName = 'master'
    ] = argumentList;
    let origin = domain;
    switch (type) {
    case 'github':
      origin = 'github.com';
      break;
    case 'gitlab':
      origin = 'gitlab.com';
      break;
    case 'bitbucket':
      origin = 'bitbucket.org';
      break;
    case 'git.imooc':
      origin = 'git.imooc.com';
      break;
    default:
      break;
    }

    return {
      type,
      origin,
      owner,
      name,
      checkoutBranchName
    };
  }

  /**
   * @description 初始化目标地址的协议
   * @author ilovejwl
   * @private
   * @date 2020-02-03
   * @param {string} targetPath 地址
   * @param {string} mode 模式
   * @returns 带协议的url
   * @memberof AiYouDownloadGit
   */
  initializationProtocol (targetPath, mode) {
    let url = targetPath;
    const protocol = ['git@', 'https://'];
    if (notCarryAnyAgreementHeader ()) {
      url = mode === 'clone' ? `${protocol[0] + url}` : `${protocol[1] + url}`;
    }

    function notCarryAnyAgreementHeader () {
      const noCarryProtocolHeader =
        url.indexOf ('ftp:') === -1 ||
        url.indexOf ('http:') === -1 ||
        url.indexOf ('https:') === -1;

      return noCarryProtocolHeader;
    }

    return url;
  }

  /**
   * @description 生成仓库地址的url
   * @author ilovejwl
   * @private
   * @date 2020-02-03
   * @param {string} warehouseAddress
   * @param {string} mode
   * @returns 返回仓库地址的url
   * @memberof AiYouDownloadGit
   */
  generateTheURLOfTheWarehouse (warehouseAddress, mode) {
    if (!warehouseAddress.origin) {
      return undefined;
    }

    const { type, origin: domain, owner, name, checkout } = warehouseAddress;
    let origin = this.initializationProtocol (domain, mode);
    const mark = origin.indexOf ('git@') === 0 ? ':' : '/';
    origin = origin + mark;

    if (mode === 'clone') {
      return `${origin + owner}/${name}`;
    }

    switch (type) {
    case 'github':
    case 'git.imooc':
      return `${origin + owner}/${name}/archive/${checkout}.zip`;
    case 'gitlab':
      return `${origin + owner}/${name}/repository/archive.zip?ref=${checkout}`;
    case 'bitbucket':
      return `${origin + owner}/${name}/get/${checkout}.zip`;
    default:
      throw new Error ('(￣(工)￣)，你咋不上天嘞。哼！');
    }
  }

  /**
   * @description 克隆一份仓库到本地
   * @author ilovejwl
   * @public
   * @date 2020-02-03
   * @param {string} url
   * @param {string} targetPath
   * @param {obejct} option
   * @param {function} hooks
   * @memberof AiYouDownloadGit
   */
  clone (url, targetPath, option, hooks) {
    const { git, depthOne, branchName, checkoutBranchName } = option;
    const config = {
      git: git,
      checkout: branchName || checkoutBranchName,
      shallow: checkoutBranchName === 'master' && depthOne
    };

    gitClone (url, targetPath, config, function (reason) {
      if (reason) {
        hooks (reason);
        return;
      }

      remove (`${targetPath}/.git`);
      hooks ();
    });
  }

  /**
   * @description 下载一个压缩包到本地
   * @author ilovejwl
   * @public
   * @date 2020-02-03
   * @param {string} url
   * @param {string} targetPath
   * @param {obejct} option
   * @param {function} hooks
   * @memberof AiYouDownloadGit
   */
  download (url, targetPath, option, hooks) {
    const { headers = {} } = option;
    delete option.headers;

    const httpReqeustHeader = {
      accept: 'application/zip',
      ...headers
    };
    const config = Object.assign (
      {
        extract: true,
        strip: 1,
        mode: '666'
      },
      option,
      {
        headers: httpReqeustHeader
      }
    );

    download (url, targetPath, config).then (hooks).catch (hooks);
  }
}

module.exports = AiYouDownloadGit;
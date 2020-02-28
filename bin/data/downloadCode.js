/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-27 13:24:53
 * @LastEditTime: 2020-02-27 17:56:47
 * @LastEditors: ilovejwl
 */
// const inquirer = require ('inquirer');
module.exports = [
  {
    type: 'input',
    message: '请输入作者姓名',
    name: 'authorName'
  },
  {
    type: 'input',
    message: '请输入仓库名称',
    name: 'warehouseName'
  },
  {
    type: 'input',
    message: '请输入下载路径(位于当前目录的相对路径)',
    name: 'downloadPath',
    validate: val => {
    //   if (val.match (/\d{11}/g)) {
    //     return true;
    //   }
    //   return '请输入正确的路径';
      return true;
    }
    // prefix: '前缀',
    // suffix: '后缀',
  },
  {
    type: 'confirm',
    message: '是否默认master分支',
    name: 'isMaster'
  },
  //   new inquirer.Separator ('--- 分隔符 ---'), // 自定义分隔符
  {
    type: 'input',
    message: '请输入分支名称(如已选择默认分支，请按回车键)',
    name: 'branchName'
  }
];
/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-27 13:24:53
 * @LastEditTime: 2020-02-27 18:26:33
 * @LastEditors: ilovejwl
 */
// const inquirer = require ('inquirer');
module.exports = [
  {
    type: 'confirm',
    message: '是否本地仓库',
    name: 'isLocalWarehouse'
  },
  {
    type: 'input',
    message: '请输入本地仓库地址(非本地仓库，按回车键跳过)',
    name: 'localWarehouseAddress'
  },

  {
    type: 'input',
    message: '请输入作者姓名(为本地仓库，按回车键跳过)',
    name: 'authorName'
  },
  {
    type: 'input',
    message: '请输入仓库名称(为本地仓库，按回车键跳过)',
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
  }
];
/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-02 08:08:34
 * @LastEditTime : 2020-02-04 07:39:53
 * @LastEditors  : ilovejwl
 */
var figlet = require ('figlet');
const chalk = require ('chalk');

function out (text) {
  figlet (
    text || 'aiyou-ui',
    {
      // font: 'Graffiti',
      font: 'Jacky',
      // font: 'Alpha',
      horizontalLayout: 'full',
      verticalLayout: 'full'
      // font: 'Standard',
      // horizontalLayout: 'fitted',
      // verticalLayout: 'universal smushing',
    },
    function (err, text) {
      if (err) {
        console.log (chalk.red (`\noutput aiyou *** bad.\r\n`));
        console.dir (err);
        return;
      }
      console.log (chalk.rgb (128, 0, 128) (`${text}\r\n`));
    }
  );
}

module.exports = {
  out: out
};
/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-02-02 08:10:26
 * @LastEditTime : 2020-02-04 11:02:46
 * @LastEditors  : ilovejwl
 */
// const cliSpinners = require ('cli-spinners');
const cliSpinners = getSpinners ();
const ora = require ('ora');
const chalk = require ('chalk');
const out = require ('./output').out;

function init (hooks, text) {
  const list = [];
  for (const spinner in cliSpinners) {
    list.push (cliSpinners[spinner]);
  }

  let index = 0;
  const next = function () {
    if (index + 1 === list.length) {
      index = 0;
    }
    const spinner = list[index++];
    return spinner;
  };

  let mainter = null;

  const timer = setInterval (() => {
    mainter && mainter.stop ();

    const spinner = next ();
    // spinner && console.log (spinner);
    if (spinner) {
      mainter = ora ({
        spinner: spinner,
        text: `Loading ${chalk.red (text)}`
      }).start ();
    }

    const returnValue = hooks ();
    if (returnValue === 'yes') {
      mainter.text = `${chalk.red (text)} ${chalk.green ('Generation completed!')}`;
      mainter.succeed ();
      out (text);
      clearInterval (timer);
    }

    if (returnValue === 'bad') {
      mainter.text = `${chalk.green (text)} ${chalk.red ('Generation not completed!')}`;
      mainter.fail ();
      // out (text);
      clearInterval (timer);
    }
  }, 1000);
}

function getSpinners () {
  return {
    dots: {
      interval: 80,
      frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    },
    dots2: {
      interval: 80,
      frames: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
    },
    dots3: {
      interval: 80,
      frames: ['⠋', '⠙', '⠚', '⠞', '⠖', '⠦', '⠴', '⠲', '⠳', '⠓']
    },
    dots4: {
      interval: 80,
      frames: [
        '⠄',
        '⠆',
        '⠇',
        '⠋',
        '⠙',
        '⠸',
        '⠰',
        '⠠',
        '⠰',
        '⠸',
        '⠙',
        '⠋',
        '⠇',
        '⠆'
      ]
    },
    dots5: {
      interval: 80,
      frames: [
        '⠋',
        '⠙',
        '⠚',
        '⠒',
        '⠂',
        '⠂',
        '⠒',
        '⠲',
        '⠴',
        '⠦',
        '⠖',
        '⠒',
        '⠐',
        '⠐',
        '⠒',
        '⠓',
        '⠋'
      ]
    },
    dots6: {
      interval: 80,
      frames: [
        '⠁',
        '⠉',
        '⠙',
        '⠚',
        '⠒',
        '⠂',
        '⠂',
        '⠒',
        '⠲',
        '⠴',
        '⠤',
        '⠄',
        '⠄',
        '⠤',
        '⠴',
        '⠲',
        '⠒',
        '⠂',
        '⠂',
        '⠒',
        '⠚',
        '⠙',
        '⠉',
        '⠁'
      ]
    },
    dots7: {
      interval: 80,
      frames: [
        '⠈',
        '⠉',
        '⠋',
        '⠓',
        '⠒',
        '⠐',
        '⠐',
        '⠒',
        '⠖',
        '⠦',
        '⠤',
        '⠠',
        '⠠',
        '⠤',
        '⠦',
        '⠖',
        '⠒',
        '⠐',
        '⠐',
        '⠒',
        '⠓',
        '⠋',
        '⠉',
        '⠈'
      ]
    },
    dots8: {
      interval: 80,
      frames: [
        '⠁',
        '⠁',
        '⠉',
        '⠙',
        '⠚',
        '⠒',
        '⠂',
        '⠂',
        '⠒',
        '⠲',
        '⠴',
        '⠤',
        '⠄',
        '⠄',
        '⠤',
        '⠠',
        '⠠',
        '⠤',
        '⠦',
        '⠖',
        '⠒',
        '⠐',
        '⠐',
        '⠒',
        '⠓',
        '⠋',
        '⠉',
        '⠈',
        '⠈'
      ]
    },
    dots9: {
      interval: 80,
      frames: ['⢹', '⢺', '⢼', '⣸', '⣇', '⡧', '⡗', '⡏']
    },
    dots10: {
      interval: 80,
      frames: ['⢄', '⢂', '⢁', '⡁', '⡈', '⡐', '⡠']
    },
    dots11: {
      interval: 100,
      frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈']
    },
    dots12: {
      interval: 80,
      frames: [
        '⢀⠀',
        '⡀⠀',
        '⠄⠀',
        '⢂⠀',
        '⡂⠀',
        '⠅⠀',
        '⢃⠀',
        '⡃⠀',
        '⠍⠀',
        '⢋⠀',
        '⡋⠀',
        '⠍⠁',
        '⢋⠁',
        '⡋⠁',
        '⠍⠉',
        '⠋⠉',
        '⠋⠉',
        '⠉⠙',
        '⠉⠙',
        '⠉⠩',
        '⠈⢙',
        '⠈⡙',
        '⢈⠩',
        '⡀⢙',
        '⠄⡙',
        '⢂⠩',
        '⡂⢘',
        '⠅⡘',
        '⢃⠨',
        '⡃⢐',
        '⠍⡐',
        '⢋⠠',
        '⡋⢀',
        '⠍⡁',
        '⢋⠁',
        '⡋⠁',
        '⠍⠉',
        '⠋⠉',
        '⠋⠉',
        '⠉⠙',
        '⠉⠙',
        '⠉⠩',
        '⠈⢙',
        '⠈⡙',
        '⠈⠩',
        '⠀⢙',
        '⠀⡙',
        '⠀⠩',
        '⠀⢘',
        '⠀⡘',
        '⠀⠨',
        '⠀⢐',
        '⠀⡐',
        '⠀⠠',
        '⠀⢀',
        '⠀⡀'
      ]
    },
    line: {
      interval: 130,
      frames: ['-', '\\', '|', '/']
    },
    line2: {
      interval: 100,
      frames: ['⠂', '-', '–', '—', '–', '-']
    },
    pipe: {
      interval: 100,
      frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐']
    },
    simpleDots: {
      interval: 400,
      frames: ['.  ', '.. ', '...', '   ']
    },
    simpleDotsScrolling: {
      interval: 200,
      frames: ['.  ', '.. ', '...', ' ..', '  .', '   ']
    },
    star: {
      interval: 70,
      frames: ['✶', '✸', '✹', '✺', '✹', '✷']
    },
    star2: {
      interval: 80,
      frames: ['+', 'x', '*']
    },
    flip: {
      interval: 70,
      frames: ['_', '_', '_', '-', '`', '`', '\'', '´', '-', '_', '_', '_']
    },
    hamburger: {
      interval: 100,
      frames: ['☱', '☲', '☴']
    },
    growVertical: {
      interval: 120,
      frames: ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']
    },
    growHorizontal: {
      interval: 120,
      frames: ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']
    },
    balloon: {
      interval: 140,
      frames: [' ', '.', 'o', 'O', '@', '*', ' ']
    },
    balloon2: {
      interval: 120,
      frames: ['.', 'o', 'O', '°', 'O', 'o', '.']
    },
    noise: {
      interval: 100,
      frames: ['▓', '▒', '░']
    },
    bounce: {
      interval: 120,
      frames: ['⠁', '⠂', '⠄', '⠂']
    },
    boxBounce: {
      interval: 120,
      frames: ['▖', '▘', '▝', '▗']
    },
    boxBounce2: {
      interval: 100,
      frames: ['▌', '▀', '▐', '▄']
    },
    triangle: {
      interval: 50,
      frames: ['◢', '◣', '◤', '◥']
    },
    arc: {
      interval: 100,
      frames: ['◜', '◠', '◝', '◞', '◡', '◟']
    },
    circle: {
      interval: 120,
      frames: ['◡', '⊙', '◠']
    },
    squareCorners: {
      interval: 180,
      frames: ['◰', '◳', '◲', '◱']
    },
    circleQuarters: {
      interval: 120,
      frames: ['◴', '◷', '◶', '◵']
    },
    circleHalves: {
      interval: 50,
      frames: ['◐', '◓', '◑', '◒']
    },
    squish: {
      interval: 100,
      frames: ['╫', '╪']
    },
    toggle: {
      interval: 250,
      frames: ['⊶', '⊷']
    },
    toggle2: {
      interval: 80,
      frames: ['▫', '▪']
    },
    toggle3: {
      interval: 120,
      frames: ['□', '■']
    },
    toggle4: {
      interval: 100,
      frames: ['■', '□', '▪', '▫']
    },
    toggle5: {
      interval: 100,
      frames: ['▮', '▯']
    },
    toggle6: {
      interval: 300,
      frames: ['ဝ', '၀']
    },
    toggle7: {
      interval: 80,
      frames: ['⦾', '⦿']
    },
    toggle8: {
      interval: 100,
      frames: ['◍', '◌']
    },
    toggle9: {
      interval: 100,
      frames: ['◉', '◎']
    },
    toggle10: {
      interval: 100,
      frames: ['㊂', '㊀', '㊁']
    },
    toggle11: {
      interval: 50,
      frames: ['⧇', '⧆']
    },
    toggle12: {
      interval: 120,
      frames: ['☗', '☖']
    },
    toggle13: {
      interval: 80,
      frames: ['=', '*', '-']
    },
    arrow: {
      interval: 100,
      frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙']
    },
    arrow3: {
      interval: 120,
      frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
    },
    bouncingBar: {
      interval: 80,
      frames: [
        '[    ]',
        '[=   ]',
        '[==  ]',
        '[=== ]',
        '[ ===]',
        '[  ==]',
        '[   =]',
        '[    ]',
        '[   =]',
        '[  ==]',
        '[ ===]',
        '[====]',
        '[=== ]',
        '[==  ]',
        '[=   ]'
      ]
    },
    bouncingBall: {
      interval: 80,
      frames: [
        '( ●    )',
        '(  ●   )',
        '(   ●  )',
        '(    ● )',
        '(     ●)',
        '(    ● )',
        '(   ●  )',
        '(  ●   )',
        '( ●    )',
        '(●     )'
      ]
    },
    pong: {
      interval: 80,
      frames: [
        '▐⠂       ▌',
        '▐⠈       ▌',
        '▐ ⠂      ▌',
        '▐ ⠠      ▌',
        '▐  ⡀     ▌',
        '▐  ⠠     ▌',
        '▐   ⠂    ▌',
        '▐   ⠈    ▌',
        '▐    ⠂   ▌',
        '▐    ⠠   ▌',
        '▐     ⡀  ▌',
        '▐     ⠠  ▌',
        '▐      ⠂ ▌',
        '▐      ⠈ ▌',
        '▐       ⠂▌',
        '▐       ⠠▌',
        '▐       ⡀▌',
        '▐      ⠠ ▌',
        '▐      ⠂ ▌',
        '▐     ⠈  ▌',
        '▐     ⠂  ▌',
        '▐    ⠠   ▌',
        '▐    ⡀   ▌',
        '▐   ⠠    ▌',
        '▐   ⠂    ▌',
        '▐  ⠈     ▌',
        '▐  ⠂     ▌',
        '▐ ⠠      ▌',
        '▐ ⡀      ▌',
        '▐⠠       ▌'
      ]
    },
    shark: {
      interval: 120,
      frames: [
        '▐|\\____________▌',
        '▐_|\\___________▌',
        '▐__|\\__________▌',
        '▐___|\\_________▌',
        '▐____|\\________▌',
        '▐_____|\\_______▌',
        '▐______|\\______▌',
        '▐_______|\\_____▌',
        '▐________|\\____▌',
        '▐_________|\\___▌',
        '▐__________|\\__▌',
        '▐___________|\\_▌',
        '▐____________|\\▌',
        '▐____________/|▌',
        '▐___________/|_▌',
        '▐__________/|__▌',
        '▐_________/|___▌',
        '▐________/|____▌',
        '▐_______/|_____▌',
        '▐______/|______▌',
        '▐_____/|_______▌',
        '▐____/|________▌',
        '▐___/|_________▌',
        '▐__/|__________▌',
        '▐_/|___________▌',
        '▐/|____________▌'
      ]
    },
    dqpb: {
      interval: 100,
      frames: ['d', 'q', 'p', 'b']
    },
    grenade: {
      interval: 80,
      frames: [
        '،   ',
        '′   ',
        ' ´ ',
        ' ‾ ',
        '  ⸌',
        '  ⸊',
        '  |',
        '  ⁎',
        '  ⁕',
        ' ෴ ',
        '  ⁓',
        '   ',
        '   ',
        '   '
      ]
    },
    point: {
      interval: 125,
      frames: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙']
    },
    layer: {
      interval: 150,
      frames: ['-', '=', '≡']
    },
    betaWave: {
      interval: 80,
      frames: [
        'ρββββββ',
        'βρβββββ',
        'ββρββββ',
        'βββρβββ',
        'ββββρββ',
        'βββββρβ',
        'ββββββρ'
      ]
    }
  };
}

module.exports = {
  init: init
};
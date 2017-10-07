const fs = require('fs');

const config = require('./whirl.config.json');

const getArgs = function(args) {
  var opts = {};
  args = args.slice(2);
  while(args.length > 0) {
    var opt = args.shift();
    if (opt.indexOf('--') !== -1 || opt.indexOf('-') !== -1) {
      opt = opt.replace(new RegExp('-', 'g'), '');
      if (args[0].indexOf('--') === -1 || args[0].indexOf('-') === -1) {
        opts[opt] = args.shift();
      } else {
        opts[opt] = true;
      }
    } else {
      opts.input = opt;
    }
  }
  return opts;
};

const args = getArgs(process.argv);

// Update the config and then create the new style file...
const addToConfig = (name, required = 0) => {
  if (config.whirls[name]) throw Error('A whirl with that name already exists');
  config.whirls[name] = {};
  config.whirls[name].requiredElements = required;
};

const orderAndWrite = () => {
  const newConfig = {};
  newConfig.whirls = {};
  const ordered = Object.keys(config.whirls).sort();

  for (let i = 0; i < ordered.length; i++) {
    newConfig.whirls[ordered[i]] = config.whirls[ordered[i]];
  }

  const content = `@import '../vars.styl'
/**
  * ${args.name}
  *
  * @author jh3y - https://github.com/jh3y
*/
`;

  fs.writeFileSync(`./src/whirl/whirls/${args.name}.styl`, content);
  fs.writeFileSync('whirl.config.json', JSON.stringify(newConfig, null, 2));
};

addToConfig(args.name, parseInt(args.required, 10));
orderAndWrite();

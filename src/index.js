import { Command } from 'commander';

const program = new Command();

import Compiler from './compiler.js'

program
  .name('cross-defs')
  .description('Generate language defintions from JSON manifest')
  .version('1.0.0');

program.command('build')
  .description('Build language definitions')
  .argument('<string>', 'Input JSON manifest')
  .option('-o,--output <string...>', 'Language output types and path. Eg. `-o json:output.json c:output.h`')
  .action((str, options) => {
    const compiler = new Compiler();
    compiler.parse(str);
    
    for(var k in options.output) {
        var parts = options.output[k].split(":")
        if(parts.length != 2) continue;
        compiler.compile(parts[0], parts[1])
    }

  });

program.parse();


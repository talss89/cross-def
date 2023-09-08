import fs from 'fs'
import path from 'path'
import generators from './generators/index.js'

export default class Compiler {

    manifest = {}
    symbols = []

    parse(fn) {
        this.manifest = JSON.parse(fs.readFileSync(fn))

        this.manifest.define.forEach((definition, definition_index) => {
            this.symbols[definition_index] = [];

            definition.symbols.forEach((symbol, index) => {    
                if(Array.isArray(symbol)) {
                    this.symbols[definition_index].push({ sym: symbol[0], val: symbol[2] ?? index, label: symbol[1] ?? undefined});
                } else {
                    this.symbols[definition_index].push({ sym: symbol, val: index });
                }
            });
        });
    }

    compile(lang, fn) {
        let output = '';
        output = generators[lang]().generate(this.symbols, this.manifest.define, this.manifest.config);
        fs.writeFileSync(path.resolve(process.cwd(), fn), output);
    }

}

// const args = arg({
// 	// Types
// 	'-i': String,
//     '-c': String,
//     '-j': String
// });

// const defs = require(path.resolve(process.cwd(), args['-i']));

// var c_output = "";
// var js_output = {};

// c_output = "// This file is generated automatically. DO NOT EDIT.\n\n#pragma once\n\n";

// defs.forEach(def => {
//     js_output[def.type_t] = {};
//     c_output += "typedef enum {\n";

//     def.symbols.forEach((symbol, index) => {
//         js_output[def.type_t][symbol] = index;
//         c_output += '    ' + symbol + ' = 0x' + index.toString(16).toUpperCase() + ',\n';        
//     });

//     c_output += '} ' + def.type_t + ';\n\n';
// });

// fs.writeFileSync(path.resolve(process.cwd(), args['-c']), c_output);
// fs.writeFileSync(path.resolve(process.cwd(), args['-j']), JSON.stringify(js_output));

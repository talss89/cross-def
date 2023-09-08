export default () => ({
    generate(symbols, definitions, config) {
        let output = config.lang.c.file_header ?? "/* This file is generated automatically. DO NOT EDIT. */";
        
        output += "\n";

        definitions.forEach((definition, index) => {
            switch(definition.lang.c.type) {
                case 'typedef enum':
                default:
                    output += this.generate_typedef_enum(symbols[index], definition, config)
                    break;
            }

            if(definition.lang.c.labels === true) {
                output += this.generate_labels(symbols[index], definition, config)
            }
        });

        return output;
    },

    generate_typedef_enum(symbols, definition, config) {
        let output = "typedef enum {\n";
        
        symbols.forEach((symbol) => {
            output += '    ' + symbol.sym + ' = 0x' + symbol.val.toString(16).toUpperCase() + ',\n';       
        });

        output += '} ' + definition.lang.c.name + ';\n\n';

        return output;
    },

    generate_labels(symbols, definition, config) {
        let output = "static const char* "+ definition.lang.c.name + "_labels["+symbols.length+"] = {\n";
        let labels = [];
        let last_val = -1;

        symbols.forEach((symbol) => {

            if(last_val != symbol.val - 1) {
                throw new Error('Cannot create C labels for non contigious symbol values.');
            }

            labels.push('    "' + (symbol.label ?? '') + '"');    
            last_val = symbol.val;   
        });

        output += labels.join(', \n') + '\n};\n\n';

        return output;
    }
})
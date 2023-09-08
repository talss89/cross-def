export default () => ({
    generate(symbols, definitions, config) {
        let output = {};

        definitions.forEach((definition, index) => {
            switch(definition.lang.json.type) {
                case 'map':
                default:
                    if(definition.lang.json.labels) {
                        output[definition.lang.json.name] = this.generate_label_map(symbols[index], definition, config)
                    } else {
                        output[definition.lang.json.name] = this.generate_map(symbols[index], definition, config)
                    }
                    break;
                    
            }
        });

        return JSON.stringify(output);
    },

    generate_map(symbols, definition, config) {
        let output = {};
        
        symbols.forEach((symbol) => {
            output[symbol.sym] = symbol.val;
        });

        return output;
    },

    generate_label_map(symbols, definition, config) {
        let output = {};
        
        symbols.forEach((symbol) => {
            output[symbol.sym] = {val: symbol.val, label: symbol.label ?? ""};
        });

        return output;
    }
})
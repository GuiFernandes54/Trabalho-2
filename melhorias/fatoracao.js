// melhorias/fatoracao.js
function leftFactoring(grammar) {
    const { startSymbol, productions } = grammar;
    const newProductions = { ...productions };

    Object.keys(productions).forEach(nonTerminal => {
        const rules = productions[nonTerminal];
        const prefixMap = {};

        rules.forEach(rule => {
            const prefix = rule[0];
            if (!prefixMap[prefix]) {
                prefixMap[prefix] = [];
            }
            prefixMap[prefix].push(rule.slice(1));
        });

        const newRules = [];
        Object.keys(prefixMap).forEach(prefix => {
            const suffixes = prefixMap[prefix];
            if (suffixes.length > 1) {
                const newNonTerminal = `${nonTerminal}_${prefix}`;
                newProductions[newNonTerminal] = suffixes.map(suffix => suffix || '');
                newRules.push(`${prefix}${newNonTerminal}`);
            } else {
                newRules.push(`${prefix}${suffixes[0]}`);
            }
        });
        newProductions[nonTerminal] = newRules;
    });

    return { startSymbol, productions: newProductions };
}

module.exports = leftFactoring;

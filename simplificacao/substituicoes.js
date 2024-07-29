// simplificacao/substituicoes.js
function substituteProductions(grammar) {
    const { startSymbol, productions } = grammar;
    const newProductions = { ...productions };

    Object.keys(productions).forEach(nonTerminal => {
        productions[nonTerminal].forEach(rule => {
            if (/^[A-Z]$/.test(rule)) {
                newProductions[nonTerminal] = newProductions[nonTerminal].filter(r => r !== rule);
                newProductions[nonTerminal].push(...newProductions[rule]);
            }
        });
    });

    return { startSymbol, productions: newProductions };
}

module.exports = substituteProductions;

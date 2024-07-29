// simplificacao/producoes-vazias.js
function removeEmptyProductions(grammar) {
    const { startSymbol, productions } = grammar;
    const nullable = new Set();
    
    // Find nullable variables
    let changed;
    do {
        changed = false;
        Object.keys(productions).forEach(nonTerminal => {
            productions[nonTerminal].forEach(rule => {
                if (rule === '' || rule.split('').every(symbol => nullable.has(symbol))) {
                    if (!nullable.has(nonTerminal)) {
                        nullable.add(nonTerminal);
                        changed = true;
                    }
                }
            });
        });
    } while (changed);

    // Remove empty productions
    const newProductions = {};
    Object.keys(productions).forEach(nonTerminal => {
        newProductions[nonTerminal] = productions[nonTerminal].filter(rule => rule !== '');
    });

    // Add new productions for nullable variables
    Object.keys(productions).forEach(nonTerminal => {
        productions[nonTerminal].forEach(rule => {
            const symbols = rule.split('');
            const nullableCombinations = (1 << symbols.length) - 1;
            for (let i = 1; i <= nullableCombinations; i++) {
                const newRule = symbols.filter((_, idx) => (i & (1 << idx)) === 0).join('');
                if (newRule && !newProductions[nonTerminal].includes(newRule)) {
                    newProductions[nonTerminal].push(newRule);
                }
            }
        });
    });

    return { startSymbol, productions: newProductions };
}

module.exports = removeEmptyProductions;

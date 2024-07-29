// normalizacao/chomsky.js
function convertToChomskyNormalForm(grammar) {
    const { startSymbol, productions } = grammar;
    let newProductions = { ...productions };
    
    // Step 1: Eliminate terminals from rules longer than 1
    Object.keys(newProductions).forEach(nonTerminal => {
        newProductions[nonTerminal] = newProductions[nonTerminal].map(rule => {
            if (rule.length > 1) {
                return rule.split('').map(symbol => {
                    if (/[a-z]/.test(symbol)) {
                        const newNonTerminal = `X_${symbol}`;
                        if (!newProductions[newNonTerminal]) {
                            newProductions[newNonTerminal] = [symbol];
                        }
                        return newNonTerminal;
                    }
                    return symbol;
                }).join('');
            }
            return rule;
        });
    });

    // Step 2: Break rules with more than 2 non-terminals
    const newRules = {};
    Object.keys(newProductions).forEach(nonTerminal => {
        newProductions[nonTerminal].forEach(rule => {
            if (rule.length > 2) {
                let lastNonTerminal = rule[0];
                for (let i = 1; i < rule.length - 1; i++) {
                    const newNonTerminal = `Y_${nonTerminal}_${i}`;
                    newRules[newNonTerminal] = [`${lastNonTerminal}${rule[i]}`];
                    lastNonTerminal = newNonTerminal;
                }
                newRules[nonTerminal] = [`${lastNonTerminal}${rule[rule.length - 1]}`];
            } else {
                newRules[nonTerminal] = rule;
            }
        });
    });

    return { startSymbol, productions: { ...newProductions, ...newRules } };
}

module.exports = convertToChomskyNormalForm;

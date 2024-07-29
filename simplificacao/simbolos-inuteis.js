// simplificacao/simbolos-inuteis.js
function removeUnreachableSymbols(grammar) {
    const reachable = new Set();
    const { startSymbol, productions } = grammar;

    function visit(symbol) {
        if (!reachable.has(symbol)) {
            reachable.add(symbol);
            (productions[symbol] || []).forEach(rule => {
                rule.split('').forEach(s => {
                    if (/[A-Z]/.test(s)) {
                        visit(s);
                    }
                });
            });
        }
    }

    visit(startSymbol);

    const newProductions = {};
    reachable.forEach(symbol => {
        if (productions[symbol]) {
            newProductions[symbol] = productions[symbol];
        }
    });

    return { startSymbol, productions: newProductions };
}

module.exports = removeUnreachableSymbols;

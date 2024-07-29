// melhorias/recursao.js
function removeLeftRecursion(grammar) {
    const { startSymbol, productions } = grammar;
    const newProductions = { ...productions };

    Object.keys(productions).forEach(nonTerminal => {
        const rules = productions[nonTerminal];
        const directRecursive = [];
        const nonRecursive = [];

        rules.forEach(rule => {
            if (rule[0] === nonTerminal) {
                directRecursive.push(rule.slice(1));
            } else {
                nonRecursive.push(rule);
            }
        });

        if (directRecursive.length > 0) {
            const newNonTerminal = `${nonTerminal}'`;
            newProductions[nonTerminal] = nonRecursive.map(rule => rule + newNonTerminal);
            newProductions[newNonTerminal] = directRecursive.map(rule => rule + newNonTerminal).concat(['']);
        }
    });

    return { startSymbol, productions: newProductions };
}

module.exports = removeLeftRecursion;

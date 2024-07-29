// normalizacao/greibach.js
function convertToGreibachNormalForm(grammar) {
    const { startSymbol, productions } = grammar;
    let newProductions = { ...productions };

    // Apply transformation to convert grammar to Greibach Normal Form
    // This requires a series of steps including ordering, substitution, and ensuring
    // the correct form A -> aα with α being a string of variables.

    // Simplified approach: ensure every production starts with a terminal or convert it to
    // appropriate form by creating intermediate productions if necessary.

    // Step 1: Ensure start symbol does not appear on the right side
    const newStartSymbol = 'S0';
    newProductions[newStartSymbol] = [startSymbol];

    // Step 2: Convert to Greibach Normal Form
    Object.keys(newProductions).forEach(nonTerminal => {
        newProductions[nonTerminal] = newProductions[nonTerminal].map(rule => {
            if (/^[A-Z]/.test(rule[0])) {
                const firstNonTerminal = rule[0];
                const suffix = rule.slice(1);
                return newProductions[firstNonTerminal].map(subRule => {
                    return `${subRule}${suffix}`;
                });
            }
            return rule;
        }).flat();
    });

    return { startSymbol: newStartSymbol, productions: newProductions };
}

module.exports = convertToGreibachNormalForm;

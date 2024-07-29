const fs = require('fs');
const path = require('path');

const removeUnreachableSymbols = require('./simplificacao/simbolos-inuteis');
const removeEmptyProductions = require('./simplificacao/producoes-vazias');
const substituteProductions = require('./simplificacao/substituicoes');
const convertToChomskyNormalForm = require('./normalizacao/chomsky');
const convertToGreibachNormalForm = require('./normalizacao/greibach');
const leftFactoring = require('./melhorias/fatoracao');
const removeLeftRecursion = require('./melhorias/recursao');

// Leitura da gramática do arquivo
const grammarPath = path.join(__dirname, 'grammar.json');
const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf-8'));

// Simplificação
let simplifiedGrammar = removeUnreachableSymbols(grammar);
simplifiedGrammar = removeEmptyProductions(simplifiedGrammar);
simplifiedGrammar = substituteProductions(simplifiedGrammar);

// Normalização
let chomskyGrammar = convertToChomskyNormalForm(simplifiedGrammar);
let greibachGrammar = convertToGreibachNormalForm(simplifiedGrammar);

// Melhorias
let factoredGrammar = leftFactoring(greibachGrammar);
let noLeftRecursionGrammar = removeLeftRecursion(factoredGrammar);

// Salvar as gramáticas transformadas em arquivos
fs.writeFileSync('simplifiedGrammar.json', JSON.stringify(simplifiedGrammar, null, 2));
fs.writeFileSync('chomskyGrammar.json', JSON.stringify(chomskyGrammar, null, 2));
fs.writeFileSync('greibachGrammar.json', JSON.stringify(greibachGrammar, null, 2));
fs.writeFileSync('factoredGrammar.json', JSON.stringify(factoredGrammar, null, 2));
fs.writeFileSync('noLeftRecursionGrammar.json', JSON.stringify(noLeftRecursionGrammar, null, 2));

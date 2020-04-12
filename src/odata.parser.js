import Tree from '../BinaryTree/tree';
import LogicalConnectors from './logical.connectors';

const STR_VALUE_REGEX = new RegExp("'[^]+'");

function getStringValueTokens(str) {
    let result,
        strValueTokens = [],
        counter = 0;

    while((result = STR_VALUE_REGEX.exec(str)) !== null) {
        str = str.replace(result, `{${ counter }}`);
        strValueTokens.push({ placeHolder: counter, value: result });
        counter++;
    }

    return strValueTokens;
};

function parser(str) {
    let tokens = [...str],
        stack = [],
        parent = null,
        tree = new Tree(),
        currentTree = tree;

    tokens.forEach(char => {
        switch(char) {
            case " ": break;
            case "(":
                currentTree.addLeft("");
                stack.push(currentTree);
                currentTree = currentTree.getLeft();
                break;
            case ")":
                currentTree = stack.pop();
                break;
            case "and":
            case "or":
            case "eq":
                currentTree.setValue(char);
                currentTree.addRight("");
                stack.push(currentTree);
                currentTree = currentTree.getRight();
                break;
            default:
                currentTree.setValue(char);
                parent = stack.pop();
                currentTree = parent;
        }
    });

    return tree;
};

window.Parser = parser;
export default parser;
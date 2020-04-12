import Tree from '../BinaryTree/tree';
import LogicalConnectors from './logical.connectors';

const STR_VALUE_REGEX = new RegExp("'[^]+'");
const LOGICAL_OP_REGEX = LogicalConnectors.map(t => new RegExp(`\\s${ t }\\s`));
const PROPERTY_REGEX = new RegExp("(?:^|\\s)([\\w']+)\\b|(?:^|\\s)");

function getStringValueTokens(str) {
    let result,
        strValueTokens = [],
        counter = 0;

    while ((result = STR_VALUE_REGEX.exec(str)) !== null) {
        str = str.replace(result, `{V:${ counter }}`);
        strValueTokens.push({ placeHolder: counter, value: result[0] });
        counter++;
    }

    return strValueTokens;
};

function getLogicalOperatorsTokens(str) {
    let result,
        logicalOpTokens = [],
        counter = 0;

    LOGICAL_OP_REGEX.forEach(t => {
        while ((result = t.exec(str)) !== null) {
            str = str.replace(result, `{LO:${ counter }}`);
            logicalOpTokens.push({ placeHolder: counter, value: result[0] });
            counter++;
        }
    });

    return logicalOpTokens;
};

function getPropertyTokens(str) {
    let result,
        propertyTokens = [],
        counter = 0;

    while ((result = PROPERTY_REGEX.exec(str)) !== null) {
        str = str.replace(result, `{P:${ counter }}`);
        propertyTokens.push({ placeHolder: counter, value: result[0] });
        counter++;
    }

    return propertyTokens;
};

window.getPropertyTokens = getPropertyTokens;

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
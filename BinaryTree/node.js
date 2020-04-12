export default class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    setValue(value) {
        this.value = value;
    }

    addLeft(value) {
        this.left = new Node(value);
    }

    addRight(value) {
        this.right = new Node(value);
    }
}
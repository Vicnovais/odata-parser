import Node from './node';

export default class Tree {
    constructor() {
        this.root = new Node("");
    }

    addLeft(value) {
        this.root.addLeft(value);
    }

    getLeft() {
        return this.root.getLeft();
    }

    addRight(value) {
        this.root.addRight(value);
    }

    getRight() {
        return this.root.getRight();
    }

    setValue(value) {
        this.root.setValue(value);
    }
}
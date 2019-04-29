class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

/**
 * 单链表类
 */
class SinglyLinkedList {
    constructor() {
        this.head = new Node('head')
    }

    findByValue(element) {
        let currentNode = this.head
        while(currentNode.element !== element && currentNode.next !== null) {
            currentNode = currentNode.next
        }

        return currentNode
    }

    insert() {

    }
}
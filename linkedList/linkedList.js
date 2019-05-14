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
        this.head = null
        this.length = 0
    }

    /**
     * 
     * @param {Array} array 
     * 
     * @return {SinglyLinkedList}
     */
    static create(array) {
        const link = new SinglyLinkedList()
        array.forEach(element => {

            link.append(new Node(element))

        });

        return link
    }

    findByValue(element) {
        let currentNode = this.head
        while (currentNode.element !== element && currentNode.next !== null) {
            currentNode = currentNode.next
        }

        return currentNode
    }

    append(node) {
        let currentNode

        if (this.head === null) {
            this.head = node
        } else {
            currentNode = this.head
            while (currentNode.next !== null) {
                currentNode = currentNode.next
            }
            currentNode.next = node
        }

        return ++this.length
    }

    insert(position, node) {
        let currentNode = this.head,
            i = 0

        if (position < 0 || position > this.length) return false

        // 首尾边界情况
        if (position === 0) {
            node.next = this.head.next
            this.head = node
            this.length++

                return true
        }
        if (position === this.length) {
            while (currentNode.next !== null) {
                currentNode = currentNode.next
            }
            currentNode.next = node
            this.length++

                return true
        }

        while (i < position - 1) {
            currentNode = currentNode.next
            i++
        }
        node.next = currentNode.next
        currentNode.next = node
        this.length++

            return true
    }

    /**
     * 
     * @param {number} position 
     * 
     * @return {Node || null} 返回移除的节点
     */
    removeAt(position) {
        let currentNode = this.head,
            i = 0,
            previous

        if (position < 0 || position > this.length - 1) return null

        if (position === 0) {
            this.head = this.head.next
        } else {
            while (i++ < position) {
                previous = currentNode
                currentNode = currentNode.next
            }
            previous.next = currentNode.next
        }

        this.length--

            return currentNode
    }
}

// TODO: 双链表

// TODO: 循环单链表

// TODO: 循环双链表

module.exports = {
    SinglyLinkedList,
    Node
}
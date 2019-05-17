/**
 * 1) 单链表
 *      - 环检测
 *      - 单链表反转
 *      - 两个有序链表的合并
 * 2) 双链表
 * 3) 循环单链表
 * 4) 循环双链表
 */

class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class DoubleLinkedNode extends Node {
    constructor(element) {
        super(element)
        this.pre = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    display() {
        let currentNode = this.head
        let res = ''

        while (currentNode !== null) {
            res += currentNode.element + '=>'
            currentNode = currentNode.next
        }
        console.log(res)
    }
}

/**
 * 单链表类 无头链表（不带哨兵节点）
 */
class SinglyLinkedList extends LinkedList {
    constructor() {
        super()
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

    findPrev(element) {
        let currentNode = this.head
        if (currentNode === null) return -1

        while (currentNode.next !== null && currentNode.next.element !== element) {
            currentNode = currentNode.next
        }

        if (currentNode.next === null) return -1

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

    remove(element) {
        const node = this.findByValue(element)
        if (node === -1) return false

        // 无头链表要处理边界情况
        if (this.length === 1) {
            this.head = null
            return true
        }
        let prevNode = this.findPrev(element)
        prevNode.next = node.next
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

    // 单链表翻转
    reverse() {
        this.display()
        let pre = null
        let temp = null
        let currentNode = this.head

        // 关键在额外的两个指针粉分别索引到上下两个节点
        while (currentNode !== null) {
            temp = currentNode.next
            currentNode.next = pre
            pre = currentNode
            currentNode = temp
        }
        
        this.head = pre
        this.display()
    }

    // 环检测
    checkCircle() {
        if (this.length < 1) return false

        let fast = this.head.next
        let slow = this.head
        while (fast != null && fast.next != null) {
            fast = fast.next.next
            slow = slow.next
            if (fast === slow) return true
        }

        return false
    }

    /**
     * 克隆
     */
    copy() {
        let currentNode = this.head
        const list = new SinglyLinkedList()
        while(currentNode !== null) {
            const node = new Node(currentNode.element)
            node.next = currentNode.next
            list.append(node)
        }

        return list
    }

    // TODO: 两个有序的链表合并
    // 删除链表倒数第n个结点
    // 求链表的中间结点
}

// 双链表 带头链表
class DoubleLinkedList extends LinkedList {
    constructor() {
        super()
        this.head = new DoubleLinkedNode('HEAD')
    }

    append(element) {
        const node = new DoubleLinkedNode(element)
        let currentNode = this.head

        while (currentNode.next !== null) {
            currentNode = currentNode.next
        }
        currentNode.next = node
        node.pre = currentNode

        return ++this.length
    }

    findByValue(element) {
        let currentNode = this.head
        while (currentNode !== null && currentNode.element !== element) {
            currentNode = currentNode.next
        }

        return currentNode !== null ? currentNode : -1
    }

    /**
     * 指定元素向后插入
     * 
     * @param {*} newElement 
     * @param {*} element 
     */
    insert(newElement, element) {
        const node = this.findByValue(element)
        if (node === -1) return false

        const newNode = new DoubleLinkedNode(newElement)
        newNode.next = node.next
        node.next = newNode
        newNode.pre = node
        if (newNode.next !== null) {
            newNode.next.pre = newNode
        }

        this.length++

        return true
    }

    remove(element) {
        const node = this.findByValue(element)
        if (node === -1) return false

        node.pre.next = node.next
        if (node.next !== null) {
            node.next.pre = node.pre
        }

        node.next = null
        node.pre = null

        this.length--

        return true
    }
}

// TODO: 循环单链表

// TODO: 循环双链表

module.exports = {
    SinglyLinkedList,
    DoubleLinkedList,
    Node,
    DoubleLinkedNode
}
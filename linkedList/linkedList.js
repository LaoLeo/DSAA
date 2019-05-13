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

// test
const str = 'kdkddkdk'
const str_not = 'segjdjrssree'

const link = SinglyLinkedList.create(str.split())
const link_strnot = SinglyLinkedList.create(str_not.split())
console.debug(str + ' isPalindrome:', isPalindrome(link))
console.debug(str_not + ' isPalindrome:', isPalindrome(link_strnot))

/**
 * 判断是否为回文串
 * 
 * 
 */
function isPalindrome(link) {
    if (link.length <= 1) return true

    let fast = link.head
    let slow = link.head
    let pre = null
    let temp = null

    while (fast != null && fast.next != null) {
        fast = fast.next.next

        // 关键
        temp = slow.next
        slow.next = pre
        pre = slow
        slow = temp
    }

    if (fast != null) {
        slow = slow.next
    }

    while (slow != null) {
        if (slow.element !== pre.element) {
            return false
        }

        slow = slow.next
        pre = pre.next
    }

    return true
}
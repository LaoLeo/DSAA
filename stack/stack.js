class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

/**
 * 基于链表的栈
 */
class StackBaseOnLinklist {
    constructor() {
        this.top = null
    }

    push(element) {
        const node = new Node(element)
        node.next = this.top
        this.top = node
    }

    pop() {
        if (!this.top) return null

        const element = this.top.element
        this.top = this.top.next
        return element
    }

    clear() {
        this.top = null
    }

    display() {
        if (!this.top) return

        let curr = this.top
        let s = ''
        while (curr) {
            s += curr.element + '=>'
            curr = curr.next
        }

        console.log(s)
    }
}

module.exports = {
    StackBaseOnLinklist
}
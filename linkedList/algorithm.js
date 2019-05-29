const {
    SinglyLinkedList,
    Node
} = require('./linkedList')

// TODO: LRU算法
class LRU {
    constructor(files = [], max = 5) {
        files = files.slice(0, max)
        this.max = max
        this.linkedList = SinglyLinkedList.create(files)
        console.log('缓存的文件有：', files.join('=>'))
    }

    fetchFile(fileName) {
        let currentNode = this.linkedList.head      
        let pre = null

        while (currentNode !== null && currentNode.element !== fileName) {
            pre = currentNode
            currentNode = currentNode.next
        }
        

        if (currentNode !== null) {
            // 命中
            console.log('命中, 从缓存返回：', currentNode.element)
            if (pre) {
                pre.next = currentNode.next
            } else {
                this.linkedList.head = currentNode.next
            }
            currentNode.next = null
            this.linkedList.append(currentNode)
            this.linkedList.length-- // append加1，实际是移动不用加1
        } else {
            // 不命中
            console.log('缓存中没有:', fileName)
            console.log('获取'+fileName+'中...')
            console.log('放进缓存')
            if (this.linkedList.length >= this.max) this.linkedList.pop()
            this.linkedList.append(new Node(fileName))
        }

        console.log('缓存列表:')
        this.linkedList.display()
    }
}

module.exports = {
    isPalindrome,
    concatOrderedList,
    mergeSortedLists,
    LRU
}

/**
 * 判断是否为回文串
 * 
 * @param {SinglyLinkedList} link
 * 
 * @return {Boolean}
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

/**
 * 从小到大合并两个有序链表
 * 
 * @param {SinglyLinkedList} a 
 * @param {SinglyLinkedList} b 
 */
function concatOrderedList(a, b) {
    if (!a.length || !b.length) {
        return a.length ? a.copy() : (b.length ? b.copy() : false)
    }

    let list = new SinglyLinkedList()
    let $a = a.head
    let $b = b.head
    while ($a !== null && $b !== null) {
        let element

        if ($a.element > $b.element) {
            element = $b.element
            $b = $b.next
        } else if ($a.element < $b.element) {
            element = $a.element
            $a = $a.next
        } else {
            element = $a.element
            list.append(new Node(element))
            $b = $b.next
            $a = $a.next

        }
        list.append(new Node(element))
    }

    let $p = $a === null ? $b : $a
    while ($p !== null) {
        list.append(new Node($p.element))
        $p = $p.next
    }

    return list
}

/**
 * 合并两个有序链表，不克隆版
 */
function mergeSortedLists(listA, listB) {
    if (!listA.length) return listB
    if (!listB.length) return listA

    let a = listA.head
    let b = listB.head
    let resultLink = null
    if (a.element < b.element) {
        resultLink = listA
        a = a.next
    } else {
        resultLink = linkB
        b = b.next
    }

    let currentNode = resultLink.head
    while (a !== null && b !== null) {
        if (a.element < b.element) {
            currentNode.next = a
            a = a.next
        } else {
            currentNode.next = b
            b = b.next
        }

        currentNode = currentNode.next
    }

    if (a === null) {
        currentNode.next = b
    } else {
        currentNode.next = a
    }

    return resultLink
}
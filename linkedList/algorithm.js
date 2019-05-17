module.exports = {
    isPalindrome,
    concatOrderedList,
    mergeSortedLists
}

const { SinglyLinkedList, Node } = require('./linkedList')

// TODO: LRU算法


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
module.exports = {
    isPalindrome
}

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
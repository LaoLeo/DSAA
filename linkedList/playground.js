const { SinglyLinkedList, DoubleLinkedList } = require('./linkedList')
const { isPalindrome, concatOrderedList, mergeSortedLists } = require('./algorithm')

// isPalidrome
const str = 'kdkddkdk'
const str_not = 'segj'

const link = SinglyLinkedList.create(str.split(''))
const link_strnot = SinglyLinkedList.create(str_not.split(''))
link.reverse()
link_strnot.reverse()
console.debug(str + ' isPalindrome:', isPalindrome(link))
console.debug(str_not + ' isPalindrome:', isPalindrome(link_strnot))

console.log("========concatOrderedList=========")
const link_order_1 = SinglyLinkedList.create([1, 5, 6 ,8])
const link_order_2 = SinglyLinkedList.create([3, 4, 5 ,6])
const link_concat = concatOrderedList(link_order_1, link_order_2)
const link_merge = mergeSortedLists(link_order_1, link_order_2)
link_concat.display()
link_merge.display()
link_order_1.display()
link_order_2.display()

console.log("========doubleLinkedList=========")
const doubleLink = new DoubleLinkedList()
doubleLink.append('a')
doubleLink.append('b')
doubleLink.append('c')
doubleLink.display()
doubleLink.insert('d', 'a')
doubleLink.insert('e', 'c')
doubleLink.display()
doubleLink.remove('a')
doubleLink.remove('b')
doubleLink.remove('e')
doubleLink.display()
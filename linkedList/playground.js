const { SinglyLinkedList, DoubleLinkedList } = require('./linkedList')
const { isPalindrome } = require('./algorithm')

// isPalidrome
const str = 'kdkddkdk'
const str_not = 'segj'

const link = SinglyLinkedList.create(str.split(''))
const link_strnot = SinglyLinkedList.create(str_not.split(''))
link.reverse()
link_strnot.reverse()
console.debug(str + ' isPalindrome:', isPalindrome(link))
console.debug(str_not + ' isPalindrome:', isPalindrome(link_strnot))

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
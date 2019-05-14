const { SinglyLinkedList } = require('./linkedList')
const { isPalindrome } = require('./algorithm')

// isPalidrome
const str = 'kdkddkdk'
const str_not = 'segjdjrssree'

const link = SinglyLinkedList.create(str.split(''))
const link_strnot = SinglyLinkedList.create(str_not.split(''))
console.debug(str + ' isPalindrome:', isPalindrome(link))
console.debug(str_not + ' isPalindrome:', isPalindrome(link_strnot))
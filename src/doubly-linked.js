class DoublyLinkedListNode {
  constructor(data) {
    this.data = data
    this.next = null
    this.previous = null
  }
}

const head = Symbol('head')
const tail = Symbol('tail')

class DoublyLinkedList {
  constructor() {
    this[head] = null
    this[tail] = null
  }

  add(data) {
    // create the new node and place the data in it
    const newNode = new DoublyLinkedListNode(data)

    // special case: no nodes in the list yet
    if (this[head] === null) {
      this[head] = newNode
    } else {
      // link the current tail and new tail
      this[tail].next = newNode
      newNode.previous = this[tail]
    }

    // reassign the tail to be the new node
    this[tail] = newNode
  }

  get(index) {
    // ensure `index` is a positive value
    if (index > -1) {
      // the pointer to use for traversal
      let current = this[head]
      // used to keep track of where in the list you are
      let i = 0
      // traverse the list until you reach either the end or the index
      while ((current !== null) && (i < index)) {
        current = current.next
        i++
      }
      // return the data if `current` isn't null
      return current !== null ? current.data : undefined
    } else {
      return undefined
    }
  }

  remove(index) {
    // special cases: no nodes in the list or `index` is negative
    if ((this[head] === null) || (index < 0)) {
      throw new RangeError(`Index ${index} does not exist in the list.`)
    }

    // special case: removing the first node
    if (index === 0) {
      // store the data from the current head
      const data = this[head].data

      // just replace the head with the next node in the list
      this[head] = this[head].next

      // special case: there was only one node, so also reset `this[tail]`
      if (this[head] === null) {
        this[tail] = null
      } else {
        this[head].previous = null
      }

      // return the data at the previous head of the list
      return data
    }

    // pointer use to traverse the list
    let current = this[head]

    // used to track how deep into the list you are
    let i = 0

    // same loop as in `get()`
    while ((current !== null) && (i < index)) {

      // traverse to the next node
      current = current.next

      // increment the count
      i++
    }

    // if node was found, remove it
    if (current !== null) {

      // skip over the node to remove
      current.previous.next = current.next

      // special case: this is the last node so reset `this[tail]`.
      if (this[tail] === current) {
        this[tail] = current.previous
      } else {
        current.next.previous = current.previous
      }

      // return the value that was just removed from the list
      return current.data
    }

    // if node wasn't found, throw an error
    throw new RangeError(`Index ${index} does not exist in the list.`)
  }

  * reverse() {
    // start by looking at the tail
    let current = this[tail]

    // follow the previous links to the head
    while (current !== null) {
      yield current.data
      current = current.previous
    }
  }

  [Symbol.iterator]() {
    return this.reverse()
  }
}
class LinkedListNode {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

const head = Symbol('head')

class LinkedList {
  constructor() {
    this[head] = null
  }

  add(data) {
    // create a new node
    const newNode = new LinkedListNode(data)

    //special case: no items in the list yet
    if (this[head] === null) {
      // just set the head to the new node
      this[head] = newNode
    } else {
      // start out by looking at the first node
      let current = this[head]

      // follow `next` links until you reach the end
      while (current.next !== null) {
        current = current.next
      }

      // assign the node into the `next` pointer
      current.next = newNode
    }
  }

  // other methods hidden for clarity
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

  // other methods hidden for clarity

  remove(index) {
    // special cases: empty list or invalid `index`
    if ((this[head] === null) || (index < 0)) {
      throw new RangeError(`Index ${index} does not exist in the list.`)
    }

    // special case: removing the first node
    if (index === 0) {
      // temporary store the data from the node
      const data = this[head].data

      // just replace the head with the next node in the list
      this[head] = this[head].next

      // return the data at the previous head of the list
      return data
    }

    // pointer use to traverse the list
    let current = this[head]

    // keeps track of the node before current in the loop
    let previous = null

    // used to track how deep into the list you are
    let i = 0

    // same loops as in `get()`
    while ((current !== null) && (i < index)) {

      // save the value of current
      previous = current

      // traverse to the next node
      current = current.next

      // increment the count
      i++
    }

    // if node was found, remove it
    if (current !== null) {

      // skip over the node to remove
      previous.next = current.next

      // return the value that was just removed from the list
      return current.data
    }

    // if node wasn't found, throw an error
    throw new RangeError(`Index ${index} does not exist in the list.`)
  }

  // other methods hidden for clarity

  * values() {
    let current = this[head]

    while (current !== null) {
      yield current.data
      current = current.next
    }
  }

  [Symbol.iterator]() {
    return this.values()
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

const root = new Node('1')
root.left = new Node('1-1')
root.left.left = new Node('1-1-1')
root.left.right = new Node('1-1-2')
root.right = new Node('1-2')
root.right.left = new Node('1-2-1')
root.right.right = new Node('1-2-2')


// 广度优先遍历 BFS
function walkBFS(root){
  if (root === null) {
    return
  }

  const queue = [root]

  while (queue.length) {
      const item = queue.shift()
      // do something
      console.log(item)

      if (item.left) {
        queue.push(item.left)
      }

      if (item.right) {
        queue.push(item.right)
      }
   }
}

walkBFS(root)

// 前序遍历的递归方法实现
function recursionPreOrder(root) {
  if (root === null) {
    return
  }

  // do something here
  console.log(root.value)

  // recurse through child nodes
  if (root.left) {
    recursionPreOrder(root.left)
  }
  if (root.right) {
    recursionPreOrder(root.right)
  }
}

recursionPreOrder(root)

// 前序遍历
function walkPreOrder(root) {
  if (root === null) {
    return
  }

  const stack = [root]
  while (stack.length) {
    const item = stack.pop()

    // do something
    console.log(item)

    // Left child is pushed after right one, since we want to print left child first hence it must be above right child in the stack
    if (item.right) {
      stack.push(item.right)
    }
    if (item.left) {
      stack.push(item.left)
    }
  }
}

walkPreOrder(root)

// 中序遍历
function recursionInOrder(root) {
  if (root === null) {
    return
  }

  if (root.left) {
    recursionInOrder(root.left)
  }

  // do something here
  console.log(root)

  if (root.right) {
    recursionInOrder(root.right)
  }
}
recursionInOrder(root)

// 中序遍历
function walkInOrder(root) {
  if (root === null) {
    return
  }

  const stack = []
  let current = root

  while (stack.length || current) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    const last = stack.pop()

    // do something
    console.log(last)

    current = last.right
  }
}
walkInOrder(root)

// 后序遍历
function walkPostOrder(root) {
  if (root === null) {
    return []
  }

  const tempStack = [root]
  const result = []

  while (tempStack.length) {
    const last = tempStack.pop()

    result.push(last)

    if (last.left) {
      tempStack.push(last.left)
    }
    if (last.right) {
      tempStack.push(last.right)
    }

    console.log("last", last);
  }

  return result.reverse()
}
walkPostOrder(root)


// 迭代
function* iWalkPreOrder(root) {
  if (root === null) {
    return
  }

  const stack = [root]

  while (stack.length) {
    const item = stack.pop()
    yield item
    if (item.right) {
      stack.push(item.right)
    }
    if (item.left) {
      stack.push(item.left)
    }
  }
}


for (let node of iWalkPreOrder(root)) {
  console.log(node)
}

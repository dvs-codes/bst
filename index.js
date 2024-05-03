class Node {
    constructor(data, left=null, right=null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor() {
      this.root = null
    }

    buildTree(array) {
        //check for duplicates 

        let cleanArray = []
        array.forEach((element)=>{
            if (!cleanArray.includes(element)) {
                cleanArray.push(element)
            }
        })
        //sort it
        cleanArray.sort((a,b)=> {return a-b})

        let start = 0
        let end = cleanArray.length-1
        if (start>end) {
            return null
        }

        let midOfArray = Math.floor((start+end)/2)
        let leftArray = cleanArray.slice(start, midOfArray)
        let rightArray = cleanArray.slice(midOfArray+1)
        let newNode = new Node(cleanArray[midOfArray])

        newNode.left = this.buildTree(leftArray)
        newNode.right = this.buildTree(rightArray)
        return this.root = newNode
    }

    insert(value, currentNode = this.root) {
      //on an empty tree
      if (currentNode===null) {
        return this.root = new Node(value)
      }
      //if value is same do nothing
      if (currentNode.data===value) {
        return 
      //if value is bigger, go to right
      } else if (value > currentNode.data) {
        //if empty right node, insert here
        if (currentNode.right===null) {
          return currentNode.right = new Node(value)
        }
        currentNode = currentNode.right
        return this.insert(value, currentNode)
        //else go to left
      } else {
        if (currentNode.left===null) {
          return currentNode.left = new Node(value)
        }
        currentNode = currentNode.left
        return this.insert(value, currentNode)
      }
    }

    deleteItem(value, currentNode = this.root, prevNode = null) {
      // when value is found
      if (value===currentNode.data ) {
        //case for a leafnode, where left and right are null
        if (currentNode.left ===null && currentNode.right==null) {
          if(prevNode===null) {
            return this.root = null
          } else if (prevNode.right && currentNode.data ===prevNode.right.data) {
            return prevNode.right = null
          } else {
            return prevNode.left = null
          }
        }
        //case for single child in right side
        else if (currentNode.left===null) {
          if (prevNode===null) {
            return this.root =  currentNode.right
          }
          else if (prevNode.right && currentNode.data ===prevNode.right.data) {
              return prevNode.right = currentNode.right
          } else {
            return prevNode.left = currentNode.right
          }
        //case for single child in left side
        } else if (currentNode.right===null) {
          if (prevNode===null) {
            return this.root =  currentNode.left
          }
          else if (prevNode.left && currentNode.data ===prevNode.left.data) {
            return prevNode.left = currentNode.left
        } else {
          return prevNode.right = currentNode.left
        }
        }
        // case for both child exist
        else {
          if (prevNode===null) {
            let loopPrevNode = currentNode
            currentNode = currentNode.right
            //going deep left to find smallest leaf node
            while (currentNode.left!==null) {
              loopPrevNode = currentNode
              currentNode = currentNode.left
            } 
            let tempData = currentNode.data 
            this.deleteItem(currentNode.data)
            this.root.data = tempData
          }
          else if ( prevNode.left && currentNode.data === prevNode.left.data) {
            let loopPrevNode = currentNode
            currentNode = currentNode.right
            //going deep left to find smallest leaf node
            while (currentNode.left!==null) {
              loopPrevNode = currentNode
              currentNode = currentNode.left
            } 
            let tempData  = currentNode.data 
            this.deleteItem(currentNode.data)
            prevNode.left.data = tempData
          } else {
            let loopPrevNode = currentNode
            currentNode = currentNode.right
            //going deep left to find smallest leaf node
            while (currentNode.left!==null) {
              loopPrevNode = currentNode
              currentNode = currentNode.left
            }
            let tempData = currentNode.data
            this.deleteItem(currentNode.data)
            prevNode.right.data = tempData
          }
        }
      }
      //going right
      else if (value > currentNode.data) {
        return this.deleteItem(value, currentNode.right, currentNode)
      }
      //going left
      else {
        return this.deleteItem(value, currentNode.left, currentNode)
      }
    }

    find(value, currentNode = this.root) {
      if (value===currentNode.data) {
        return currentNode
      } else if (value > currentNode.data) {
        return this.find(value, currentNode.right)
      } else if (value < currentNode.data) {
        return this.find(value, currentNode.left)
      } else {
        alert('value not found !')
      }
    }

    levelOrder(callback=null,currentNode = this.root, levelOrderArray = [],queue = [currentNode]) {
      if (queue.length===0) {
        if (callback===null) {
          return levelOrderArray
        } else {
          return levelOrderArray.forEach(callback)
        }
      } else {
        levelOrderArray.push(queue[0])
        if (currentNode.left!==null) {
          queue.push(currentNode.left)
        } 
        if (currentNode.right!==null) {
          queue.push(currentNode.right)
        }
        queue.splice(0,1)
        return this.levelOrder(callback,queue[0], levelOrderArray, queue)
      }
    }

    preOrder(callback = null, currentNode = this.root, preOrderArray =[]) {
      if (currentNode===null) {
        return null
      } else {
        preOrderArray.push(currentNode)
        if (callback!==null) {
          callback(currentNode)
        }
        this.preOrder(callback,currentNode.left, preOrderArray )
        this.preOrder(callback,currentNode.right, preOrderArray )
        if (callback===null) {
          return preOrderArray
        }
      }
    } 

    inOrder(callback = null, currentNode = this.root, inOrderArray =[]) {
      if (currentNode===null) {
        return null
      } else {
        this.inOrder(callback,currentNode.left, inOrderArray )
        inOrderArray.push(currentNode)
        if (callback!==null) {
          callback(currentNode)
        }
        this.inOrder(callback,currentNode.right, inOrderArray )
        if (callback===null) {
          return inOrderArray
        }
      }
    }

    postOrder(callback = null, currentNode = this.root, postOrderArray =[]) {
      if (currentNode===null) {
        return null
      } else {
        this.postOrder(callback,currentNode.left, postOrderArray )
        this.postOrder(callback,currentNode.right, postOrderArray )
        postOrderArray.push(currentNode)
        if (callback!==null) {
          callback(currentNode)
        }
        if (callback===null) {
          return postOrderArray
        }
      }
    }

    height(node, currentNode = this.find(node),height = 1) {
      if (currentNode.left===null && currentNode.right ===null) {
        return height
      } else {
        height++
        let leftHeight = 0
        let rightHeight = 0

        if (currentNode.left!==null) {
          leftHeight = this.height(node, currentNode.left, height)
        }
        if (currentNode.right!==null) {
          rightHeight = this.height(node, currentNode.right, height)
        }
        if (leftHeight> rightHeight) {
          return leftHeight
        } else {
          return rightHeight
        }
      }
    }

    depth(node, currentNode = this.root, depth=0) {
      if (node === currentNode.data) {
        return depth
      } else {
        if (node>currentNode.data) {
          depth++
          return this.depth(node, currentNode.right, depth)
        } else {
          depth++
          return this.depth(node, currentNode.left, depth)
        }
      }
    }

    get isBalanced() {
      let currentNode = this.root
      let leftHeight = this.height(currentNode.left.data)
      let rightHeight = this.height(currentNode.right.data) 
      
      return (Math.abs(leftHeight-rightHeight)<=1) 
    }

    get rebalance() {

      if (this.isBalanced) {
        return
      } else {
        let extractedArray =  []
        this.inOrder(ele=> {extractedArray.push(ele.data)})
        return this.buildTree(extractedArray)
      }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let newTree = new Tree()
// console.log(newTree.root)
newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(newTree)

prettyPrint(newTree.root)
newTree.insert(6000)
newTree.insert(3000)
prettyPrint(newTree.root)

console.log(newTree.isBalanced)
newTree.rebalance
newTree.insert(20)
newTree.insert(19)
newTree.insert(18)
newTree.insert(15)
newTree.rebalance

prettyPrint(newTree.root)
console.log(newTree.isBalanced)








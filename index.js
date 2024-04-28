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
newTree.insert(200)
newTree.insert(250)
newTree.insert(190)
newTree.insert(260)
newTree.insert(280)
newTree.insert(240)
newTree.insert(235)
newTree.deleteItem(8)
newTree.deleteItem(67)
newTree.deleteItem(9)
newTree.deleteItem(190)
prettyPrint(newTree.root)
newTree.deleteItem(23)
prettyPrint(newTree.root)
newTree.deleteItem(6345)
newTree.deleteItem(240)
newTree.deleteItem(260)
newTree.deleteItem(250)
newTree.deleteItem(200)
newTree.deleteItem(1)
newTree.deleteItem(4)
newTree.deleteItem(5)
newTree.deleteItem(324)
newTree.deleteItem(235)
newTree.deleteItem(7)
newTree.deleteItem(280)
newTree.deleteItem(3)




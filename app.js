const fibToX = (a,b,n) => {
  let sum = 0
  while (b < n) {
    sum += (b % 2 === 0) ? b : 0
    swap = b
    b += a
    a = swap
  }
  return sum
}

console.time("fibToXTime")
console.log("fibToX:", fibToX(1,2,4000000))
console.timeEnd("fibToXTime")

const fibRecursiveToX = (() => {
  let sum = 0
  function fib(a,b,n) {
    if (b < n) {
      sum += (b % 2 === 0) ? b : 0
      fib(b, (a+b), n)
    }
    return sum
  }
  return fib
})()

console.time("fibRecursiveToXTime")
console.log("fibRecursiveToX:", fibRecursiveToX(1,2,4000000))
console.timeEnd("fibRecursiveToXTime")

const twoSum = function(array, target) {
  let index = []
  index[0] = array.findIndex((element1, index1) => {
    index[1] = array.slice(index1, array.length).findIndex((element2) => {
            return (element1 + element2) === target
          })
    return index[1] > 0
  })
  if (index[0] >= 0) {
    return index
  }
}
console.log("twoSum:", twoSum([2, 7, 11, 15],9))

const longestCollatz = (() => {
  let memoizer = {}
  let longestSequence = 1
  let longestNumber = 1
  function longest(x) {
    for (let i = 1; i <= x; i++) {
      memoizer[i] = collatz(i, 0)
      if (memoizer[i] > longestSequence) {
        longestSequence = memoizer[i]
        longestNumber = i
      }
    }
    return longestNumber
  }
  function collatz(number, sequenceLength) {
    sequenceLength++
    if (number !== 1) {
      let nextNumber = (number % 2 === 0) ? number / 2 : (3 * number) + 1      
      if (memoizer[nextNumber]) {
        sequenceLength += memoizer[nextNumber]
      } else {
        sequenceLength = collatz(nextNumber, sequenceLength)
      }
    }
    return sequenceLength
  }
  return longest
})()

console.time("longestCollatzTime")
console.log("longestCollatz:", longestCollatz(1000000))
console.timeEnd("longestCollatzTime")

const mergeSort = (() => {
  let splitArrays = []
  function split(...arrays) {
    if (arrays[0].length > 1) {
      arrays.forEach(a => {
        let a1 = a.slice(0, a.length / 2)
        let a2 = a.slice(a.length / 2, a.length)
        return split(a1, a2)
      })
    } else {
      arrays.forEach(a => { splitArrays.push(a) })
    }
    return splitArrays
  }
  
  function merge(arr1, arr2) {
    let result = []
    while (arr1.length + arr2.length) {
      if (arr2[0] < arr1[0] || arr1.length === 0) {
        result.push(arr2[0]) 
        arr2.shift()
      } else {
        result.push(arr1[0])
        arr1.shift()
      } 
    }
    return result
  }

  function splitAndMerge(array) {
    let splitResult = split(array)
    debugger
    while (splitResult[0].length < array.length) {
      for (let i = 0; i < splitResult.length; i++) {
        splitResult[i] = merge(splitResult[i], splitResult[i + 1])
        splitResult.splice(i + 1,1)
      }
    }
    return splitResult
  } 
  return splitAndMerge
})()

console.log("mergeSort:", mergeSort([7, 1, 2, 8, 6, 10, 4, 3]))
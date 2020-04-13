/**
 * 堆的应用一：优先级队列
 */

const {
    Heap
} = require("./Heap")


/**
 *  1. 合并有序小文件
 */
function mergeOrderedLittleFiles() {
    const capacity = 6
    let files = readFiles(capacity)
    const bigFile = {
        name: "IAmBigFile",
        contents: []
    }
    // 建堆：
    const minHeap = Heap.createMinHeap(capacity)
    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let str = file.contents[file.p]
        minHeap.insert(str)
    }

    while (files.length > 0) {
        let minStr = minHeap.removeTop()
        bigFile.contents.push(minStr)

        let i = files.findIndex(file => file.contents[file.p] === minStr)
        let file = files[i]
        file.p++
        if (file.p < file.contents.length) {
            let nextStr = file.contents[file.p]
            minHeap.insert(nextStr)
        } else {
            files.splice(i, 1)
        }
    }

    return bigFile

    /**
     * 模拟读取100个小文件并返回格式化对象
     * @return {File[]} files
     * @return {String} File.name 文件名
     * @return {String} File.p 推入堆中的字符串位于contents数组内的下标
     * @return {Array} File.contents 有序字符串数组
     */
    function readFiles(capacity) {
        // 模擬創造100個內容字符串有序的小文件
        const files = []
        for (let i = 0; i < capacity; i++) {
            let file = {
                name: i + ".txt",
                p: 0,
                contents: []
            }
            for (let j = 0; j < 3; j++) {
                let str = Math.random().toString(36).slice(2, 3 + Math.floor(Math.random() * 5))
                file.contents.push(str)
            }
            file.contents.sort()
            files.push(file)
        }
        return files
    }
}

// let bigFile = mergeOrderedLittleFiles()
// console.log(bigFile.contents)

/**
 * 2. 高性能定时器
 */
class Timer {
    constructor() {
        this._timer = null
        this._tasksHeap = Heap.createMinHeap(100)
        this._tasksHeap.setCompareKey("timestamp")
    }
    /**
     * 
     * @param {Array} tasks [{ id: number, timestamp: number, fn: function }] 
     */
    setTask(tasks) {
        this._tasksHeap.buildHeap(tasks, tasks.length)
    }
    setup() {
        let now = Date.now()
        let topTask = this._tasksHeap.removeTop()
        if (!topTask) return console.log("无任务")
        let interval = topTask.timestamp - now 
        if (interval < 0) {
            topTask.fn.call(null)
            this.setup()
        } else {
            let delay = Math.floor((interval / 1000)) 
            console.log(`${delay}s后执行task${topTask.id}`)
            setTimeout(() => {
                topTask.fn.call(null)
                this.setup()
            }, delay * 1000);
        }
    }
}

function _createTask() {
    let ret = [] 
    for (let i = 0; i < 5; i++) {
        ret.push({
            id: i,
            timestamp: Date.now() + 5 * 1000 * (i+1),
            fn() {
                console.log("执行task"+i)
            }
        })
    }
    return ret
}
// const tasks = _createTask()
// const timer = new Timer()
// timer.setTask(tasks)
// timer.setup()


/**
 * 二：topK
 */


/**
 * 查找排列在前topK大数据
 */
function topK(arr, k) {
    let minHeap = Heap.createMinHeap(k)
    minHeap.buildHeap(arr.slice(0, k), k)
    
    for (let i = k; i < arr.length; i++) {
        if (minHeap.arr[1] < arr[i]) {
            minHeap.removeTop()
            minHeap.insert(arr[i])
        }
        
    }

    minHeap.sort().print()
    return minHeap.arr.slice(1, k+1)
}
let array = [0, 4, 3, 3,4, 6,8,100, 6, 848]
topK(array, 5)


/**
 * 三: 求中位数,针对动态数据
 */
class SearchMedian {
    constructor(sourceArray, percentage = 50/100) {
        this.percentage = percentage
        this.maxHeap = Heap.createMaxHeap(1000)
        this.minHeap = Heap.createMinHeap(1000)
        this.total = 0
        this._init(sourceArray)
    }
    _init(array) {
        // 先排序，然后分出大小堆
        let heap = Heap.createMaxHeap(1000)
        heap.buildHeap(array, array.length)
        heap.sort().print()
        let sortedArr = heap.arr.slice(1)
        let cutoff = Math.ceil((sortedArr.length * this.percentage)) 
        this.maxHeap.buildHeap(sortedArr.slice(0, cutoff), cutoff)
        this.minHeap.buildHeap(sortedArr.slice(cutoff), sortedArr.length-cutoff)
        this.total = sortedArr.length
    }
    getResult() {
        console.log(`${this.percentage}位数：${this.maxHeap.top}`)
        return this.maxHeap.top
    }
    insert(data) {
        this.total++
        if (data > this.maxHeap.top) {
            this.minHeap.insert(data)
        } else {
            this.maxHeap.insert(data)
        }

        let cutoff = Math.ceil((this.total * this.percentage)) 
        if (cutoff > this.maxHeap.count) {
            while (cutoff != this.maxHeap.count) {
                let top = this.minHeap.removeTop()
                this.maxHeap.insert(top)
            }
        } else {
            while (cutoff != this.minHeap.count) {
                let top = this.maxHeap.removeTop()
                this.minHeap.insert(top)
            }
        }
    }
}

let sm = new SearchMedian([1,2,8,3,7,6,4,5,9,10,11])
sm.getResult()
sm.insert(12)
sm.insert(13)
sm.insert(14)
sm.getResult()
sm = new SearchMedian([1,2,8,3,7,6,4,5,9,10,10, 10,10,10,10], 9/10)
sm.getResult()

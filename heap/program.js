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
    const capacity = 100
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

let bigFile = mergeOrderedLittleFiles()
console.log(bigFile.contents)
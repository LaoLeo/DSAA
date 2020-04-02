// --------------------------------------------------------------
// 堆的定义，满足一下两个条件：
// 1. 完全二叉树
// 2. 堆中每一个节点的值必须大于等于（或小于等于）其子节点的值
// 大于等于为大顶堆；小于等于为小顶堆
// 
// 堆排序是一种原地的、时间复杂度为 O(nlogn) 的排序算法

// *重要原理：完全二叉树用数组存储最节省内存，从数组下标1开始存储，下标i节点的子节点下标为2i，有节点为2i+1，父节点为i/2
// 
// 堆的应用：
// 找出排在top K位的元素
// 流里的中位数
// 流里的中值
// --------------------------------------------------------------

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}


class Heap {
    constructor(capacity) {
        // 大顶堆
        this.arr = [] // 数组，从下标为1开始存储数据
        this.n = capacity // 堆可以存储数据的最大个数
        this.count = 0 // 堆中已经存储的数据个数
    }

    // 插入
    // 自下往上堆化
    insert(data) {
        let { arr } = this
        if (this.count > this.n) return console.warn("堆已满")

        let i = ++this.count
        arr[i] = data
        let j = parseInt(i/2)
        while(j > 0 && arr[j] < arr[i]) {
            swap(arr, j, i)
            i = j
            j = parseInt(i/2)
        }

        return this
    }

    // 删除堆顶
    removeMax() {
        let {arr} = this
        if (this.count == 0) return console.warn("空堆")
        arr[1] = arr[this.count] 
        this.count--
        arr.pop()
        this.heapify(this.arr, this.count, 1)

        return this
    }

    // 自上往下堆化
    heapify(a, n, i) {
        while(true) {
            let maxPos = i
            if (i*2 <= n && a[i*2] > a[i]) maxPos = 2*i
            if (i*2+1 <= n && a[i*2+1] > a[maxPos])  maxPos = i*2+1 
            if (maxPos == i) break
            swap(a, maxPos, i)
            i = maxPos
        }
    }

    // 建堆|堆化
    // *原理：下标为n/2+1-n的节点为叶子节点
    // 从非叶子节点开始自下往上堆化
    // O(n)
    buildHeap(a, n) {
        for (let i = parseInt(n/2);i >=1 ; i--) {
            this.heapify(a, n, i)
        }
    }

    // 堆排序
    // O(nlogn)
    sort(a, n) {
        a = a || this.arr
        n = n || this.count
        this.buildHeap(a, n)
        let k = n
        while(k > 0) {
            swap(a, 1, k)
            k--
            this.heapify(a, k, 1)
        }

        return this
    }

    print() {
        console.log(this.arr.filter(item => !!item).join(" "))
        
        return this
    }
}

// demo
let heap = new Heap(100)
heap.insert(5).insert(4).insert(6).insert(8).insert(7).insert(3).insert(2).insert(1).print()
heap.removeMax().print().sort().print()

return Heap

/**
    证明堆中2n+1-n的节点为叶子节点：

    使用数组存储表示完全二叉树时，从数组下标为1开始存储数据，数组下标为i的节点，左子节点为2i, 右子节点为2i + 1. 这个结论很重要（可以用数学归纳法证明)，将此结论记为『原理1』，以下证明会用到这个原理。

    为什么，对于完全二叉树来说，下标从n/2 + 1 到 n的节点都是叶子节点？ 使用反证法证明即可：

    如果下标为n/2 + 1的节点不是叶子节点，即它存在子节点，按照『原理1』，它的左子节点为：2(n/2 + 1) = n + 2，大家明显可以看出，这个数字已经大于n + 1，超出了实现完全二叉树所用数组的大小（数组下标从1开始记录数据，对于n个节点来说，数组大小是n + 1），左子节点都已经超出了数组容量，更何况右子节点。以此类推，很容易得出：下标大于n/2 + 1的节点肯定都是也叶子节点了，故而得出结论：对于完全二叉树来说，下标从n/2 + 1 到 n的节点都是叶子节点
*/

/**
 * 在实际开发中，为什么快速排序要比堆排序性能好？
 * 
 * 第一点，堆排序数据访问的方式没有快速排序友好
 * 对于快速排序来说，数据是顺序访问的。而对于堆排序来说，数据是跳着访问的。 比如，堆排序中，最重要的一个操作就是数据的堆化。比如下面这个例子，对堆顶节点进行堆化，会依次访问数组下标是 1，2，4，8 的元素，而不是像快速排序那样，局部顺序访问，所以，这样对 CPU 缓存是不友好的。
 * 
 * 第二点，对于同样的数据，在排序过程中，堆排序算法的数据交换次数要多于快速排序。
 * 我们在讲排序的时候，提过两个概念，有序度和逆序度。对于基于比较的排序算法来说，整个排序过程就是由两个基本的操作组成的，比较和交换（或移动）。快速排序数据交换的次数不会比逆序度多。
 * 但是堆排序的第一步是建堆，建堆的过程会打乱数据原有的相对先后顺序，导致原数据的有序度降低。比如，对于一组已经有序的数据来说，经过建堆之后，数据反而变得更无序了。
 * 
 */

 
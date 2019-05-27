const { StackBaseOnLinklist } = require('./stack')

/**
 * 简单的浏览器前进后退功能
 */
class SimpleBlowser {
    constructor() {
        this.normalStack = new StackBaseOnLinklist()
        this.backStack = new StackBaseOnLinklist()
    }

    // 正常浏览页面
    push(url) {
        this.normalStack.push(url)
        this.backStack.clear()
        this.normalStack.display()
    }

    // 后退
    back() {
        const url = this.normalStack.pop()
        this.backStack.push(url)
        this.normalStack.display()
    }

    // 前进
    front() {
        this.backStack.display()
        const url = this.backStack.pop()
        if (!url) console.log('无法前进')
        else this.normalStack.push(url)

        this.normalStack.display()
    }
}

const blowser = new SimpleBlowser()
blowser.push('baidu.com')
blowser.push('mail.qq.com')
blowser.back()
blowser.front()
blowser.back()
blowser.push('taobao.com')
blowser.front()
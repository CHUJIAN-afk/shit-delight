PlayerEvents.tick(event => {
  event.player.setStatusMessage(消化进度)
})

// 应该是根据食物属性计算消耗时间
// 后续会取消末影箱用作胃袋的功能 自己创建一个胃袋gui
let 消化进度 = 0
PlayerEvents.tick(event => {
    if (event.player.age % 20 === 0) {
        let item = event.player.enderChestInventory.getAllItems()
        //消化进度计算
        消化进度 += Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100)
        if (30000 < 消化进度) {
            消化进度 -= 30000
            消化进度 = Math.floor(消化进度)
            //随机选择物品进行消耗
            let randomIndex = Math.floor(Math.random() * item.length)
            let selectedItem = item[randomIndex]
            if (selectedItem.count > 0) {
                let name = selectedItem.getDisplayName()
                event.player.setStatusMessage(name)
                selectedItem.shrink(1)
                //原地拉屎并发出音效
                event.player.block.popItem("kubejs:shit")
                event.server.runCommandSilent(`/playsound entity.player.burp voice @a ~ ~ ~ 1 1 1`);
            }
        }
    }
})

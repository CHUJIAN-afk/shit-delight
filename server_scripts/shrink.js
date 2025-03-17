let time = 0
PlayerEvents.tick(event => {
  event.player.setStatusMessage(time)
})

// 应该是根据食物属性计算消耗时间
// 后续会取消末影箱用作胃袋的功能 自己创建一个胃袋gui
PlayerEvents.tick(event => {
    if (event.player.age % 20 === 0) {
        let item = event.player.enderChestInventory.getAllItems()
        time += Math.floor((PPSZG + PJFZS + PXHRL + PSLMY + PJHXY + PXKHX) * (100 - FXSX * 1.5) / 100)
        if (30000 < time) {
            time -= 30000
            time = Math.floor(time)
            let randomIndex = Math.floor(Math.random() * item.length)
            let selectedItem = item[randomIndex]
            if (selectedItem.count > 0) {
                let name = selectedItem.getDisplayName()
                event.player.setStatusMessage(name)
                selectedItem.shrink(1)
                event.player.block.popItem("kubejs:shit")
                event.server.runCommandSilent(`/playsound entity.player.burp voice @a ~ ~ ~ 1 1 1`);
            }
        }
    }
})

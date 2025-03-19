PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 119 === 0) {
        let 当前胃中效果数量 = 0
        let 胃中效果最大数量 = Math.floor(餮魇归一总值 / 10) + 2
        let item = player.enderChestInventory.getAllItems()
        item.forEach((item) => {
            let foodProps = item.getFoodProperties(player)
            if (!foodProps) return
            let Effects = foodProps.getEffects()
            if (!Effects) return
            Effects.forEach((Effects) => {
                if (当前胃中效果数量 >= 胃中效果最大数量) return
                let effectss = Effects.getFirst()
                let effects = effectss.effect
                let level = effectss.amplifier
                if (!player.hasEffect(effects)) {
                    player.potionEffects.add(effects, 119, level, true, false)
                    当前胃中效果数量++
                }
            })
        })
    }
})

// 应该是根据食物属性计算消耗时间
// 后续会取消末影箱用作胃袋的功能 自己创建一个胃袋gui
PlayerEvents.tick(event => {
    let { player } = event
    if (player.age % 20 === 0) {
        let 持久化数据 = player.persistentData;
        let 磐石之根总值 = 持久化数据.getString("磐石之根");
        let 风之轻语总值 = 持久化数据.getString("风之轻语");
        let 星火熔炉总值 = 持久化数据.getString("星火熔炉");
        let 森灵秘语总值 = 持久化数据.getString("森灵秘语");
        let 匠魂飨宴总值 = 持久化数据.getString("匠魂飨宴");
        let 虚空遗尘总值 = 持久化数据.getString("虚空遗尘");
        let 腐嗅噬心总值 = 持久化数据.getString("腐嗅噬心");
        let 消化进度 = 持久化数据.getString("消化进度");
        //消化进度计算
        消化进度 += Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100)
        if (30000 < 消化进度) {
            消化进度 -= 30000
            消化进度 = Math.floor(消化进度)
            let item = player.container
            //先拉出所有屎再消化其他食物
            item.forEach(shit => {
                if (shit.id == "kubejs:shit") {
                    if (Math.random() < 0.8) {
                        //让玩家不能赤石永动机
                        player.block.popItem("kubejs:shit")
                    }
                    shit.shrink(1)
                }
            })
            //随机选择物品进行消耗
            let randomIndex = Math.floor(Math.random() * item.length)
            let selectedItem = item[randomIndex]
            if (item.length && selectedItem.count > 0) {
                if (selectedItem.id == "kubejs:shit") {
                    消化进度 += 30000
                }
                selectedItem.shrink(1)
                //原地拉屎并发出音效
                player.block.popItem("kubejs:shit")
                event.server.runCommandSilent(`/playsound entity.player.burp voice @a ~ ~ ~ 1 1 1`);
            }
        }
    }
})

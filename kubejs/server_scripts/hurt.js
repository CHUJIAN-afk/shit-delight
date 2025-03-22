
EntityEvents.hurt(event => {
    let entity = event.entity
    if (entity && entity.isPlayer()) {
        let 持久化数据 = entity.persistentData;
        let 磐石之根总值 = 持久化数据.getString("磐石之根");
        let 风之轻语总值 = 持久化数据.getString("风之轻语");
        let 星火熔炉总值 = 持久化数据.getString("星火熔炉");
        let 森灵秘语总值 = 持久化数据.getString("森灵秘语");
        let 匠魂飨宴总值 = 持久化数据.getString("匠魂飨宴");
        let 虚空遗尘总值 = 持久化数据.getString("虚空遗尘");
        let 腐嗅噬心总值 = 持久化数据.getString("腐嗅噬心");
        let 消化基础值 = Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100)
        let 受到伤害量 = event.damage
        if (受到伤害量 !== 0) {
            let 持久化数据 = entity.persistentData;
            let 消化进度 = 持久化数据.getString("消化进度");
            持久化数据.putString("消化进度", 消化进度 + Math.floor(受到伤害量 * 消化基础值))
        }
    }
    if (event.source.actual && event.source.actual.isPlayer()) {
        let 造成伤害 = event.damage
        if (造成伤害 !== 0) {
            let 持久化数据 = event.source.actual.persistentData;
            let 磐石之根总值 = 持久化数据.getString("磐石之根");
            let 风之轻语总值 = 持久化数据.getString("风之轻语");
            let 星火熔炉总值 = 持久化数据.getString("星火熔炉");
            let 森灵秘语总值 = 持久化数据.getString("森灵秘语");
            let 匠魂飨宴总值 = 持久化数据.getString("匠魂飨宴");
            let 虚空遗尘总值 = 持久化数据.getString("虚空遗尘");
            let 腐嗅噬心总值 = 持久化数据.getString("腐嗅噬心");
            let 消化基础值 = Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100)
            let 消化进度 = 持久化数据.getString("消化进度");
            持久化数据.putString("消化进度", 消化进度 + Math.floor(造成伤害 * 消化基础值))
        }
    }
});

EntityEvents.hurt(event => {
    let { player } = event
    if (!player) return
    let offhandItem = player.offhandItem
    let mainhandItem = player.mainHandItem
    if (offhandItem.hasTag('minecraft:tools') || mainhandItem.hasTag('minecraft:tools')) {
        event.cancel()
    }
    if (!mainhandItem.hasTag('forge:tools/knives')) {
        event.cancel()
    }
});
//受击重置无敌帧，吼吼
EntityEvents.hurt(event => {
    event.entity.invulnerableTime = 0
});






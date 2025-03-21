// 畏惧了……

// 为了让玩家不能使用工具的情况下也能够够进行方块挖掘
// 后续得优化
// 等我先捋清楚属性的计算
BlockEvents.broken(event => {
  let block = event.block.blockState
  if (!event.player.hasCorrectToolForDrops(block)) {
    let drops = event.block.getDrops()
    if (!event.player.isCreative()) drops.forEach(item => {
      event.block.popItem(item)
      let 持久化数据 = entity.persistentData;
      let 消化进度 = 持久化数据.getString("消化进度");
      let 磐石之根总值 = 持久化数据.getString("磐石之根");
      let 风之轻语总值 = 持久化数据.getString("风之轻语");
      let 星火熔炉总值 = 持久化数据.getString("星火熔炉");
      let 森灵秘语总值 = 持久化数据.getString("森灵秘语");
      let 匠魂飨宴总值 = 持久化数据.getString("匠魂飨宴");
      let 虚空遗尘总值 = 持久化数据.getString("虚空遗尘");
      let 腐嗅噬心总值 = 持久化数据.getString("腐嗅噬心");
      消化进度 += Math.floor((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值 * 1.5) / 100) * 0.1
    })
  }
})
/*
PlayerEvents.tick(event => {
  let { player } = event
  player.damageEquipment("chest", 1)
  player.damageEquipment("feet", 1)
  player.damageEquipment("head", 1)
  player.damageEquipment("legs", 1)
})
*/
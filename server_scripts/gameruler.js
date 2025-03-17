// 畏惧了……

// 为了让玩家不能使用工具的情况下也能够够进行方块挖掘
// 后续得优化
// 等我先捋清楚属性的计算
BlockEvents.broken(event => {
  let block = event.block.blockState
  if (!event.player.hasCorrectToolForDrops(block)) {
    let drops = event.block.getDrops()
    if(!event.player.isCreative())drops.forEach(item => {
      event.block.popItem(item)
    })
    time += Math.floor((PPSZG + PJFZS + PXHRL + PSLMY + PJHXY + PXKHX) * (100 - FXSX * 1.5) / 100) * 0.1
  }
})

PlayerEvents.tick(event => {
  let { player } = event
  player.damageEquipment("chest", 1)
  player.damageEquipment("feet", 1)
  player.damageEquipment("head", 1)
  player.damageEquipment("legs", 1)
})

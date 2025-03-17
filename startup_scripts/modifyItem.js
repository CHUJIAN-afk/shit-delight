// 允许使用的物品（白名单）
let allowUseItem = [
  "farmersdelight:diamond_knife",
  "farmersdelight:netherite_knife",
  "farmersdelight:iron_knife",
  "farmersdelight:golden_knife",
  "farmersdelight:skillet",
  "farmersdelight:flint_knife",
  "twilightdelight:fiery_knife",
  "twilightdelight:knightmetal_knife",
  "twilightdelight:ironwood_knife",
  "twilightdelight:steeleaf_knife",
  "ends_delight:dragon_tooth_knife",
  "ends_delight:end_stone_knife",
  "ends_delight:dragon_egg_shell_knife",
  "ends_delight:purpur_knife",

  // 鱼竿 打火石 剪刀 刷子
  'minecraft:fishing_rod',
  'minecraft:flint_and_steel',
  'minecraft:shears',
  'minecraft:brush'
]

ItemEvents.modification(event => {
  Ingredient.all.getItemIds().forEach(id => {
    if (Item.of(id).item.maxDamage > 0
      && allowUseItem.indexOf(id) == -1
      && !(Item.of(id).item instanceof $ArmorItem)
    ) {
      event.modify(id, item => {
        item.setMaxDamage(1)
      })
    }
  })
})

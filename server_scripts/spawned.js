let commonWeapons = [
  "farmersdelight:netherite_knife",
  "farmersdelight:diamond_knife",
  "farmersdelight:golden_knife",
  "farmersdelight:iron_knife",
  "farmersdelight:flint_knife",
  "farmersdelight:skillet"
]
let rareWeapons = [
  "twilightdelight:ironwood_knife",
  "twilightdelight:steeleaf_knife",
  "twilightdelight:knightmetal_knife",
  "twilightdelight:fiery_knife"
]
let epicWeapons = [
  "ends_delight:end_stone_knife",
  "ends_delight:purpur_knife",
  "ends_delight:dragon_egg_shell_knife",
  "ends_delight:dragon_tooth_knife"
]

EntityEvents.spawned(event => {
  let { entity, level: { dimension } } = event
  let { random } = Utils

  // 主世界
  if (dimension == "minecraft:overworld") {
    if (random.nextFloat() < 0.1) {
      let selectedItem = commonWeapons[random.nextInt(commonWeapons.length)]
      entity.setItemSlot('mainhand', selectedItem)
    }
    if (random.nextFloat() < 0.1) {
      let selectedItem = commonWeapons[random.nextInt(commonWeapons.length)]
      entity.setItemSlot('offhand', selectedItem)
    }
  }

  // 下界或暮色
  if (dimension == "minecraft:the_nether"
    || dimension == "twilightforest:twilight_forest"
  ) {
    if (random.nextFloat() < 0.1) {
      let selectedItem = rareWeapons[random.nextInt(rareWeapons.length)]
      entity.setItemSlot('mainhand', selectedItem)
    }
    if (random.nextFloat() < 0.1) {
      let selectedItem = rareWeapons[random.nextInt(rareWeapons.length)]
      entity.setItemSlot('offhand', selectedItem)
    }
  }

  // 末地
  if (dimension == "minecraft:the_end") {
    if (random.nextFloat() < 0.1) {
      let selectedItem = epicWeapons[random.nextInt(epicWeapons.length)]
      entity.setItemSlot('mainhand', selectedItem)
    }
    if (random.nextFloat() < 0.1) {
      let selectedItem = epicWeapons[random.nextInt(epicWeapons.length)]
      entity.setItemSlot('offhand', selectedItem)
    }
  }
})

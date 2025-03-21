﻿let $ArmorItem = Java.loadClass("net.minecraft.world.item.ArmorItem")

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

  // 锄头
  'minecraft:wooden_hoe',
  'minecraft:stone_hoe',
  'minecraft:iron_hoe',
  'minecraft:golden_hoe',
  'minecraft:diamond_hoe',
  'minecraft:netherite_hoe',

  // 鱼竿 打火石 剪刀 刷子
  'minecraft:fishing_rod',
  'minecraft:flint_and_steel',
  'minecraft:shears',
  'minecraft:brush'
]
let $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')

let $BasicItemJS$Builder = Java.loadClass('dev.latvian.mods.kubejs.item.custom.BasicItemJS$Builder')
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


    //双端可能有问题,先用着
    if (Item.of(id).item.getFoodProperties())
      event.modify(Item.of(id), item => {
        item.setItemBuilder(
          new $BasicItemJS$Builder(id).use((l, p, h) => {
            if(l.isClientSide())return true
            let canuse = true
            let items = []
            let index = -1
            p.persistentData.StomachItem.forEach(tag => {
              items.push($ItemStack.of(tag))
            })
          
            for (let i = items.length; i >= 0; i--) {
              if (items[i] == Item.empty) {
                index = i
              }
            }
            if (index == -1) {
              canuse = false
            }
            return canuse
          
          }))
      })


  })
})

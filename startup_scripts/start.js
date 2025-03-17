StartupEvents.registry("item",event=>{
    event.create("shit")
    .food(event=>{
        event.hunger(1)
        event.saturation(0.5)
        event.meat()
        event.fastToEat()
        event.alwaysEdible()
        event.effect("fruitsdelight:disgusted",20*60,0,1.0)
    })
    .maxStackSize(64)
    .tag("shit")
    .displayName("屎")

    event.create("magnifying_glass")
    .maxStackSize(1)
    .displayName("便携胃镜")
})
let $ArmorItem = Java.loadClass("net.minecraft.world.item.ArmorItem")
const WEA = [
    "farmersdelight:diamond_knife", "farmersdelight:netherite_knife",
    "farmersdelight:iron_knife", "farmersdelight:golden_knife",
    "farmersdelight:skillet", "farmersdelight:flint_knife",
    "twilightdelight:fiery_knife", "twilightdelight:knightmetal_knife",
    "twilightdelight:ironwood_knife", "twilightdelight:steeleaf_knife",
    "ends_delight:dragon_tooth_knife", "ends_delight:end_stone_knife",
    "ends_delight:dragon_egg_shell_knife", "ends_delight:purpur_knife"
];
ItemEvents.modification(event => {
    Ingredient.all.getItemIds().forEach(id => {
        if (Item.of(id).item.maxDamage > 0 && WEA.indexOf(id) == -1&&!(Item.of(id).item instanceof $ArmorItem))
            event.modify(id, bd => {
                bd.setMaxDamage(1)
            })
    })
})
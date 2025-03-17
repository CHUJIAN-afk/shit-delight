// 畏惧了……
let initialItems = []
let BS = 0
let FY = 0
let SD = 0
let GJ = 0
let HF = 0
let GY = 0
let PPSZG = 0
let PJFZS = 0
let PXHRL = 0
let PSLMY = 0
let PJHXY = 0
let PXKHX = 0
let YJ = 0
let PGXZM = 0
let MNLG = 0
let PTYGY = 0
let FXSX = 0
let FSNJ = 0
//果香织梦
PlayerEvents.tick(event => {
    if (PGXZM !== 0 && event.player.age % 20 === 0) {
        event.player.addFood(PGXZM * 0.5, PGXZM)
        let M = event.player.mainHandItem.damageValue
        let O = event.player.offHandItem.damageValue
        if (M !== 0 && WEA.includes(event.player.mainHandItem.id)) {
            event.player.mainHandItem.damageValue -= PGXZM
        }
        if (O !== 0 && WEA.includes(event.player.offHandItem.id)) {
            event.player.offHandItem.damageValue -= PGXZM
        }
    }
})
//潜渊共鸣
EntityEvents.hurt(event => {
    let attacker = event.source.getActual();
    if (attacker && attacker.isPlayer()) {
        if (FSNJ == 0) return
        let { x, y, z } = event.entity
        let entity = event.entity
        let damage = event.damage * FSNJ * 0.05
        let R = Math.floor(FSNJ * 0.05) + 1
        let aabb = AABB.of(
            x - R,
            y - R,
            z - R,
            x + R,
            y + R,
            z + R
        )
        Utils.server.scheduleInTicks(4, () => {
            let EntitiesWithin = entity.getLevel().getEntitiesWithin(aabb)
            EntitiesWithin.forEach(entity => {
                if (entity.isPlayer() || !entity.isLiving()) return
                entity.invulnerableTime = 0
                entity.attack(damage)
                time += Math.floor(damage)
                Utils.server.scheduleInTicks(4, () => {
                    entity.invulnerableTime = 0
                    entity.attack(damage)
                    time += Math.floor(damage)
                })
            })
        })
    }
});

PlayerEvents.tick(event => {
    let item = event.player.enderChestInventory.getAllItems()
    let currentItems = item.toString()
    if (currentItems !== initialItems || respawned) {
        initialItems = currentItems
        respawned = false
        let player = event.player
        BS = 0
        FY = 0
        SD = 0
        GJ = 0
        HF = 0
        GY = 0
        MNLG = 0
        PPSZG = 0
        PJFZS = 0
        PXHRL = 0
        PSLMY = 0
        PJHXY = 0
        PXKHX = 0
        PGXZM = 0
        PTYGY = 0
        FXSX = 0
        FSNJ = 0
        item.forEach((item) => {
            let count = item.count
            if (count > 1) {
                item.shrink(count - 1)
                player.give(Item.of(item, count - 1))
            }
            let FM = 0;
            const tags = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"];

            tags.forEach(tag => {
                if (item.hasTag(tag)) FM++;
            });


            let foodProps = item.getFoodProperties(player)
            if (!foodProps) return
            let nutritionsaturation = Math.floor((foodProps.getNutrition() + foodProps.getSaturationModifier() * 0.5) / Math.max(FM, 1) + 1);

            //基础性权重分配
            //磐石之根
            if (item.hasTag("PSZG")) {
                PPSZG += nutritionsaturation
            }
            // 疾风之飨
            if (item.hasTag("JFZS")) {
                PJFZS += nutritionsaturation
            }

            // 星火熔炉
            if (item.hasTag("XHRL")) {
                PXHRL += nutritionsaturation
            }

            // 森灵秘语
            if (item.hasTag("SLMY")) {
                PSLMY += nutritionsaturation
            }

            // 匠魂飨宴
            if (item.hasTag("JHXY")) {
                PJHXY += nutritionsaturation
            }

            // 虚空秘语
            if (item.hasTag("XKHX")) {
                PXKHX += nutritionsaturation
            }
            //特殊效果计算
            //果香织梦
            if (item.hasTag("GXZM")) {
                PGXZM += nutritionsaturation
            }
            //莓酿离歌
            if (item.hasTag("brewinandchewin:fermented_drinks")) {
                MNLG += nutritionsaturation
            }
            //餮魇归一
            if (item.hasTag("TYGY")) {
                PTYGY += nutritionsaturation
            }
            //腐嗅噬心
            if (item.hasTag("shit")) {
                FXSX += nutritionsaturation
            }
            //潜渊共鸣
            if (item.hasTag("FSNJ")) {
                FSNJ += nutritionsaturation
            }

        })
        /*
                if (PTYGY !== 0) {
                    PPSZG *= 1 + PTYGY / 1000
                    PJFZS *= 1 + PTYGY / 1000
                    PXHRL *= 1 + PTYGY / 1000
                    PSLMY *= 1 + PTYGY / 1000
                    PJHXY *= 1 + PTYGY / 1000
                    PXKHX *= 1 + PTYGY / 1000
                }
        */
        BS = PPSZG * 0.3 + PJFZS * 0.6 + PXHRL * 0.4 + PSLMY * 0.8 + PJHXY * 0.2 + PXKHX * 1;
        FY = PPSZG * 0.9 + PJFZS * -0.3 + PXHRL * 0 + PSLMY * 0.2 + PJHXY * 0 + PXKHX * 0.2;
        SD = PPSZG * -0.2 + PJFZS * 1.2 + PXHRL * -0.8 + PSLMY * 0.1 + PJHXY * 0 + PXKHX * 0.2;
        GJ = PPSZG * 0.1 + PJFZS * -0.5 + PXHRL * 1.5 + PSLMY * -0.3 + PJHXY * 0.4 + PXKHX * 0.2;
        HF = PPSZG * 0.4 + PJFZS * 0.2 + PXHRL * 0 + PSLMY * 1.2 + PJHXY * -0.2 + PXKHX * 0.2;
        GY = PPSZG * 0 + PJFZS * 0 + PXHRL * 0.3 + PSLMY * 0 + PJHXY * 1.1 + PXKHX * 0.2;
        //属性加成
        BS *= 0.02
        FY *= 0.02
        SD *= 0.02
        GJ *= 0.02
        HF *= 0.02
        GY *= 0.02

        player.modifyAttribute("minecraft:generic.max_health", "饱食", BS, "multiply_base")
        player.modifyAttribute("additionalentityattributes:lung_capacity", "饱食", BS, "multiply_base")
        player.modifyAttribute("additionalentityattributes:dig_speed", "饱食", BS, "multiply_base")
        player.modifyAttribute("attributeslib:healing_received", "饱食", BS, "multiply_base")

        player.modifyAttribute("minecraft:generic.armor", "防御", FY, "multiply_base")
        player.modifyAttribute("minecraft:generic.armor_toughness", "防御", FY, "multiply_base")
        player.modifyAttribute("minecraft:generic.knockback_resistance", "防御", FY, "multiply_base")
        player.modifyAttribute("attributeslib:prot_pierce", "防御", FY, "multiply_base")
        player.modifyAttribute("additionalentityattributes:magic_protection", "防御", FY, "multiply_base")


        player.modifyAttribute("minecraft:generic.movement_speed", "速度", SD, "multiply_base")
        player.modifyAttribute("additionalentityattributes:water_speed", "速度", SD, "multiply_base")
        player.modifyAttribute("additionalentityattributes:lava_speed", "速度", SD, "multiply_base")
        player.modifyAttribute("minecraft:generic.flying_speed", "速度", SD, "multiply_base")
        player.modifyAttribute("forge:swim_speed", "速度", SD, "multiply_base")

        player.modifyAttribute("minecraft:generic.attack_damage", "攻击", GJ, "multiply_base")
        player.modifyAttribute("minecraft:generic.attack_speed", "攻击", GJ, "multiply_base")
        player.modifyAttribute("attributeslib:crit_chance", "攻击", GJ, "multiply_base")
        player.modifyAttribute("attributeslib:crit_damage", "攻击", GJ, "multiply_base")
        player.modifyAttribute("attributeslib:armor_pierce", "攻击", GJ, "multiply_base")
        player.modifyAttribute("attributeslib:life_steal", "攻击", GJ, "multiply_base")

        player.modifyAttribute("attributeslib:overheal", "恢复", HF, "multiply_base")
        player.modifyAttribute("attributeslib:healing_received", "恢复", HF, "multiply_base")
        player.modifyAttribute("zombie.spawn_reinforcements", "恢复", HF, "multiply_base")
        player.modifyAttribute("additionalentityattributes:bonus_loot_count_rolls", "恢复", HF, "multiply_base")
        player.modifyAttribute("minecraft:generic.luck", "恢复", HF, "multiply_base")

        player.modifyAttribute("additionalentityattributes:dig_speed", "工艺", GY, "multiply_base")
        player.modifyAttribute("attributeslib:mining_speed", "工艺", GY, "multiply_base")
        player.modifyAttribute("additionalentityattributes:bonus_rare_loot_rolls", "工艺", GY, "multiply_base")
        player.modifyAttribute("attributeslib:experience_gained", "工艺", GY, "multiply_base")
        player.modifyAttribute("forge:block_reach", "工艺", GY * 0.07, "multiply_base")
        player.modifyAttribute("forge:entity_reach", "工艺", GY * 0.09, "multiply_base")
        if (MNLG == 0 && PMNLG > 0 || MNLG > 0 && PMNLG == 0) {
            player.modifyAttribute("attributeslib:creative_flight", "莓酿离歌", MNLG * 0.01, "addition")
            PMNLG = MNLG
        }
    }
})
let PMNLG = 0
const attributes = [
    "minecraft:generic.attack_knockback",
    "additionalentityattributes:lung_capacity",
    "additionalentityattributes:dig_speed",
    "additionalentityattributes:bonus_loot_count_rolls",
    "additionalentityattributes:dropped_experience",
    "additionalentityattributes:magic_protection",
    "attributeslib:life_steal",
    "attributeslib:overheal",
    "attributeslib:prot_pierce"
];

let respawned = false
PlayerEvents.respawned(event => {
    CHAN(event)
})
PlayerEvents.loggedIn(event => {
    CHAN(event)
})

function CHAN(event) {
    attributes.forEach(attribute => {
        event.player.modifyAttribute(attribute, "基础值", 0.05, "addition");
    });
    event.player.modifyAttribute("attributeslib:prot_pierce", "基础值", 4, "addition");
    event.player.modifyAttribute("attributeslib:armor_pierce", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.luck", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.armor", "基础值", 4, "addition");
    event.player.modifyAttribute("minecraft:generic.armor_toughness", "基础值", 2, "addition");
    respawned = true
}

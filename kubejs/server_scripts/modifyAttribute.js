// 畏惧了……

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

//果香织梦
PlayerEvents.tick(event => {
  let { player, player: { mainHandItem, offHandItem } } = event
  let 持久化数据 = entity.persistentData;
  let 果香织梦总值 = 持久化数据.getString("果香织梦");
  if (果香织梦总值 && !(player.age % 100)) {
    //恢复饥饿值饱和度
    player.addFood(
      Math.max(果香织梦总值 * 0.1, 1),
      Math.max(果香织梦总值 * 0.2, 1)
    )
    //修复
    if (mainHandItem.damageValue && allowUseItem.includes(mainHandItem.id)) {
      mainHandItem.damageValue -= 果香织梦总值
    }
    if (offHandItem.damageValue && allowUseItem.includes(offHandItem.id)) {
      offHandItem.damageValue -= 果香织梦总值
    }
  }
})

//潜渊共鸣
// 直接使用attack(number)的方式给予伤害
// 需要修改
EntityEvents.hurt(event => {
  let { server, entity, source, damage: oldDamage } = event
  let attacker = source.actual
  if (attacker && attacker.isPlayer()) {
    let 持久化数据 = entity.persistentData;
    let 潜渊共鸣总值 = 持久化数据.getString("潜渊共鸣");
    if (!潜渊共鸣总值) return
    let damage = oldDamage * 潜渊共鸣总值 * 0.05//计算伤害
    let range = Math.floor(潜渊共鸣总值 * 0.05) + 1//计算范围
    let aabb = entity.boundingBox.inflate(range)

    server.scheduleInTicks(4, () => {
      let EntitiesWithin = entity.getLevel().getEntitiesWithin(aabb)
      EntitiesWithin.forEach(entity => {
        if (entity.isPlayer() || !entity.isLiving()) return
        entity.invulnerableTime = 0
        entity.attack(damage)
        消化进度 += Math.floor(damage)
        server.scheduleInTicks(4, () => {
          entity.invulnerableTime = 0
          entity.attack(damage)
          消化进度 += Math.floor(damage)
        })
      })
    })
  }
})
//腌痕铠胄
EntityEvents.hurt(event => {
  let { entity, source, damage } = event
  let attacker = source.actual
  if (entity && entity.isPlayer()) {
    let 持久化数据 = entity.persistentData;
    let 腌痕铠胄总值 = 持久化数据.getString("腌痕铠胄");
    if (!腌痕铠胄总值) return
    if (!attacker || !attacker.isLiving()) return
    entity.invulnerableTime = 0
    attacker.attack(damage * entity.getAttributeValue("minecraft:generic.armor") * 腌痕铠胄总值 * 0.003)
    消化进度 += Math.floor(damage * entity.getAttributeValue("minecraft:generic.armor") * 腌痕铠胄总值 * 0.003)
  }
})
//属性计算部分
//此处触发计算仍然需要修改
  let 上次胃中物品 = []
  let 上一次莓酿离歌总值 = 0
PlayerEvents.tick(event => {
  let player = event.player
  let item = player.enderChestInventory.getAllItems()
  let 当前胃中物品 = item.toString()
  //重生登录或胃中食物变动，重新计算属性
  if (当前胃中物品 !== 上次胃中物品) {
    上次胃中物品 = 当前胃中物品
    let 磐石之根总值 = 0
    let 风之轻语总值 = 0
    let 星火熔炉总值 = 0
    let 森灵秘语总值 = 0
    let 匠魂飨宴总值 = 0
    let 虚空遗尘总值 = 0
    let 果香织梦总值 = 0
    let 莓酿离歌总值 = 0
    let 餮魇归一总值 = 0
    let 腐嗅噬心总值 = 0
    let 潜渊共鸣总值 = 0
    let 腌痕铠胄总值 = 0
    item.forEach((item) => {
      //让胃中堆叠为1
      let count = item.count
      if (count > 1) {
        item.shrink(count - 1)
        player.give(Item.of(item, count - 1))
      }
      //食物属性值计算
      let 均分系数 = 0;
      const 标签 = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"];
      标签.forEach(标签 => {
        if (item.hasTag(标签)) 均分系数++;
      });
      let 食物 = item.getFoodProperties(player)
      if (!食物) return
      let 饥饿值 = 食物.getNutrition()
      let 饱和度 = 食物.getSaturationModifier()
      let 食物营养总价值 = Math.floor((饥饿值 + 饱和度 * 0.5) / Math.max(均分系数, 1) + 1);
      let 属性配置表 = [
        { 标签: 'XKHX', 属性值: 虚空遗尘总值, 系数: Math.exp(饥饿值 * 饱和度 * 0.05) },
        { 标签: 'JHXY', 属性值: 匠魂飨宴总值, 系数: ((饥饿值 / (饱和度 + 1)) + Math.sqrt(饥饿值 + 饱和度)) / 9 },
        { 标签: 'SLMY', 属性值: 森灵秘语总值, 系数: Math.log(饥饿值 + 1) * (饱和度 + 0.3) / 1.5 },
        { 标签: 'XHRL', 属性值: 星火熔炉总值, 系数: (Math.pow(饥饿值, 1.2) + Math.pow(饱和度, 1.2)) / 10 },
        { 标签: 'JFZS', 属性值: 风之轻语总值, 系数: 饥饿值 / (Math.abs(饱和度) + 0.5) / 3 },
        { 标签: 'PSZG', 属性值: 磐石之根总值, 系数: (饥饿值 - 饱和度) / 5 },
        { 标签: 'TYGY', 属性值: 餮魇归一总值, 系数: 1 },
        { 标签: 'shit', 属性值: 腐嗅噬心总值, 系数: 1 },
        { 标签: 'FSNJ', 属性值: 潜渊共鸣总值, 系数: 1 },
        { 标签: 'YHKZ', 属性值: 腌痕铠胄总值, 系数: 1 },
        { 标签: 'GXZM', 属性值: 果香织梦总值, 系数: 1 },
        { 标签: 'brewinandchewin:fermented_drinks', 属性值: 莓酿离歌总值, 系数: 1 }
      ];
      属性配置表.forEach(配置 => {
        if (配置.标签) {
          配置.属性值 += Math.max(Math.floor(食物营养总价值 * 配置.系数), 1)
        }
      })
    })
    //写入玩家持久化数据
    let 持久化数据 = player.persistentData;
    let 属性表 = [
      { 属性值: 莓酿离歌总值, 属性名: '莓酿离歌' },
      { 属性值: 磐石之根总值, 属性名: '磐石之根' },
      { 属性值: 风之轻语总值, 属性名: '风之轻语' },
      { 属性值: 星火熔炉总值, 属性名: '星火熔炉' },
      { 属性值: 森灵秘语总值, 属性名: '森灵秘语' },
      { 属性值: 匠魂飨宴总值, 属性名: '匠魂飨宴' },
      { 属性值: 虚空遗尘总值, 属性名: '虚空遗尘' },
      { 属性值: 果香织梦总值, 属性名: '果香织梦' },
      { 属性值: 餮魇归一总值, 属性名: '餮魇归一' },
      { 属性值: 腐嗅噬心总值, 属性名: '腐嗅噬心' },
      { 属性值: 潜渊共鸣总值, 属性名: '潜渊共鸣' },
      { 属性值: 腌痕铠胄总值, 属性名: '腌痕铠胄' }
    ];
    属性表.forEach(配置 => {
      持久化数据.putString(配置.属性名, 配置.属性值);
    })
  }
})
//属性加成部分
PlayerEvents.tick(event => {
  let player = event.player
  if (属性修改) {
    属性修改 = false
    let 持久化数据 = player.persistentData;
    let 莓酿离歌总值 = 持久化数据.getString("莓酿离歌");
    let 磐石之根总值 = 持久化数据.getString("磐石之根");
    let 风之轻语总值 = 持久化数据.getString("风之轻语");
    let 星火熔炉总值 = 持久化数据.getString("星火熔炉");
    let 森灵秘语总值 = 持久化数据.getString("森灵秘语");
    let 匠魂飨宴总值 = 持久化数据.getString("匠魂飨宴");
    let 虚空遗尘总值 = 持久化数据.getString("虚空遗尘");
    let 果香织梦总值 = 持久化数据.getString("果香织梦");
    let 餮魇归一总值 = 持久化数据.getString("餮魇归一");
    let 腐嗅噬心总值 = 持久化数据.getString("腐嗅噬心");
    let 潜渊共鸣总值 = 持久化数据.getString("潜渊共鸣");
    let 腌痕铠胄总值 = 持久化数据.getString("腌痕铠胄");
    //根据系数进行计算数值
    let 生命类属性 = 磐石之根总值 * 0.3 + 风之轻语总值 * 0.5 + 星火熔炉总值 * -0.4 + 森灵秘语总值 * 0.8 + 匠魂飨宴总值 * 0.2 + 虚空遗尘总值 * 0.6;
    let 防御类属性 = 磐石之根总值 * 1.4 + 风之轻语总值 * -0.3 + 星火熔炉总值 * -0.4 + 森灵秘语总值 * 0.2 + 匠魂飨宴总值 * 0 + 虚空遗尘总值 * 0.2;
    let 速度类属性 = 磐石之根总值 * -0.2 + 风之轻语总值 * 1.7 + 星火熔炉总值 * -0.8 + 森灵秘语总值 * 0.1 + 匠魂飨宴总值 * 0 + 虚空遗尘总值 * 0.2;
    let 攻击类属性 = 磐石之根总值 * 0.1 + 风之轻语总值 * -0.5 + 星火熔炉总值 * 2.9 + 森灵秘语总值 * -0.3 + 匠魂飨宴总值 * 0.4 + 虚空遗尘总值 * 0.2;
    let 恢复类属性 = 磐石之根总值 * 0.4 + 风之轻语总值 * 0.4 + 星火熔炉总值 * 0 + 森灵秘语总值 * 1.2 + 匠魂飨宴总值 * -0.2 + 虚空遗尘总值 * 0.2;
    let 采掘类属性 = 磐石之根总值 * 0 + 风之轻语总值 * 0.2 + 星火熔炉总值 * 0.3 + 森灵秘语总值 * 0 + 匠魂飨宴总值 * 1.5 + 虚空遗尘总值 * 0.2;
    //最终加成系数
    生命类属性 *= 0.01
    防御类属性 *= 0.01
    速度类属性 *= 0.01
    攻击类属性 *= 0.01
    恢复类属性 *= 0.01
    采掘类属性 *= 0.01
    let 属性配置 = {
      生命属性类: [
        "minecraft:generic.max_health",
        // "additionalentityattributes:lung_capacity",
        // "additionalentityattributes:dig_speed",
        "attributeslib:healing_received"
      ],
      防御属性类: [
        "minecraft:generic.armor",
        "minecraft:generic.armor_toughness",
        "minecraft:generic.knockback_resistance",
        "attributeslib:prot_pierce",
        // "additionalentityattributes:magic_protection"
      ],
      速度属性类: [
        "minecraft:generic.movement_speed",
        // "additionalentityattributes:water_speed",
        // "additionalentityattributes:lava_speed",
        "minecraft:generic.flying_speed",
        "forge:swim_speed"
      ],
      攻击属性类: [
        "minecraft:generic.attack_damage",
        "minecraft:generic.attack_speed",
        "attributeslib:crit_chance",
        "attributeslib:crit_damage",
        "attributeslib:armor_pierce",
        "attributeslib:life_steal"
      ],
      恢复属性类: [
        "attributeslib:overheal",
        "attributeslib:healing_received",
        "zombie.spawn_reinforcements",
        // "additionalentityattributes:bonus_loot_count_rolls",
        "minecraft:generic.luck"
      ],
      采掘属性类: [
        // "additionalentityattributes:dig_speed",
        "attributeslib:mining_speed",
        // "additionalentityattributes:bonus_rare_loot_rolls",
        "attributeslib:experience_gained"
      ]
    };
    //修改玩家属性
    let 属性集值 = {
      生命属性类: 生命类属性,
      防御属性类: 防御类属性,
      速度属性类: 速度类属性,
      攻击属性类: 攻击类属性,
      恢复属性类: 恢复类属性,
      采掘属性类: 采掘类属性
    };
    for (let 属性集 in 属性配置) {
      for (let 属性 of 属性配置[属性集]) {
        player.modifyAttribute(属性, "胃", 属性集值[属性集], "multiply_base");
      }
    }
    player.modifyAttribute("forge:block_reach", "胃", 采掘类属性 * 0.1, "multiply_base")
    player.modifyAttribute("forge:entity_reach", "胃", 采掘类属性 * 0.1, "multiply_base")
    //确保玩家在空中时属性变动不会坠机
    if (莓酿离歌总值 == 0 && 上一次莓酿离歌总值 > 0 || 莓酿离歌总值 > 0 && 上一次莓酿离歌总值 == 0) {
      player.modifyAttribute("attributeslib:creative_flight", "莓酿离歌", 莓酿离歌总值 * 0.01, "addition")
      上一次莓酿离歌总值 = 莓酿离歌总值
    }
    let 腌痕铠 = player.getAttributeValue("minecraft:generic.attack_damage") * 腌痕铠胄总值 * 0.002
    player.modifyAttribute("minecraft:generic.armor", "胃", 腌痕铠, "multiply_base")
  }
})

//在重生和登录时使用，为玩家提供可以被加成的基础数值，同时检测一次玩家的胃
let 属性修改 = false
PlayerEvents.respawned(event => {
  初始化属性(event)
})
PlayerEvents.loggedIn(event => {
  初始化属性(event)
})
const 初始化属性表 = [
  "minecraft:generic.attack_knockback",
  //"additionalentityattributes:lung_capacity",
  //"additionalentityattributes:dig_speed",
  //"additionalentityattributes:bonus_loot_count_rolls",
  //"additionalentityattributes:dropped_experience",
  //"additionalentityattributes:magic_protection",
  "attributeslib:life_steal",
  "attributeslib:overheal",
  "attributeslib:prot_pierce"
];
function 初始化属性(event) {
  初始化属性表.forEach(attribute => {
    event.player.modifyAttribute(attribute, "基础值", 0.05, "addition");
  });
  event.player.modifyAttribute("attributeslib:prot_pierce", "基础值", 4, "addition");
  event.player.modifyAttribute("attributeslib:armor_pierce", "基础值", 4, "addition");
  event.player.modifyAttribute("minecraft:generic.luck", "基础值", 4, "addition");
  event.player.modifyAttribute("minecraft:generic.armor", "基础值", 4, "addition");
  event.player.modifyAttribute("minecraft:generic.armor_toughness", "基础值", 2, "addition");
  属性修改 = true
}




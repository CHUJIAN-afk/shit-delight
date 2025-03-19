ItemEvents.tooltip(event => {
    Ingredient.all.getItemIds().forEach(itemId => {
        let TAG_CONFIGS = [
            { tag: 'GXZM', color: '§a', name: '果香织梦', counts: false },
            { tag: 'brewinandchewin:fermented_drinks', color: '§4', name: '莓酿离歌', counts: false },
            { tag: 'XKHX', color: '§5', name: '虚空遗尘', counts: true },
            { tag: 'JHXY', color: '§6', name: '匠魂飨宴', counts: true },
            { tag: 'SLMY', color: '§2', name: '森灵秘语', counts: true },
            { tag: 'XHRL', color: '§c', name: '星火熔炉', counts: true },
            { tag: 'JFZS', color: '§b', name: '风之轻语', counts: true },
            { tag: 'PSZG', color: '§8', name: '磐石之根', counts: true },
            { tag: 'TYGY', color: '§9', name: '餮魇归一', counts: false },
            { tag: 'shit', color: '§6', name: '腐嗅噬心', counts: false },
            { tag: 'FSNJ', color: '§3', name: '潜渊共鸣', counts: false }
        ];
        let itemStack = Item.of(itemId);
        if (!itemStack.edible) return;

        let foodProps = itemStack.getFoodProperties(null);
        if (!foodProps) return;

        let effectiveFM = TAG_CONFIGS.reduce((count, config) =>
            (config.counts && itemStack.hasTag(config.tag)) ? count + 1 : count, 0)


        let baseValue = Math.floor(
            (foodProps.getNutrition() + foodProps.getSaturationModifier() * 0.5) /
            Math.max(effectiveFM, 1) + 1
        );
        let 饥饿值 = foodProps.getNutrition()
        let 饱和度 = foodProps.getSaturationModifier()
        TAG_CONFIGS.forEach(config => {
            if (itemStack.hasTag(config.tag)) {
                let 属性集值 = {
                    '果香织梦': 1,
                    '莓酿离歌': 1,
                    '餮魇归一': 1,
                    '腐嗅噬心': 1,
                    '潜渊共鸣': 1,
                    '虚空遗尘': Math.exp(饥饿值 * 饱和度 * 0.05),
                    '匠魂飨宴': ((饥饿值 / (饱和度 + 1)) + Math.sqrt(饥饿值 + 饱和度)) / 9,
                    '森灵秘语': Math.log(饥饿值 + 1) * (饱和度 + 0.3) / 1.5,
                    '星火熔炉': (Math.pow(饥饿值, 1.2) + Math.pow(饱和度, 1.2)) / 10,
                    '风之轻语': 饥饿值 / (Math.abs(饱和度) + 0.5) / 3,
                    '磐石之根': (饥饿值 - 饱和度) / 5
                };
                event.add(itemId, `${config.color}${config.name} §7${Math.max(Math.floor(baseValue * 属性集值[config.name]), 1)}`);
            }
        });
    });

    event.add('kubejs:magnifying_glass', "§6使用查看胃袋空间，潜行获取总属性")
});

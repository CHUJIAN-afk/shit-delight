const createTabItems = tag => 
    Ingredient.of(tag).getItemIds().map(id => Item.of(id));
const tabConfigs = [
    { suffix: 'QYGM', tag: '#minecraft:FSNJ', displayKey: '潜渊共鸣' },
    { suffix: 'BZQY', tag: '#brewinandchewin:fermented_drinks', displayKey: '莓酿离歌' },
    { suffix: 'GXZM', tag: '#minecraft:GXZM', displayKey: '果香织梦' },
    { suffix: 'XKHX', tag: '#minecraft:XKHX', displayKey: '虚空遗尘' },
    { suffix: 'JHXY', tag: '#minecraft:JHXY', displayKey: '匠魂飨宴' },
    { suffix: 'SLMY', tag: '#minecraft:SLMY', displayKey: '森灵秘语' },
    { suffix: 'FZQY', tag: '#minecraft:JFZS', displayKey: '风之轻语' },
    { suffix: 'PSZG', tag: '#minecraft:PSZG', displayKey: '磐石之根' },
    { suffix: 'FSSX', tag: '#minecraft:shit', displayKey: '腐嗅噬心' },
    { suffix: 'XHRL', tag: '#minecraft:XHRL', displayKey: '星火熔炉' },
    { suffix: 'TYGY', tag: '#minecraft:TYGY', displayKey: '餮魇归一' },
    { suffix: 'YHKZ', tag: '#minecraft:YHKZ', displayKey: '腌痕铠胄' }
];

StartupEvents.registry('creative_mode_tab', event => {
    tabConfigs.forEach(config => {
        event.create(`shit_delight_${config.suffix}`)
            .displayName(Text.translate(`shit.delight.${config.suffix}`))
            .content(() => createTabItems(config.tag));
    });
});

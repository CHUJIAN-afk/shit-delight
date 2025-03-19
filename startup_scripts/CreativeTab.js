const createTabItems = tag =>
    Ingredient.of(tag).getItemIds().map(id => Item.of(id));
const tabConfigs = [
    { suffix: 'QYGM', tag: '#minecraft:FSNJ', displayKey: 'silentsdelight:sculk_shrieker_shake' },
    { suffix: 'BZQY', tag: '#brewinandchewin:fermented_drinks', displayKey: 'brewinandchewin:beer' },
    { suffix: 'GXZM', tag: '#minecraft:GXZM', displayKey: 'fruitsdelight:lychee_jelly' },
    { suffix: 'XKHX', tag: '#minecraft:XKHX', displayKey: 'ends_delight:ender_noodle' },
    { suffix: 'JHXY', tag: '#minecraft:JHXY', displayKey: 'brewinandchewin:vegetable_omelet' },
    { suffix: 'SLMY', tag: '#minecraft:SLMY', displayKey: 'fruitsdelight:blueberry' },
    { suffix: 'FZQY', tag: '#minecraft:JFZS', displayKey: 'miners_delight:glow_squid' },
    { suffix: 'PSZG', tag: '#minecraft:PSZG', displayKey: 'farmersdelight:smoked_ham' },
    { suffix: 'FSSX', tag: '#minecraft:shit', displayKey: 'kubejs:shit' },
    { suffix: 'XHRL', tag: '#minecraft:XHRL', displayKey: 'mynethersdelight:spicy_skewer' },
    { suffix: 'TYGY', tag: '#minecraft:TYGY', displayKey: 'twilightdelight:aurora_pie_slice' },
    { suffix: 'YHKZ', tag: '#minecraft:YHKZ', displayKey: 'vintagedelight:century_egg' }
];
StartupEvents.registry('creative_mode_tab', event => {
    tabConfigs.forEach(config => {
        event.create(`shit_delight_${config.suffix}`)
            .icon(() => Item.of(config.displayKey))
            .displayName(Text.translate(`shit.delight.${config.suffix}`))
            .content(() => createTabItems(config.tag))

    });
});

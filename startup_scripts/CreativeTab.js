

let creative$潜渊共鸣 = () => {
  let lista = []
  Ingredient.of('#minecraft:FSNJ').getItemIds().forEach(id => {
    lista.push(Item.of(id))
  })
  return lista
}
StartupEvents.registry('creative_mode_tab', event => {
  event.create('shit_delight_QYGM')
    .displayName(Text.translate('shit.delight.QYGM'))
    .content(creative$潜渊共鸣)
})
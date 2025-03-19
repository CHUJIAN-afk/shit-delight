StartupEvents.registry("item", event => {
  event.create("shit")
    .food(event => {
      event.hunger(1)
      event.saturation(0.5)
      event.meat()
      event.fastToEat()
      event.alwaysEdible()
      event.effect("fruitsdelight:disgusted", 20 * 60, 0, 1.0)
    })
    .maxStackSize(64)
    .tag("shit")
    .displayName("屎")

  event.create("magnifying_glass")
    .maxStackSize(1)
    .displayName("便携胃镜")
})


YiRanEvents.PotionRegister(event => {
  event.create('yi:testpotion')
    .addEffect('fruitsdelight:disgusted', 20 * 60 * 5, 3)
    .addEffect('fruitsdelight:lozenge', 20 * 60 * 5, 3)

  event.create('ilikethis')
    .addEffect('fruitsdelight:cycling', 20 * 60 * 3, 1)
    .addEffect('attributeslib:flying', 20 * 60 * 3, 1)
})

const CustomEvent = {}
const CustomEvent$Handler = []
const CustomEvent$StomachGui$Change$Handler = []
const CustomEvent$StomachGui$Opened$Handler = []
const CustomEvent$StomachGui$Colsed$Handler = []

/**
 * ### 属性应用事件
 * @param {(event:{player:Internal.ServerPlayer,stage:string})} event 
 */
CustomEvent.AttributeApply = function (event) {
  CustomEvent$Handler.push(event)
}

/**
 * ### 胃袋Gui打开事件
 * @param {(event:{player:Internal.ServerPlayer,container:StomachMenu,stage:string})} event 
 */
CustomEvent.StomachGuiOpen = function (event) {
  CustomEvent$StomachGui$Opened$Handler.push(event)
}

/**
 * ### 胃袋Gui关闭事件
 * @param {(event:{player:Internal.ServerPlayer,container:StomachMenu,stage:string})} event 
 */
CustomEvent.StomachGuiClose = function (event) {
  CustomEvent$StomachGui$Colsed$Handler.push(event)
}

// 属性应用事件触发器
// 胃袋Gui打开事件触发器
PlayerEvents.inventoryOpened(event => {
  if (event.inventoryContainer instanceof StomachMenu) {
    CustomEvent$Handler.forEach(customEvent => customEvent({ player: event.player, stage: 'inventoryOpened' }))
    CustomEvent$StomachGui$Opened$Handler.forEach(customEvent => customEvent({ container: event.inventoryContainer, player: event.player, stage: 'inventoryClosed' }))
  }
})

// 属性应用事件触发器
// 胃袋Gui关闭事件触发器
PlayerEvents.inventoryClosed(event => {
  if (event.inventoryContainer instanceof StomachMenu) {
    CustomEvent$Handler.forEach(customEvent => customEvent({ player: event.player, stage: 'inventoryClosed' }))
    CustomEvent$StomachGui$Colsed$Handler.forEach(customEvent => customEvent({ container: event.inventoryContainer, player: event.player, stage: 'inventoryClosed' }))
  }
})

// 属性应用事件触发器
PlayerEvents.loggedIn(event => {
  CustomEvent$Handler.forEach(customEvent => customEvent({ player: event.player, stage: 'loggedIn' }))
})

// 属性应用事件触发器
PlayerEvents.respawned(event => {
  CustomEvent$Handler.forEach(customEvent => customEvent({ player: event.player, stage: 'respawned' }))
})

/**
 * 新系统（画饼）
 * 玩家初始只给9个胃袋格子（就像是发射器gui）
 * 玩家食用完食物后用set存起来，然后检测数量
 * 等到玩家消化完一定数量的食物后，增加胃袋格子
 * 提示词暂定 "你感觉你的胃口变大了"
 * 目前不能往player类里添加新的container字段
 * 所以现在的胃袋物品存储手段为往persistenData里存入物品list以及胃袋容量
 * 目前有6个数量类型 3*3 9*2 9*3 9*4 9*5 9*6
 * 
 * 设置按键打开胃袋gui
 * 属性应用时间点
 * 打开gui、关闭gui、玩家登录、玩家复活、食物消化……
 * 
 * 属性将重构，舍弃AEA模组
 */

let $NetworkHooks = Java.loadClass('net.minecraftforge.network.NetworkHooks')
let $SimpleMenuProvider = Java.loadClass('net.minecraft.world.SimpleMenuProvider')
let $SimpleContainer = Java.loadClass('net.minecraft.world.SimpleContainer')
let $StomachMenu = Java.loadClass('zank.mods.eventjs.StomachMenu')

function PlayerUtils() {

}

/**
 * 
 * @param {Internal.Player} player 
 */
PlayerUtils.openStomachGui = function (player) {
  $NetworkHooks.openScreen(
    player,
    new $SimpleMenuProvider((containerId, playerInventory, player) =>
      $StomachMenu.StomachMenu_3x3(containerId, playerInventory, new $SimpleContainer(54))
      , Component.translatable('test'))
  )
}

ItemEvents.rightClicked(event => {
  if(event.hand == 'main_hand')
  PlayerUtils.openStomachGui(event.player)
})


NetworkEvents.dataReceived('openStomachMenu',event=>{
  PlayerUtils.openStomachGui(event.player)
})


const CustomEvent = {}
const CustomEvent$Handler = []
/**
 * 
 * @param {(event:{stage:string,player:Internal.ServerPlayer})} event 
 */
CustomEvent.属性应用 = function (event) {
  CustomEvent$Handler.push(event)
}
PlayerEvents.inventoryOpened(event => {
  if (event.inventoryContainer instanceof StomachMenu)
    CustomEvent$Handler.forEach(CE => CE({ player: event.player, stage: 'inventoryOpened' }))
})
PlayerEvents.inventoryClosed(event => {
  if (event.inventoryContainer instanceof StomachMenu)
    CustomEvent$Handler.forEach(CE => CE({ player: event.player, stage: 'inventoryClosed' }))
})
PlayerEvents.loggedIn(event => {
  CustomEvent$Handler.forEach(CE => CE({ player: event.player, stage: 'loggedIn' }))
})
PlayerEvents.respawned(event => {
  CustomEvent$Handler.forEach(CE => CE({ player: event.player, stage: 'loggedIn' }))
})
CustomEvent.属性应用(e => {
  e.player.tell(e.stage)
})
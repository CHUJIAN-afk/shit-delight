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



/**
 * 
 * 卧槽，写成屎山了
 * 等明天的时候重构救一下 
 * 把部分重复代码提出来写成function
 * 
 */

let $NetworkHooks = Java.loadClass('net.minecraftforge.network.NetworkHooks')
let $SimpleMenuProvider = Java.loadClass('net.minecraft.world.SimpleMenuProvider')
let $SimpleContainer = Java.loadClass('net.minecraft.world.SimpleContainer')
let $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
let $NonNullList = Java.loadClass('net.minecraft.core.NonNullList')

// 初始化胃
PlayerEvents.loggedIn(event => {
  if (!event.player.persistentData.StomachItem) {
    event.player.persistentData.StomachItem = $NonNullList.withSize(9, Item.empty)
    event.player.persistentData.StomachType = 'StomachMenu_3x3'
    event.player.persistentData.StomachSize = 9
    console.info(event.player.persistentData.StomachItem)
  }
})

// util就不要用hotai写在类里面了
// 这些都是改动会比较频繁的东西，等写完了再整进去类里面也行

// 打开gui我准备使用StomachMenu[MenuType]的方式
// 后续在更新gui类型的时候，记得往新加的格子填充空物品
NetworkEvents.dataReceived('openStomachMenu', event => {
  // ShitDelightUtils.openStomachGui(
  //   "eventjs:stomach_menu_3x3",
  //   event.player,
  //   9,
  //   event.player.persistentData.getList('StomachItem', 10)
  // )
  let items = []
  console.info(event.player.persistentData.StomachItem)
  event.player.persistentData.StomachItem.forEach(tag => {
    console.info(tag)
    items.push($ItemStack.of(tag))
  })

  $NetworkHooks.openScreen(
    event.player,
    new $SimpleMenuProvider(
      (containerId, playerInventory, player) =>
        StomachMenu[event.player.persistentData.StomachType](containerId, playerInventory, new $SimpleContainer(
          items
        )),
      Component.of('xxx')
    )
  )
})

// 属性应用
// 等把下面的代码整理一下，然后写一个getStomachItem的方法
// 之后就只用在这里写属性更新了
CustomEvent.AttributeApply(event => {
  let { player, container, stage } = event
  player.tell(event.stage)
})


// 保存胃袋物品
// container是玩家Inventory + 本来的container
// 所以多get一层
// 直接获取的allitems会去除空物品，所以用for遍历
// 又被折磨了2小时……
CustomEvent.StomachGuiClose(event => {
  let { player, container, stage } = event
  let list = []
  for (let i = 0; i < container.size; i++) {
    list.push(container.container.getItem(i))
  }
  player.persistentData.StomachItem = list
})

// 食用物品后往胃里存储
// 注释写的可以取消，但我取消不了，不知道为什么
// 后面直接检测胃部满没满，然后取消右键事件算了
// 我眠了
ItemEvents.foodEaten(event => {
  let { player, item } = event
  let items = []
  let index = -1

  player.persistentData.StomachItem.forEach(tag => {
    items.push($ItemStack.of(tag))
  })

  for (let i = items.length; i >= 0; i--) {
    if (items[i] == Item.empty) {
      index = i
    }
  }
  if (index != -1) {
    let temp = item.copy()
    temp.setCount(1)
    items[index] = temp
  } else {
    player.tell(index)
    event.cancel()
  }
  
  player.persistentData.StomachItem = items
})

if (false) {//测试使用
  /**
   * @type {Internal.Player}
   */
  let player = Utils.server.players[0]
  // player.setContainer([Item.of("diamond"), Item.of("diamond"), Item.of("diamond", 50)])


  // player.addContainerItem(Item.of('acacia_boat'))
  player.tell(player.container)

  player.tell(player.findFirstItemInContainer(Item.of('acacia_boat')))
  player.tell(player.findItemsInContainer(Item.of("diamond")))
}
/*
container为ItemStack[]
可以通过SetContainer来修改整个container
通过addContainerItem来添加一个item

find仅匹配itemstack的item是否相同,不匹配nbt
通过findFirstItemInContainer来查找第一个符合的item
通过findItemsInContainer来查找符合的item
*/
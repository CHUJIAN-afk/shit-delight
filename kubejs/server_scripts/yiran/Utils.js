let $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')

/**
 * @param {Internal.Player} player 
 * @param {Special.Menu} chestType 
 * @param {number} lineCount 
 * @param {number} windowid 
 * @param {Internal.Container} containerItem 
 * @param {string} name
 */
function openChestMenu(player, chestType, lineCount, windowid, containerItem, name) {
  player.openMenu(
    new $SimpleMenuProvider((WID, INV, PLA) =>
      new $ChestMenu(chestType, windowid == null ? WID : windowid, INV, containerItem, lineCount),
      Component.of(name)
    )
  )
}
/**
 * @param {Item_[]} itemList 
 * @param {number} count 
 */
function itemList2Container(itemList, count) {
  if (!count)
    return new $SimpleContainer(itemList).asContainer()
  for (let i = itemList.length; i < count; i++)
    itemList.push(Item.of('air'))
  return new $SimpleContainer(itemList).asContainer()
}
//使用示例
// if(false)
// ItemEvents.firstLeftClicked(e=>{
//     openChestMenu(e.player,'generic_9x1',1,null,itemList2Container([],9),'test')
// })

const StomachUtils = {
  /**
   * #### 获取玩家胃中物品列表
   * @param {Internal.Player} player 
   * @returns {Internal.ItemStack[]}
   */
  getStomachItems: function (player) {
    let items = []
    player.persistentData.StomachItem.forEach(tag => {
      items.push($ItemStack.of(tag))
    })
    return items
  },
  /**
   * #### 获取玩家胃中物品Container
   * @param {Internal.Player} player 
   * @returns {Internal.SimpleContainer}
   */
  getStomachContainer: function (player) {
    let items = []
    player.persistentData.StomachItem.forEach(tag => {
      items.push($ItemStack.of(tag))
    })
    return new $SimpleContainer(items)
  },
  /**
   * #### 设置胃对应槽位中的item
   * @param {Internal.Player} player 
   * @param {Internal.ItemStack} item 
   * @param {number} slot 
   * @returns {boolean}
   */
  setItemInStomach: function (player, item, slot) {
    if (player.persistentData.StomachSize < slot) return false
    let items = this.getStomachItems(player)
    let temp = item.copy()
    temp.setCount(1)
    items[slot] = temp
    player.persistentData.StomachItem = items
    return true
  },
  /**
   * #### 往玩家的胃中添加物品
   * @param {Internal.Player} player 
   * @param {Internal.ItemStack} item 
   */
  addItemInStomach: function (player, item) {
    let items = this.getStomachItems(player)
    let index = -1
    for (let i = items.length; i >= 0; i--) {
      if (items[i] == Item.empty) {
        index = i
      }
    }
    if (index != -1) {
      let temp = item.copy()
      temp.setCount(1)
      items[i] = temp
      return true
    } else {
      return false
    }
  }
}

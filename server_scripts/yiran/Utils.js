
/**
 * @param {Internal.Player} player 
 * @param {Special.Menu} chestType 
 * @param {number} lineCount 
 * @param {number} windowid 
 * @param {Internal.Container} containerItem 
 * @param {string} name
 */
function openChestMenu(player, chestType, lineCount, windowid, containerItem,name) {
    player.openMenu(
        new $SimpleMenuProvider((WID, INV, PLA) =>
            new $ChestMenu(chestType, windowid==null?WID:windowid, INV, containerItem, lineCount),
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
if(false)
ItemEvents.firstLeftClicked(e=>{
    openChestMenu(e.player,'generic_9x1',1,null,itemList2Container([],9),'test')
})
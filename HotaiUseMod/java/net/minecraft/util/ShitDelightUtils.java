package net.minecraft.util;

import dev.latvian.mods.kubejs.util.ConsoleJS;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.Container;
import net.minecraft.world.SimpleContainer;
import net.minecraft.world.SimpleMenuProvider;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.MenuType;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.network.NetworkHooks;
import org.jetbrains.annotations.NotNull;
import zank.mods.eventjs.StomachMenu;

import javax.annotation.Nullable;
import java.util.ArrayList;

public class ShitDelightUtils {
    public static ShitDelightUtils INSTANCE = new ShitDelightUtils();

    public ShitDelightUtils() {
    }

    public Container getContainer(int number) {
        return new SimpleContainer(number);
    }

    public Container getContainer(ItemStack[] items) {
        return new SimpleContainer(items);
    }



    public void openStomachGui(MenuType<?> menuType, Player player,int size,@NotNull ListTag items, Component title) {
        ArrayList<ItemStack> ItemList = new ArrayList<>();
            items.forEach(tag -> {
                        ConsoleJS.SERVER.log(tag);
                        ItemList.add(ItemStack.of((CompoundTag) tag));
                    }
            );
            for (int i = ItemList.size() - 1; i < size; i++) {
                ItemList.add(ItemStack.EMPTY);
            }
        NetworkHooks.openScreen(
                (ServerPlayer) player,
                new SimpleMenuProvider(
                        (i, inventory, player1) ->
                                new StomachMenu(menuType,i, inventory, getContainer(ItemList.toArray(new ItemStack[0])),size),
                        title
                )
        );
    }


}

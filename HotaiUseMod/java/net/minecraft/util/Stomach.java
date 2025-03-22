package net.minecraft.util;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.Container;
import net.minecraft.world.SimpleMenuProvider;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.MenuType;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.network.NetworkHooks;
import zank.mods.eventjs.StomachMenu;

import java.util.ArrayList;
import java.util.Collections;

public class Stomach {
    public ItemStack[] container;
    public Player player;
    public int size;
    public String menu;
    public int randomTick;

    public Stomach(Player player, CompoundTag pCompoundTag) {
        this.player = player;
        ArrayList<ItemStack> containerItems = new ArrayList<>();
        pCompoundTag.getList("container",10).forEach((tag) -> containerItems.add(ItemStack.of((CompoundTag) tag)));
        this.container = containerItems.toArray(new ItemStack[0]);
        this.size = containerItems.size();
        this.menu = pCompoundTag.getString("menu");
        this.randomTick = 3;
    }

    public boolean setSize(int size) {
        if (this.size>=size) return false;
        ArrayList<ItemStack> newContainer = new ArrayList<>();
        Collections.addAll(newContainer, container);
        while (newContainer.size() < size) {
            newContainer.add(ItemStack.EMPTY);
        }
        this.container = newContainer.toArray(new ItemStack[0]);
        this.size = size;
        return true;
    }

    public ItemStack[] getStomachItems() {
        return this.container;
    }

    public void removeStomachItem(int slot) {
        this.container[slot] = ItemStack.EMPTY;
    }

    public void replaceStomachItem(int slot, ItemStack stack) {
        this.container[slot] = stack;
    }

    public Boolean addStomachItem(ItemStack itemStack) {
        ArrayList<ItemStack> newContainer = new ArrayList<>();
        boolean added = false;
        for (ItemStack stack : this.container) {
            if(!added && stack == ItemStack.EMPTY) {
                newContainer.add(itemStack);
                added = true;
            }else {
                newContainer.add(stack);
            }
        }
        if (added) {
            this.container = newContainer.toArray(new ItemStack[0]);
        }
        return added;
    }

    public void setStomachItems(ItemStack[] stomachItems) {
        this.container = stomachItems;
    }

    public int findFirstItem(ItemStack stack) {
        int index = -1;
        for (ItemStack itemStack : this.container) {
            index++;
            if (itemStack.getItem() == stack.getItem()) {
                return index;
            }
        }
        return index;
    }

    public Integer[] findItems(ItemStack stack) {
        ArrayList<Integer> slots = new ArrayList<>();
        int index = -1;
        for (ItemStack stack1 : container) {
            index += 1;
            if (stack1.getItem() == stack.getItem()) {
                slots.add(index);
            }
        }
        return slots.toArray(new Integer[0]);
    }

    public MenuType<?> getMenuType() {
        if (this.size <= 3 * 3) return StomachMenu.STOMACH_MENU_3x3.get();
        if (this.size <= 9 * 2) return StomachMenu.STOMACH_MENU_9x2.get();
        if (this.size <= 9 * 3) return StomachMenu.STOMACH_MENU_3x3.get();
        if (this.size <= 9 * 4) return StomachMenu.STOMACH_MENU_9x4.get();
        if (this.size <= 9 * 5) return StomachMenu.STOMACH_MENU_9x5.get();
        if (this.size <= 9 * 6) return StomachMenu.STOMACH_MENU_9x6.get();
        return StomachMenu.STOMACH_MENU_3x3.get();
    }

    public void openMenu(Component title) {
        NetworkHooks.openScreen(
                (ServerPlayer) this.player,
                new SimpleMenuProvider(
                        (i, inventory, player1) -> new StomachMenu(StomachMenu.STOMACH_MENU_3x3.get(), i, inventory, getContainer(), size),
                        title)
        );
    }

    public Container getContainer(){
        return new NoSimpleContainer(this.container);
    }

    public ItemStack[] getRandomTickItems(){
        ArrayList<ItemStack> items = new ArrayList<>();
        for (int i = 0; i < this.randomTick; i++) {
            ItemStack itemStack = this.container[(int)( Math.random()*this.size)];
            if (!itemStack.isEmpty()) {
                items.add(itemStack);
            }

        }
        return items.toArray(new ItemStack[0]);
    }

    public CompoundTag save() {
        CompoundTag tag = new CompoundTag();
        ListTag listTag = new ListTag();
        for (ItemStack itemStack : this.container) {
            listTag.add(itemStack.serializeNBT());
        }
        tag.put("container", listTag);
        tag.putString("menu", this.menu);
        return tag;
    }
}

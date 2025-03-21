package net.minecraft.util;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;

import java.util.ArrayList;
import java.util.Collections;

public class Stomach {
    public ItemStack[] container;
    public Player player;
    public int size;

    public Stomach(Player player, ListTag containerListTag) {
        this.player = player;
        ArrayList<ItemStack> containerItems = new ArrayList<>();
        containerListTag.forEach((tag) -> containerItems.add(ItemStack.of((CompoundTag) tag)));
        this.container = containerItems.toArray(new ItemStack[0]);
        this.size = containerItems.size();
    }

    public boolean setSize(int size) {
        if (this.size>=size) return false;
        ArrayList<ItemStack> newContainer = new ArrayList<>();
        Collections.addAll(newContainer, container);
        while (newContainer.size() < size) {
            newContainer.add(ItemStack.EMPTY);
        }
        this.container = newContainer.toArray(new ItemStack[0]);
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



    public ListTag save() {
        ListTag listTag = new ListTag();
        for (ItemStack itemStack : this.container) {
            listTag.add(itemStack.serializeNBT());
        }
        return listTag;
    }
}

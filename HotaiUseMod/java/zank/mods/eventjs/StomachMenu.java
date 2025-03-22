package zank.mods.eventjs;

import net.minecraft.world.Container;
import net.minecraft.world.SimpleContainer;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.flag.FeatureFlags;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.inventory.MenuType;
import net.minecraft.world.inventory.Slot;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;

import java.util.function.Supplier;

public class StomachMenu extends AbstractContainerMenu {
	public static final DeferredRegister<MenuType<?>> MENU = DeferredRegister.create(ForgeRegistries.MENU_TYPES, "shit_delight");

	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_3x3 = MENU.register("stomach_menu_3x3", () -> new MenuType<>(StomachMenu::StomachMenu_3x3, FeatureFlags.DEFAULT_FLAGS));
	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_9x2 = MENU.register("stomach_menu_9x2", () -> new MenuType<>(StomachMenu::StomachMenu_9x2, FeatureFlags.DEFAULT_FLAGS));
	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_9x3 = MENU.register("stomach_menu_9x3", () -> new MenuType<>(StomachMenu::StomachMenu_9x3, FeatureFlags.DEFAULT_FLAGS));
	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_9x4 = MENU.register("stomach_menu_9x4", () -> new MenuType<>(StomachMenu::StomachMenu_9x4, FeatureFlags.DEFAULT_FLAGS));
	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_9x5 = MENU.register("stomach_menu_9x5", () -> new MenuType<>(StomachMenu::StomachMenu_9x5, FeatureFlags.DEFAULT_FLAGS));
	public static final Supplier<MenuType<StomachMenu>> STOMACH_MENU_9x6 = MENU.register("stomach_menu_9x6", () -> new MenuType<>(StomachMenu::StomachMenu_9x6, FeatureFlags.DEFAULT_FLAGS));

	public Player player;
	public Inventory inventory;
	public Container container;
	public int size;

	public StomachMenu(MenuType<?> menuType, int containerId, Inventory inventory, Container container, int size) {
		super(menuType, containerId);
		this.player = inventory.player;
		this.inventory = inventory;
		this.container = container;
		this.size = size;
		if (size == 9) {
			for (int i = 0; i < 3; ++i) {
				for (int j = 0; j < 3; ++j) {
					this.addSlot(new Slot(container, j + i * 3, 62 + j * 18, 17 + i * 18) {
						@Override
						public int getMaxStackSize() {
							return 1;
						}
					});
				}
			}

			for(int k = 0; k < 3; ++k) {
				for(int i1 = 0; i1 < 9; ++i1) {
					this.addSlot(new Slot(inventory, i1 + k * 9 + 9, 8 + i1 * 18, 84 + k * 18));
				}
			}

			for(int l = 0; l < 9; ++l) {
				this.addSlot(new Slot(inventory, l, 8 + l * 18, 142));
			}
		}else {
			int row = size / 9;
			int i = (row - 4) * 18;
			for (int j = 0; j < row; ++j) {
				for (int k = 0; k < 9; ++k) {
					this.addSlot(new Slot(container, k + j * 9, 8 + k * 18, 18 + j * 18){
						@Override
						public int getMaxStackSize() {
							return 1;
						}
					});
				}
			}

			for(int l = 0; l < 3; ++l) {
				for(int j1 = 0; j1 < 9; ++j1) {
					this.addSlot(new Slot(inventory, j1 + l * 9 + 9, 8 + j1 * 18, 103 + l * 18 + i));
				}
			}

			for(int i1 = 0; i1 < 9; ++i1) {
				this.addSlot(new Slot(inventory, i1, 8 + i1 * 18, 161 + i));
			}
		}
	}

	public static StomachMenu StomachMenu_3x3(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_3x3.get(), containerId, inventory, new SimpleContainer(9), 9);
	}

	public static StomachMenu StomachMenu_3x3(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_3x3.get(), containerId, inventory, container, 9);
	}

	public static StomachMenu StomachMenu_9x2(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_9x2.get(), containerId, inventory, new SimpleContainer(18), 18);
	}

	public static StomachMenu StomachMenu_9x2(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_9x2.get(), containerId, inventory, container, 18);
	}

	public static StomachMenu StomachMenu_9x3(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_9x3.get(), containerId, inventory, new SimpleContainer(27), 27);
	}

	public static StomachMenu StomachMenu_9x3(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_9x3.get(), containerId, inventory, container, 27);
	}

	public static StomachMenu StomachMenu_9x4(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_9x4.get(), containerId, inventory, new SimpleContainer(36), 36);
	}

	public static StomachMenu StomachMenu_9x4(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_9x4.get(), containerId, inventory, container, 36);
	}

	public static StomachMenu StomachMenu_9x5(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_9x5.get(), containerId, inventory, new SimpleContainer(45), 45);
	}

	public static StomachMenu StomachMenu_9x5(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_9x5.get(), containerId, inventory, container, 45);
	}

	public static StomachMenu StomachMenu_9x6(int containerId, Inventory inventory) {
		return new StomachMenu(STOMACH_MENU_9x6.get(), containerId, inventory, new SimpleContainer(54), 54);
	}

	public static StomachMenu StomachMenu_9x6(int containerId, Inventory inventory, Container container) {
		return new StomachMenu(STOMACH_MENU_9x6.get(), containerId, inventory, container, 54);
	}

	@Override
	public ItemStack quickMoveStack(Player player, int i) {
		ItemStack itemstack = ItemStack.EMPTY;
		Slot slot = this.slots.get(i);
		if (slot != null && slot.hasItem()) {
			ItemStack itemstack1 = slot.getItem();
			itemstack = itemstack1.copy();
			if (i < this.size) {
				if (!this.moveItemStackTo(itemstack1, this.size, this.slots.size(), true)) {
					return ItemStack.EMPTY;
				}
			} else if (!this.moveItemStackTo(itemstack1, 0, this.size, false)) {
				return ItemStack.EMPTY;
			}

			if (itemstack1.isEmpty()) {
				slot.setByPlayer(ItemStack.EMPTY);
			} else {
				slot.setChanged();
			}
		}

		return itemstack;
	}

	@Override
	public boolean stillValid(Player player) {
		return true;
	}
}

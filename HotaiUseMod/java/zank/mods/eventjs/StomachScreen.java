package zank.mods.eventjs;

import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.components.Renderable;
import net.minecraft.client.gui.components.events.GuiEventListener;
import net.minecraft.client.gui.narration.NarratableEntry;
import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.client.gui.screens.inventory.MenuAccess;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.entity.player.Inventory;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;

@OnlyIn(Dist.CLIENT)
public class StomachScreen extends AbstractContainerScreen<StomachMenu> implements MenuAccess<StomachMenu> {
	public static ResourceLocation BACKGROUND_3x3 = new ResourceLocation("textures/gui/container/dispenser.png");
	public static ResourceLocation BACKGROUND_9 = new ResourceLocation("textures/gui/container/generic_54.png");
	public int size;
	public int row;

	public StomachScreen(StomachMenu stomachMenu, Inventory inventory, Component component) {
		super(stomachMenu, inventory, component);
		this.size = stomachMenu.size;
		if (this.size != 9) {
			this.row = this.size / 9;
			this.imageHeight = 114 + this.row * 18;
			this.inventoryLabelY = this.imageHeight - 94;
		}
	}

	@Override
	public void render(GuiGraphics guiGraphics, int mouseX, int mouseY, float partialTick) {
		this.renderBackground(guiGraphics);
		super.render(guiGraphics, mouseX, mouseY, partialTick);
		this.renderTooltip(guiGraphics, mouseX, mouseY);
	}

	@Override
	protected void renderBg(GuiGraphics guiGraphics, float partialTick, int mouseX, int mouseY) {
		int i = (this.width - this.imageWidth) / 2;
		int j = (this.height - this.imageHeight) / 2;
		if (this.size == 9) {
			guiGraphics.blit(BACKGROUND_3x3, i, j, 0, 0, this.imageWidth, this.imageHeight);
		} else {
			guiGraphics.blit(BACKGROUND_9, i, j, 0, 0, this.imageWidth, this.row * 18 + 17);
			guiGraphics.blit(BACKGROUND_9, i, j + this.row * 18 + 17, 0, 126, this.imageWidth, 96);
		}
	}

	@Override
	public <T extends Renderable> T addRenderableOnly(T t) {
		return null;
	}

	@Override
	public <T extends GuiEventListener & NarratableEntry> T addWidget(T t) {
		return null;
	}
}

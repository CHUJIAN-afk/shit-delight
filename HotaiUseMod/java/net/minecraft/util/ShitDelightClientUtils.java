package net.minecraft.util;

import com.mojang.blaze3d.vertex.PoseStack;
import net.minecraft.client.gui.GuiGraphics;
import org.joml.Quaternionf;

import java.awt.*;

public class ShitDelightClientUtils {
    public static ShitDelightClientUtils INSTANCE = new ShitDelightClientUtils();

    public ShitDelightClientUtils() {
    }

    public int RGBA(int r, int g, int b, int a) {
        return new Color(r, g, b, a).getRGB();
    }

    public void drawLine(GuiGraphics guiGraphics, PoseStack poseStack, int x1, int y1, int x2, int y2, int w, int color) {
        int dx = x2 - x1;
        int dy = y2 - y1;
        double length = Math.sqrt(dx * dx + dy * dy);
        poseStack.pushPose();
        poseStack.translate((float) (x1 + x2) / 2, (float) (y1 + y2) / 2, 0);
        poseStack.mulPose(new Quaternionf().rotateZ((float) Math.atan2(dy, dx)));
        poseStack.translate(0, (float) -w / 2, 0);
        guiGraphics.fill((int) (-length / 2), 0, (int) (length / 2), w, color);
        poseStack.popPose();
    }

}

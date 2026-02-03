import { _electron as electron, expect, test } from "@playwright/test";
import { ElectronApplication, JSHandle, Page } from "playwright-core";
import { preview, PreviewServer } from "vite";
import { productName } from "../package.json";

test.setTimeout(60000);

test.describe("Window Loads Properly", () => {
  let app: ElectronApplication;
  let server: PreviewServer;
  let win: Page;
  let browserWindow: JSHandle;

  test.beforeAll("beforeAll", async () => {
    console.debug("Starting Vite preview server...");
    // Wait for dev server to start
    server = await preview({
      preview: {
        port: 3678,
        open: false,
      },
    });
    if (!server.resolvedUrls) {
      throw new Error("Server failed to start");
    }
    const { local } = server.resolvedUrls;

    // Launch Electron app
    app = await electron.launch({
      args: [".", "--no-sandbox", "--host=random_host.local"],
      env: { ...process.env, VITE_DEV_SERVER_URL: local[0] },
    });
    win = await app.firstWindow();
    console.debug("App launched and first window obtained");
    browserWindow = await app.browserWindow(win);
  });

  test.afterAll("afterAll", async () => {
    console.debug("Cleaning up...");
    if (app) {
      console.debug("Closing app");
      await app.close();
    }
    if (server) {
      console.debug("Closing server");
      await server.close();
    }
  });

  test("Window count is one", async () => {
    expect(app.windows().length).toBe(1);
  });

  test("Window is not minimized", async () => {
    const isMinimized = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.isMinimized();
    });
    expect(isMinimized).toBe(false);
  });

  test("Window is visible", async () => {
    const isVisible = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.isVisible();
    });
    expect(isVisible).toBe(true);
  });

  test("Window bounds are correct", async () => {
    const { height, width } = await browserWindow.evaluate((browserWindow) => {
      return { ...browserWindow.getBounds() };
    });
    expect(width).toBe(375);
    expect(height).toBe(60);
  });

  test("Window is not resizable", async () => {
    const isResizable = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.isResizable();
    });
    expect(isResizable).toBe(false);
  });

  test("Window should be always on top", async () => {
    const isAlwaysOnTop = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.isAlwaysOnTop();
    });
    expect(isAlwaysOnTop).toBe(true);
  });

  test("Window title is correct", async () => {
    const title = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.getTitle();
    });
    expect(title).toBe(productName);
  });

  test("DevTools are closed", async () => {
    const isDevToolsOpened = await browserWindow.evaluate((browserWindow) => {
      return browserWindow.isDevToolsOpened();
    });
    expect(isDevToolsOpened).toBe(false);
  });

  test("Argument passing works", async () => {
    const argv: string[] = await app.evaluate(async () => process.argv);
    expect(argv).toContain("--host=random_host.local");
  });

  test("preload function is available", async () => {
    const result = await win.evaluate(async () => {
      return typeof window?.args?.host === "function";
    });
    expect(result).toBe(true);
  });

  test("host function returns correct value", async () => {
    const host = await win.evaluate(async () => {
      return await window.args.host();
    });
    expect(host).toBe("random_host.local");
  });
});

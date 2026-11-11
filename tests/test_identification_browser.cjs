"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  os = require("node:os"),
  path = require("node:path"),
  { spawn } = require("node:child_process"),
  { waitForDebugger } = require("./chrome_support.js");
require("../docs/identification-data.js");
const fixtures = globalThis.AlignLabIdentificationFixtures;
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
test(
  "actual Chrome: exact identification controls, all corners, editing, downloads and responsive layouts",
  { timeout: 180000 },
  async () => {
    const profile = fs.mkdtempSync(
        path.join(os.tmpdir(), "align-identification-"),
      ),
      browser = spawn(
        process.env.CHROME_BIN || "google-chrome",
        [
          "--headless",
          "--no-sandbox",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-dev-shm-usage",
          "--remote-debugging-port=0",
          `--user-data-dir=${profile}`,
          "about:blank",
        ],
        { stdio: ["ignore", "ignore", "pipe"] },
      );
    let ws,
      startupError,
      diagnostics = "";
    browser.on("error", (e) => (startupError = e));
    browser.stderr.on(
      "data",
      (d) => (diagnostics = (diagnostics + d).slice(-4000)),
    );
    try {
      for (
        let i = 0;
        i < 1200 &&
        !startupError &&
        browser.exitCode === null &&
        !fs.existsSync(path.join(profile, "DevToolsActivePort"));
        i++
      )
        await delay(25);
      assert.ok(
        fs.existsSync(path.join(profile, "DevToolsActivePort")),
        startupError?.message || diagnostics || "Chrome unavailable",
      );
      const port = fs
          .readFileSync(path.join(profile, "DevToolsActivePort"), "utf8")
          .split("\n")[0],
        tab = await waitForDebugger(`http://127.0.0.1:${port}/json/list`, {
          alive: () => browser.exitCode === null && !startupError,
        });
      ws = new WebSocket(tab.webSocketDebuggerUrl);
      await new Promise((res, rej) => {
        ws.onopen = res;
        ws.onerror = rej;
      });
      let seq = 0;
      const pending = new Map();
      ws.onmessage = (e) => {
        const m = JSON.parse(e.data);
        if (pending.has(m.id)) {
          const { res, rej } = pending.get(m.id);
          pending.delete(m.id);
          m.error ? rej(Error(JSON.stringify(m.error))) : res(m.result);
        }
      };
      const call = (method, params = {}) =>
        new Promise((res, rej) => {
          const id = ++seq;
          pending.set(id, { res, rej });
          ws.send(JSON.stringify({ id, method, params }));
        });
      const js = async (expression) => {
        const r = await call("Runtime.evaluate", {
          expression,
          returnByValue: true,
          awaitPromise: true,
        });
        if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
        return r.result.value;
      };

      await call("Page.enable");
      await call("Page.navigate", {
        url:
          process.env.IDENTIFICATION_URL ||
          "file://" + path.resolve(__dirname, "../docs/identification.html"),
      });
      for (let i = 0; i < 300; i++) {
        if (await js("Boolean(globalThis.AlignLabIdentificationState?.report)"))
          break;
        await delay(20);
      }
      assert.equal(
        await js("AlignLabIdentificationState.report.schema"),
        "alignlab-identification-v1",
      );
      const set = async (id, value, event = "input") =>
        js(
          `document.getElementById(${JSON.stringify(id)}).value=${JSON.stringify(String(value))};document.getElementById(${JSON.stringify(id)}).dispatchEvent(new Event(${JSON.stringify(event)},{bubbles:true}))`,
        );
      let leaves = 0,
        vertices = 0;
      for (let i = 0; i < fixtures.length; i++) {
        await set("scenario", i, "change");
        assert.deepEqual(
          await js("AlignLabIdentificationState.report"),
          fixtures[i].report,
        );
        const f = fixtures[i].report.policy_family;
        assert.equal(await js('document.getElementById("family").hidden'), !f);
        if (f) {
          vertices += f.vertices.length;
          assert.equal(
            await js('document.querySelectorAll("#corners tbody tr").length'),
            f.vertices.length,
          );
          for (const v of f.vertices) {
            await set("vertex", v.id, "change");
            assert.deepEqual(
              await js(
                'JSON.parse(document.getElementById("selected").textContent)',
              ),
              v,
            );
          }
        }
      }
      assert.equal(vertices, 107);
      for (const bad of [
        '{"a":1,"a":2}',
        '{"a":1,"\\u0061":2}',
        '{"a":0.1}',
        '{"a":NaN}',
        "[".repeat(49) + "]".repeat(49),
      ]) {
        await set("custom", bad);
        assert.equal(await js("AlignLabIdentificationState"), null);
        assert.equal(
          await js('document.getElementById("results").hidden'),
          true,
        );
        assert.equal(
          await js('document.getElementById("report-export").disabled'),
          true,
        );
        await js('document.getElementById("apply").click()');
        assert.equal(await js("AlignLabIdentificationState"), null);
        assert.ok(
          await js('document.getElementById("error").textContent.length>0'),
        );
      }
      await set("custom", JSON.stringify(fixtures[0].input));
      await js('document.getElementById("apply").click()');
      assert.deepEqual(
        await js("AlignLabIdentificationState.report"),
        fixtures[0].report,
      );
      // Real trusted typing invalidates the stale report before any apply click.
      await js(
        'document.getElementById("custom").closest("details").open=true;document.getElementById("custom").focus()',
      );
      await call("Input.insertText", { text: "x" });
      assert.equal(await js("AlignLabIdentificationState"), null);
      assert.equal(
        await js('document.getElementById("input-export").disabled'),
        true,
      );
      await set("scenario", 0, "change");
      const downloadDir = fs.mkdtempSync(
        path.join(os.tmpdir(), "align-ident-download-"),
      );
      try {
        await call("Browser.setDownloadBehavior", {
          behavior: "allow",
          downloadPath: downloadDir,
        });
        for (const kind of ["input", "report"]) {
          await js(`document.getElementById('${kind}-export').click()`);
          const p = path.join(
            downloadDir,
            `alignlab-identification-${kind}.json`,
          );
          for (let k = 0; k < 200 && !fs.existsSync(p); k++) await delay(20);
          assert.deepEqual(
            JSON.parse(fs.readFileSync(p, "utf8")),
            kind === "input" ? fixtures[0].report.input : fixtures[0].report,
          );
        }
      } finally {
        fs.rmSync(downloadDir, { recursive: true, force: true });
      }
      const directory = process.env.IDENTIFICATION_PIXELS;
      if (directory) fs.mkdirSync(directory, { recursive: true });
      for (const width of [320, 390, 1280])
        for (let i = 0; i < fixtures.length; i++) {
          await call("Emulation.setDeviceMetricsOverride", {
            width,
            height: 1000,
            deviceScaleFactor: 1,
            mobile: width < 700,
          });
          await set("scenario", i, "change");
          await js(
            'for(const d of document.querySelectorAll("details"))d.open=true;document.activeElement.blur();window.scrollTo(0,0)',
          );
          assert.ok(
            await js("document.documentElement.scrollWidth<=innerWidth"),
            "overflow " + width + " " + i,
          );
          assert.ok(
            await js(
              'Array.from(document.querySelectorAll("button,select,summary")).filter(e=>e.getClientRects().length).every(e=>e.getBoundingClientRect().height>=44)',
            ),
            "touch " + width + " " + i,
          );
          if (directory) {
            const m = await call("Page.getLayoutMetrics"),
              height = Math.ceil(m.cssContentSize.height);
            await call("Emulation.setDeviceMetricsOverride", {
              width,
              height,
              deviceScaleFactor: 1,
              mobile: width < 700,
            });
            await js(
              "new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))",
            );
            const image = await call("Page.captureScreenshot", {
              format: "png",
              captureBeyondViewport: true,
              clip: { x: 0, y: 0, width, height, scale: 1 },
            });
            fs.writeFileSync(
              path.join(directory, fixtures[i].id + "-" + width + ".png"),
              Buffer.from(image.data, "base64"),
            );
          }
        }
      console.log(
        "12 complete reports;107 corner selections;36 responsive layouts;trusted edit invalidation;2 actual JSON downloads",
      );
    } finally {
      if (ws) ws.close();
      if (browser.pid && browser.exitCode === null) {
        browser.kill("SIGTERM");
        await new Promise((r) => browser.once("exit", r));
      }
      await fs.promises.rm(profile, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 200,
      });
    }
  },
);

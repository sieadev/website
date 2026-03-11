A few months ago I kept running into the same problem. I wanted to add extensibility to Java applications — the ability to load independent modules at runtime, each with its own config and lifecycle — without turning the codebase into a tightly coupled mess. Every time I reached for an existing solution, it was either too heavy, poorly documented, or made assumptions about my project structure that didn't hold up.

So I built Jonion.

---

## The idea

Good software has layers. Like an onion. Hence the name.

The core idea is simple: instead of hardwiring functionality into a monolithic application, you layer it in through plugins. Each plugin is an independent unit with its own configuration, its own lifecycle, and its own metadata. Jonion handles the orchestration — loading, dependency resolution, lifecycle management, configuration — so you can focus on what the plugins actually do.

Jonion adapts to your project, not the other way around. Your lifecycle, your file formats, your structure. The framework gets out of the way and lets you build.

---

## What it ships with

- **Plugin-based architecture** — compose applications from independent, loadable plugins rather than baking everything into a monolith.
- **Full lifecycle control** — plugins aren't limited to just enable/disable. You can define custom lifecycle states that match how your application actually works.
- **Automatic dependency resolution** — plugins can declare dependencies on other plugins, including conflict detection. Jonion figures out the load order for you.
- **Per-module configuration** — every plugin gets its own config, loaded and managed automatically.
- **Multi-format support** — YAML and XML out of the box, with adapters for any other format you need.
- **A custom plugin manager** — load, unload, start, and stop individual plugins at runtime without restarting your application.
- **Descriptor system** — built-in support for plugin metadata with custom descriptor templates.
- **Minimal footprint** — no heavy runtime. Just a small core and your plugins.

---

## Getting started

Add Jonion to your API module's `pom.xml`:

```xml
<dependency>
    <groupId>dev.siea.jonion</groupId>
    <artifactId>Jonion</artifactId>
    <version>${jonionversion}</version>
</dependency>
```

Replace `${jonionversion}` with the latest version from [Maven Central](https://central.sonatype.com/artifact/dev.siea.jonion/Jonion).

---

## Creating your first plugin

A Jonion plugin is two things: a descriptor file and a class.

### 1. The descriptor

Create `src/main/resources/plugin.yml` in your plugin project:

```yaml
name: my-plugin
version: 1.0.0
description: My first Jonion plugin
main: com.example.plugins.MyPlugin
authors:
  - YourName
```

This tells Jonion what your plugin is, where its entry point is, and what it depends on.

### 2. The plugin class

Extend your base plugin class and implement the lifecycle hooks:

```java
package com.example.plugins;

import com.example.api.MyPlugin;
import dev.siea.jonion.configuration.PluginConfig;

public class MyPlugin extends MyPlugin {

    @Override
    public void start() {
        getLogger().info("MyPlugin started!");

        PluginConfig config = getDefaultConfig();
        String message = config.getString("message", "Hello from MyPlugin!");
        getLogger().info(message);
    }

    @Override
    public void stop() {
        getLogger().info("MyPlugin stopped!");
    }
}
```

That's it. Drop a descriptor file and extend the base class — Jonion handles the rest.

### 3. Build and load

```bash
mvn clean package
```

Copy the JAR from `target/` to your application's plugin directory (default: `plugins/`). Jonion picks it up, resolves dependencies, and runs the lifecycle.

---

## Recommended project structure

A multi-module Maven project with at least two modules works best:

- **App module** — your main application. Initializes Jonion and owns the runtime.
- **API module** — contains only the interfaces and utilities that plugins interact with.

This keeps a clean boundary between your internal application code and your plugin API, preventing plugins from touching things they shouldn't.

```
my-project/
├── pom.xml
├── api/
│   ├── src/
│   └── pom.xml      # Plugin interfaces live here
└── app/
    ├── src/
    └── pom.xml      # Application runtime lives here
```

---

## Why not just use an existing framework?

Honestly? Most of the existing plugin frameworks for Java are designed around a specific use case — usually game servers or IDE extensions — and drag a lot of that context with them. They impose opinions on your lifecycle, your config format, your directory structure. When your project doesn't match those assumptions, you end up fighting the framework instead of building your thing.

Jonion was built to be genuinely general purpose. It doesn't care what your application does. It just gives you a clean, composable way to structure it.

---

## What's next?

- [Installation](https://docs.siea.dev/jonion/introduction/installation) — full setup guide
- [Setting Up Your Plugin Manager](https://docs.siea.dev/jonion/creating-a-plugin-system/setting-up-a-plugin-manager) — initializing Jonion in your app
- [Creating a Plugin](https://docs.siea.dev/jonion/creating-a-plugin/plugin-introduction) — detailed walkthrough
- [Plugin Dependencies](https://docs.siea.dev/jonion/creating-a-plugin/plugin-dependencies) — declaring and resolving dependencies
- [Plugin Configurations](https://docs.siea.dev/jonion/creating-a-plugin/plugin-configurations) — per-module config
- [Plugin States](https://docs.siea.dev/jonion/advanced/plugin-states) — custom lifecycle states

---

Jonion is completely open source under the MIT license. Contributions, issues, and feedback are welcome on [GitHub](https://github.com/sieadev/Jonion).

## Links

- [Full documentation](https://docs.siea.dev/jonion/) — installation, plugin system setup, and more.
- [Creating a Plugin](https://docs.siea.dev/jonion/creating-a-plugin/plugin-introduction.html) — detailed guide.
- [GitHub](https://github.com/sieadev/Jonion) — source and issues.

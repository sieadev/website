If you've ever run a Spigot or Paper server, MoBot will feel immediately familiar. It's a Discord bot you download, run, and extend by dropping modules into a folder. No coding required to get started. No bot framework to wrap your head around. Just a bot that runs, and a clean system for adding functionality to it.

Think of it as Spigot, but for Discord.

---

## The idea

Most Discord bots are either too limited — a single-purpose tool that does one thing — or too complex to self-host and extend. The gap between "I want a bot" and "I have a bot that does exactly what I need" is usually a lot of custom code.

MoBot closes that gap. The bot itself is the runtime. Modules are the features. Want a welcome message system? Drop in a module. Want moderation commands? Drop in a module. Want to build something completely custom? Write your own module and drop that in too.

Each module is self-contained — its own commands, event listeners, and configuration — and the bot handles loading, dependency ordering, and lifecycle management automatically. You never have to touch the core.

---

## Getting started

Download the latest `MoBot.jar` from the [Releases page](https://github.com/Pixel-Services/MoBot/releases) and run it:

```bash
java -jar MoBot.jar
```

On first run MoBot will ask for your Discord bot token and scaffold the directory structure:

```
mobot/
├── MoBot.jar
├── bot.yml
└── modules/
```

That's it. Your bot is running. Now start adding modules.

---

## Adding modules

Modules are JAR files. Drop them into the `modules/` folder and restart the bot — MoBot loads them automatically, resolves dependencies between them, and runs each module's lifecycle in the right order.

Want to remove a feature? Delete the JAR and restart. No configuration to untangle. No code to comment out.

---

## Configuration

`bot.yml` is where you configure the bot itself:

- **Token** — your Discord bot token
- **Gateway intents** — add any intents your modules need (e.g. `GUILD_MEMBERS`, message content)
- **Check updates** — whether to check for updates on startup

Example:

```yaml
intents:
  - GUILD_MEMBERS
```

Each module also manages its own configuration separately, so there's no single sprawling config file to maintain.

---

## Building your own module

If you want functionality that doesn't exist yet, you can write your own module. The API is intentionally simple — extend a class, implement two methods, add a descriptor file, and you're done.

### 1. Add the dependency

```xml
<repository>
    <id>pixel-services-releases</id>
    <url>https://maven.pixel-services.com/releases</url>
</repository>

<dependency>
    <groupId>com.pixelservices.mobot</groupId>
    <artifactId>mobot-api</artifactId>
    <version>VERSION</version>
</dependency>
```

### 2. The module class

```java
public class MyModule extends MbModule {

    @Override
    public void onEnable() {
        getLogger().info("MyModule enabled!");
        // Register commands, event listeners, etc.
    }

    @Override
    public void onDisable() {
        getLogger().info("MyModule disabled!");
        // Cleanup
    }
}
```

### 3. The descriptor

Create `src/main/resources/module.yml`:

```yaml
name: MyModule
version: 1.0.0
description: My first MoBot module
main: com.example.MyModule
authors:
  - YourName
dependencies: []
```

| Field          | Required | Description                                  |
|----------------|----------|----------------------------------------------|
| `name`         | Yes      | Unique module name                           |
| `main`         | Yes      | Fully qualified class name of your module    |
| `version`      | No       | Module version                               |
| `description`  | No       | What the module does                         |
| `authors`      | No       | List of authors                              |
| `dependencies` | No       | Other modules this module depends on         |

### 4. Build and load

```bash
mvn clean package
```

Drop the JAR from `target/` into your `modules/` folder and restart MoBot. Done.

---

## The module API

Once inside a module, you have access to everything you need:

- **Commands** — register slash commands with argument handling built in. See [Creating a Command](/mobot/commands/creating-a-command).
- **Event listeners** — subscribe to any Discord event cleanly from within your module. See [Creating a Listener](/mobot/events/creating-a-listener).
- **Configuration** — every module gets its own config file, YAML out of the box. See [Configuration](/mobot/configuration/default-config).
- **Logging** — structured per-module logging, no setup required.

---

## What's next?

- [Installation](https://docs.siea.dev/mobot/introduction/installation) — full setup guide
- [Getting Started with Modules](https://docs.siea.dev/mobot/creating-a-module/modules-introduction) — building your first module
- [Module Lifecycle](https://docs.siea.dev/mobot/creating-a-module/module-lifecycle) — lifecycle hooks in depth
- [Creating a Command](https://docs.siea.dev/mobot/commands/creating-a-command) — slash commands and arguments
- [Creating a Listener](https://docs.siea.dev/mobot/events/creating-a-listener) — event handling

---

MoBot is open source. Contributions and feedback are welcome on [GitHub](https://github.com/sieadev/mobot). For questions and support, join the [Discord server](https://discord.gg/KTF3Wsk85G).

## Links

- [Full documentation](https://docs.siea.dev/mobot/) — installation, plugin system setup, and more.
- [GitHub](https://github.com/sieadev/mobot) — source and issues.
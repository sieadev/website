If you run a Ubiquiti UniFi network at home or in a small business, you already know the controller UI. It's fine. But the moment you want to do something programmatic with your network — pull device stats, monitor clients, automate anything — you're staring at an API with no decent Java client.

Unifi4J fixes that.

---

## The idea

Unifi4J is a clean, modern Java client for the UniFi Network API. It handles all the HTTP, JSON, authentication, and error mapping so you don't have to. You get a simple, expressive API that works however you want to work — block and wait for a result, fire off an async callback, or chain operations together reactively.

It uses the current UniFi Network integration API, not the old legacy Controller API that most community libraries are still built around.

---

## What it ships with

- **Reactive-style API** — every service method returns a `UnifiAction<T>`, giving you full control over how you consume results.
- **Blocking and async** — call `.complete()` to block, `.queue()` for callbacks, or `.thenApply()` / `.thenCompose()` to chain async work.
- **Typed exceptions** — API errors map to specific exception types so you can handle them precisely rather than catching generic HTTP errors.
- **SSL flexibility** — supports self-signed certificates for local and IP-based controllers, which is how most home setups actually work.
- **Automatic JSON handling** — serialization and deserialization are handled internally, so you work with real Java objects.

---

## Quick start

Add Unifi4J to your `pom.xml`:

```xml
<dependency>
    <groupId>dev.siea.unifi4j</groupId>
    <artifactId>unifi4j</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

Build the client with your API key and controller URL. The client verifies connectivity during `build()`, so you know immediately if something is wrong:

```java
Unifi4J unifi = Unifi4J.withApiKey("your-api-key")
        .withBaseUri("https://192.168.1.1/")
        .allowInsecureSsl(true)   // typical for local / IP-based controllers
        .build();
```

Then start making calls:

```java
// Blocking — wait for the result
NetworkInfo info = unifi.network().getInfo().complete();
System.out.println("Version: " + info.getApplicationVersion());

// Async — callback when done
unifi.network().getSites().queue(
    sites -> System.out.println("Sites: " + sites.getTotalCount()),
    err   -> System.err.println("Failed: " + err)
);
```

---

## The reactive API

All service methods return `UnifiAction<T>`, which wraps a `CompletableFuture<T>`. You choose how to consume it:

| Method | What it does |
|--------|-------------|
| `complete()` | Blocks until the result is available. Throws on failure. |
| `queue(success, failure)` | Runs a success or failure callback asynchronously. |
| `thenApply(fn)` | Transforms the result and returns a new `UnifiAction`. |
| `thenCompose(fn)` | Chains another async call using the result of the first. |
| `toFuture()` | Returns the underlying `CompletableFuture` for custom composition. |

### Chaining calls

This is where the reactive API earns its keep. Use the result of one call to drive the next, without nested callbacks:

```java
unifi.network().getSites()
        .thenCompose(sites -> {
            String siteId = sites.getData().get(0).getId().toString();
            return unifi.device().getDevices(siteId);
        })
        .queue(
            devices -> System.out.println("Devices: " + devices.getTotalCount()),
            Throwable::printStackTrace
        );
```

### Transforming results

```java
UnifiAction<Integer> count = unifi.network().getSites()
        .thenApply(sites -> sites.getTotalCount());

System.out.println("Total sites: " + count.complete());
```

---

## Services

### Network service

Access controller-level information and sites via `unifi.network()`:

```java
// Controller info
NetworkInfo info = unifi.network().getInfo().complete();

// All sites
SitesResponse sites = unifi.network().getSites().complete();

// Filtered and paginated
SitesQuery query = SitesQuery.builder()
        .offset(0)
        .limit(20)
        .filter(SiteFilterField.NAME, SiteFilterOperator.EQ, "Office")
        .build();
SitesResponse filtered = unifi.network().getSites(query).complete();
```

### Device service

Fetch devices for a given site via `unifi.device()`:

```java
DevicesResponse devices = unifi.device().getDevices(siteId).complete();
```

See the [Device Service](/unifi4j/services/device-service) docs for the full API.

---

## Error handling

Failures map to specific typed exceptions, all extending `UnifiException`:

| Exception | When it's thrown |
|-----------|-----------------|
| `AuthenticationException` | Invalid or missing API key (401/403) |
| `RateLimitException` | Too many requests (429) |
| `ApiException` | Other non-success API response |
| `NetworkException` | Transport or connection failure |

With `.complete()` they are thrown directly. With `.queue()` or `.toFuture()` they are passed to your failure handler:

```java
try {
    NetworkInfo info = unifi.network().getInfo().complete();
} catch (AuthenticationException e) {
    System.err.println("Check your API key.");
} catch (NetworkException e) {
    System.err.println("Can't reach the controller.");
} catch (UnifiException e) {
    System.err.println("Something went wrong: " + e.getMessage());
}
```

---

## Configuration reference

| Method | Description |
|--------|-------------|
| `withApiKey(String)` | Required. Your UniFi Network integration API key. |
| `withBaseUri(String)` | Base URL of your controller. Defaults to `https://192.168.1.1/`. |
| `allowInsecureSsl(boolean)` | Accept self-signed certificates. Essential for most local setups. |

---

## What's next?

- [Installation](https://docs.siea.dev/unifi4j/introduction/installation) — adding the dependency
- [Configuration](https://docs.siea.dev/unifi4j/introduction/configuration) — builder options in detail
- [Reactive API](https://docs.siea.dev/unifi4j/reactive-api) — blocking, callbacks, and chaining
- [Network Service](https://docs.siea.dev/unifi4j/services/network-service) — controller info and sites
- [Device Service](https://docs.siea.dev/unifi4j/services/device-service) — devices per site

---

Unifi4J is open source. Issues and contributions are welcome on [GitHub](https://github.com/sieadev/unifi4j).

## Links

- [Full documentation](https://docs.siea.dev/unifi4j/) — installation, plugin system setup, and more.
- [GitHub](https://github.com/sieadev/unifi4j) — source and issues.
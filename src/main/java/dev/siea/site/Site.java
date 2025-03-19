package dev.siea.site;

import com.pixelservices.config.YamlConfig;
import com.pixelservices.flash.components.FlashServer;
import com.pixelservices.flash.components.fileserver.DynamicFileServerConfiguration;
import com.pixelservices.flash.components.fileserver.SourceType;

public class Site {

    public Site() {
        YamlConfig config = new YamlConfig("config.yml");

        config.save();

        FlashServer server = new FlashServer(config.getInt("port"));

        server.enableCORS(
                "*",
                "GET, POST, PUT, DELETE, OPTIONS",
                "Authorization, Content-Type"
        );

        server.serveDynamic("/", new DynamicFileServerConfiguration(
                true,
                "frontend",
                "index.html",
                SourceType.RESOURCESTREAM
        ));

        server.start();
    }

    public static void main(String[] args) {
        new Site();
    }
}

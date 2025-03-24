package dev.siea.site.newsletter;

import org.simpleyaml.configuration.ConfigurationSection;

import java.util.Properties;

public class SmtpConfiguration {
    private final String from;
    private final String password;
    private final Properties props;

    public SmtpConfiguration(ConfigurationSection section) {
        this.from = section.getString("from");
        this.password = section.getString("password");

        this.props = new Properties();
        ConfigurationSection propsSection = section.getConfigurationSection("props");
        for (String key : propsSection.getKeys(false)) {
            props.setProperty(key, propsSection.getString(key));
        }
    }

    public String getFrom() {
        return from;
    }

    public String getPassword() {
        return password;
    }

    public Properties getProps() {
        return props;
    }
}

package dev.siea.site.newsletter;

import dev.siea.site.database.DatabaseWrapper;
import org.simpleyaml.configuration.ConfigurationSection;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class EmailScheduler {
    private final SmtpConfiguration smtpConfiguration;
    private final DatabaseWrapper databaseWrapper;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public EmailScheduler(DatabaseWrapper databaseWrapper, ConfigurationSection email) {
        smtpConfiguration = new SmtpConfiguration(email);
        this.databaseWrapper = databaseWrapper;
    }

    public void distributeNewsletter() {
        MailingList mailingList = databaseWrapper.getMailingList();
    }
}

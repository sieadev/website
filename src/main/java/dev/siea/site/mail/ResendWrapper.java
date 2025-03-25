package dev.siea.site.mail;

import com.pixelservices.logger.Logger;
import com.pixelservices.logger.LoggerFactory;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.simpleyaml.configuration.ConfigurationSection;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class ResendWrapper {
    private final Logger logger = LoggerFactory.getLogger(ResendWrapper.class);
    private final Resend resend;
    private final String defaultFrom;

    public ResendWrapper(ConfigurationSection config) {
        resend = new Resend(config.getString("resend_api_key"));
        defaultFrom = "noreply@mail.siea.dev";
    }

    public CompletableFuture<Void> sendEmail(String to, String subject, String text) {
        return sendEmail(defaultFrom, Collections.singletonList(to), subject, text);
    }

    public CompletableFuture<Void> sendEmail(String from, List<String> to, String subject, String text) {
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Sieadev <" + from + ">")
                .to(to)
                .subject(subject)
                .text(text)
                .build();
        return sendEmail(params);
    }

    public CompletableFuture<Void> sendEmail(CreateEmailOptions params) {
        return CompletableFuture.runAsync(() -> {

            try {
                CreateEmailResponse data = resend.emails().send(params);
                System.out.println(data.getId());
            } catch (ResendException e) {
                logger.error("Failed to send email", e);
            }
        });
    }
}

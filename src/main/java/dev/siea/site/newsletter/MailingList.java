package dev.siea.site.newsletter;

import dev.siea.site.database.model.Email;

import java.util.List;

public class MailingList {
    private List<Email> emails;

    public MailingList(List<Email> emails) {
        this.emails = emails;
    }

    public List<Email> getEmails() {
        return emails;
    }
}

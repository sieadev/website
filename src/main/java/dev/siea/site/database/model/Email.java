package dev.siea.site.database.model;

import java.time.LocalDateTime;

public class Email {
    private final String email;
    private final LocalDateTime signupDate;

    public Email(String email) {
        this.email = email;
        this.signupDate = LocalDateTime.now();
    }

    public Email(String email, LocalDateTime signupDate) {
        this.email = email;
        this.signupDate = signupDate;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getSignupDate() {
        return signupDate;
    }
}

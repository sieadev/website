package dev.siea.site.database.model;

public class NewsLetter {
    private final String subject;
    private final String text;
    private final String imageUrl;

    public NewsLetter(String subject, String text, String imageUrl) {
        this.subject = subject;
        this.text = text;
        this.imageUrl = imageUrl;
    }

    public String getSubject() {
        return subject;
    }

    public String getText() {
        return text;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}

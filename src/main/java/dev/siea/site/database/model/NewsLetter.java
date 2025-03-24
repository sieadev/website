package dev.siea.site.database.model;

public class NewsLetter {
    private final String title;
    private final String content;
    private final String imageUrl;

    public NewsLetter(String title, String content, String imageUrl) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}

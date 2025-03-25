package dev.siea.site.database;

import com.pixelservices.logger.Logger;
import com.pixelservices.logger.LoggerFactory;
import com.zaxxer.hikari.HikariConfig;
import dev.siea.site.database.model.Email;
import dev.siea.site.database.model.NewsLetter;
import org.simpleyaml.configuration.ConfigurationSection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class DatabaseWrapper {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DatabaseConnector connector;

    public DatabaseWrapper(ConfigurationSection section) {
        HikariConfig config = new HikariConfig();

        String type = section.getString("type");
        String database = section.getString("database");

        switch (type.toLowerCase()) {
            case "mysql":
                config.setJdbcUrl("jdbc:mysql://" + section.getString("host") + "/" + database);
                config.setUsername(section.getString("username"));
                config.setPassword(section.getString("password"));
                config.setDriverClassName("com.mysql.cj.jdbc.Driver");
                break;
            case "sqlite":
                config.setJdbcUrl("jdbc:sqlite:" + database);
                break;
            default:
                throw new IllegalArgumentException("Unsupported database type: " + type);
        }

        connector = new DatabaseConnector(config);

        logger.info("Database connection established");
    }

    public void registerEmail(Email email) {
        String query = "INSERT INTO mailing_list (email) VALUES (?)";

        try (Connection connection = connector.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, email.getEmail());
            statement.executeUpdate();
        } catch (SQLException e) {
            logger.error("Failed to add email to mailing list", e);
        }
    }

    public List<Email> getMailingList() {
        List<Email> emails = new ArrayList<>();

        String query = "SELECT email, signUpDate FROM mailing_list";

        try (Connection connection = connector.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                String emailAddress = resultSet.getString("email");
                java.sql.Timestamp signUpDate = resultSet.getTimestamp("signUpDate");

                Email email = new Email(emailAddress, signUpDate.toLocalDateTime());
                emails.add(email);
            }

        } catch (SQLException e) {
            logger.error("Failed to retrieve mailing list", e);
        }

        return emails;
    }

    public NewsLetter getTodayNewsLetter() {
        String query = "SELECT title, message, image_url FROM mails WHERE date_sent >= CURDATE()";

        try (Connection connection = connector.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            if (resultSet.next()) {
                String title = resultSet.getString("title");
                String message = resultSet.getString("message");
                String imageUrl = resultSet.getString("image_url");

                return new NewsLetter(title, message, imageUrl);
            }

        } catch (SQLException e) {
            logger.error("Failed to retrieve today's newsletter", e);
        }

        return null;
    }

    private void createTables() {
        try (Connection connection = connector.getConnection()) {
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS mailing_list (email VARCHAR(255) PRIMARY KEY, signUpDate Datetime DEFAULT CURRENT_TIMESTAMP)");
        } catch (SQLException e) {
            logger.error("Failed to create tables", e);
        }

        try (Connection connection = connector.getConnection()) {
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS mails (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY, date_sent DATETIME DEFAULT CURRENT_TIMESTAMP, title VARCHAR(255) NOT NULL, message TEXT NOT NULL, image_url VARCHAR(512))");
        } catch (SQLException e) {
            logger.error("Failed to create tables", e);
        }
    }
}
package dev.siea.site.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DatabaseConnector {
    private final HikariDataSource dataSource;

    DatabaseConnector (HikariConfig hikariConfig) {
        this.dataSource = new HikariDataSource(hikariConfig);
    }

    Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}

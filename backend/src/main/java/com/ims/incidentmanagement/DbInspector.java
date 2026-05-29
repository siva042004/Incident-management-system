package com.ims.incidentmanagement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class DbInspector {
    public static void main(String[] args) {
        String url = "jdbc:mysql://127.0.0.1:3306/incidentdb";
        String user = System.getenv().getOrDefault("DB_USERNAME", "root");
        String pass = System.getenv().getOrDefault("DB_PASSWORD", "");

        System.out.println("Connecting to: " + url);

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            Statement st = conn.createStatement();

            System.out.println("Listing tables in incidentdb:");
            ResultSet tables = st.executeQuery("SHOW TABLES");
            boolean hasIncident = false;
            while (tables.next()) {
                String tableName = tables.getString(1);
                System.out.println(" - " + tableName);
                if (tableName.equalsIgnoreCase("incidents")) {
                    hasIncident = true;
                }
            }

            if (!hasIncident) {
                System.out.println("No table named 'incidents' found; skipping SELECT.");
                return;
            }

            String query = "SELECT * FROM incidents LIMIT 50";
            System.out.println("Running: " + query);
            ResultSet rs = st.executeQuery(query);
            ResultSetMetaData md = rs.getMetaData();
            int cols = md.getColumnCount();

            StringBuilder header = new StringBuilder();
            for (int i = 1; i <= cols; i++) {
                if (i > 1) header.append('\t');
                header.append(md.getColumnLabel(i));
            }
            System.out.println(header.toString());

            while (rs.next()) {
                StringBuilder row = new StringBuilder();
                for (int i = 1; i <= cols; i++) {
                    if (i > 1) row.append('\t');
                    String value = rs.getString(i);
                    row.append(value == null ? "NULL" : value);
                }
                System.out.println(row.toString());
            }
        } catch (SQLException e) {
            System.err.println("DB access error: " + e.getMessage());
            e.printStackTrace();
            System.exit(2);
        }
    }
}

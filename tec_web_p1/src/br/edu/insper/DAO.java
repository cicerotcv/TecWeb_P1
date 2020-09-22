package br.edu.insper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class DAO {
	private Connection connection = null;

	public DAO() throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost/MyNotes", "root", "123123123");

	}

	public List<Note> getNotes() throws SQLException {
		PreparedStatement stmt = this.connection.prepareStatement("SELECT * FROM notes");
		ResultSet rs = stmt.executeQuery();

		List<Note> notes = new ArrayList<Note>();

		while (rs.next()) {
			Note note = new Note();
			note.setId(rs.getInt("id"));
			note.setTitle(rs.getString("title"));
			note.setTextContent(rs.getString("text"));
			note.setLastModified(rs.getTimestamp("lastModified"));

			notes.add(note);
		}

		rs.close();
		stmt.close();

		return notes;

	}

	public void createNotes(Note note) throws SQLException {
		String sql = "INSERT INTO Notes (title, text) VALUES (?, ?)";

		PreparedStatement stmt = this.connection.prepareStatement(sql);

		stmt.setString(1, note.getTitle());
		stmt.setString(2, note.getTextContent());

		stmt.execute();
		stmt.close();

	}

	public void updateNotes(Note note) throws SQLException {
		String sql = "UPDATE Notes SET title=?, text=?, lastModified=? WHERE id=?";

		PreparedStatement stmt = this.connection.prepareStatement(sql);

		stmt.setString(1, note.getTitle());
		stmt.setString(2, note.getTextContent());

		Timestamp now = new Timestamp(System.currentTimeMillis());

		stmt.setTimestamp(3, now);

		stmt.setInt(4, note.getId());

		stmt.execute();
		stmt.close();

	}

	public void deleteNotes(Note note) throws SQLException {
		String sql = "DELETE FROM Notes WHERE id=?;";

		PreparedStatement stmt = this.connection.prepareStatement(sql);

		stmt.setInt(1, note.getId());

		stmt.execute();
		stmt.close();
	}

	public void close() throws SQLException {
		this.connection.close();
	}
}

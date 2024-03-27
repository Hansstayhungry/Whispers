-- To storage links relations between user and parnter.

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  inviterId INTEGER REFERENCES users(id),
  inviteeId INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
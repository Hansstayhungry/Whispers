-- this script should be running once every time at maintainense hours, to clear clusters.
-- in development mode, we can run this script manually to clear the clusters at starting up of the project.

DROP TABLE IF EXISTS invitations CASCADE;
-- CREATE invitations
CREATE TABLE invitations (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  inviterId INTEGER REFERENCES users(id),
  inviteeId INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 2 mins - buffer 1 seconds to set it expired
  expired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + interval '119 seconds'
);
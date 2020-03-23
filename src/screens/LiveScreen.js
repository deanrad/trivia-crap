import React from 'react';
import { observer } from 'mobx-react-lite';

export const LiveScreen = observer(({ usernames, users }) => {
  return (
    <div>
      <h1>Live Game</h1>
      <h3>{usernames.length} users online</h3>

      <div>
        {usernames.map((user, idx) => (
          <span key={idx}>
            <User {...users[user]} />
          </span>
        ))}
      </div>
    </div>
  );
});

const UserSize = 20;
const User = ({ user, photo }) => (
  <img alt={user} src={photo} height={UserSize} className="user-icon" />
);

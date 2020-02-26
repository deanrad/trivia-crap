import React from 'react';
import { observer } from 'mobx-react-lite';

export const LiveScreen = observer(({ users }) => {
  return (
    <div>
      <h1>Live Game</h1>
      <h3>{users.length} users online</h3>

      <ul>
        {users.map(user => (
          <li key={user.user}>
            <User {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
});

const User = ({ user, photo }) => <span>{user}</span>;

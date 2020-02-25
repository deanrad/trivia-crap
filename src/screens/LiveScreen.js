import React from 'react';

export const LiveScreen = ({ users = [] }) => {
  return (
    <div>
      <h1>Live Game</h1>
      <h3>{`${users.length} users online`}</h3>
    </div>
  );
};

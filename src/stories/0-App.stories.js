import React from 'react';
import App from '../App';
import { player1CookieStates, player2CookieStates } from '../auth/fixtures';
import { agent, Agent } from 'polyrhythm';
import { AgentContext } from '../useLocalAgent';

export default {
  title: 'G2 Trivia'
};

const rootAgent = agent;
const player1Agent = new Agent({ agentId: 'P1' });
const player2Agent = new Agent({ agentId: 'P2' });

player1Agent.on(true, ({ type, payload }) => rootAgent.trigger(type, payload));
player2Agent.on(true, ({ type, payload }) => rootAgent.trigger(type, payload));

export const Hello = () => <App />;
export const Double = () => (
  <>
    <AgentContext.Provider value={player1Agent}>
      <App authStates={player1CookieStates} />
    </AgentContext.Provider>
    <AgentContext.Provider value={player2Agent}>
      <App authStates={player2CookieStates} />
    </AgentContext.Provider>
  </>
);

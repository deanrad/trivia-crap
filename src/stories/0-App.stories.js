import React from 'react';
import App from '../App';
import { player1CookieStates, player2CookieStates } from '../auth/fixtures';
import { agent, Agent } from 'polyrhythm';
import { AgentContext } from '../useChannel';

export default {
  title: 'Live Trivia (With Server)'
};

// Enables the Actions pane in storybook to show the sum of all agent's activities
const storybookAgent = agent;
const player1Agent = new Agent({ agentId: 'P1' });
const player2Agent = new Agent({ agentId: 'P2' });
const liveAgent = new Agent({ agentId: 'L1' });

player1Agent.on(true, ({ type, payload }) =>
  storybookAgent.trigger('P1:' + type, payload)
);
player2Agent.on(true, ({ type, payload }) =>
  storybookAgent.trigger('P2:' + type, payload)
);
liveAgent.on(true, ({ type, payload }) => {
  storybookAgent.trigger('L1:' + type, payload);
});

export const Hello = () => <App />;
export const MultiPlayer = () => (
  <>
    <AgentContext.Provider value={liveAgent}>
      <App route="/live" />
    </AgentContext.Provider>
    <AgentContext.Provider value={player1Agent}>
      <App authStates={player1CookieStates} />
    </AgentContext.Provider>
    <AgentContext.Provider value={player2Agent}>
      <App authStates={player2CookieStates} />
    </AgentContext.Provider>
  </>
);

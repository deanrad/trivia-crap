import { useEffect, useContext, createContext } from 'react';
import { agent as defaultChannel } from 'polyrhythm';

// Call this anywhere in the tree to ensure that useListener/on, and trigger
// are bound to this agent

// Import AgentContext and wrap YourComponent:
//
//  <AgentContext.Provider value={yourAgent}>
//    <YourComponent/>
//  </AgentContext.Provider>

// In YourComponent:
// const { trigger, on } = useChannel()
export const AgentContext = createContext(defaultChannel);

export const useChannel = () => {
  const agent = useContext(AgentContext) || defaultChannel;
  return {
    on: agent.on.bind(agent),
    spy: agent.spy.bind(agent),
    filter: agent.filter.bind(agent),
    trigger: agent.trigger.bind(agent),
    reset: agent.reset.bind(agent),
    agentId: agent.agentId
  };
};

export const useListener = (eventSpec, handler, options = {}) => {
  const { deps = [], ...config } = options;
  const agent = useContext(AgentContext) || defaultChannel;
  useEffect(() => {
    const subscription = agent.on(eventSpec, handler, config);

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, deps);
};

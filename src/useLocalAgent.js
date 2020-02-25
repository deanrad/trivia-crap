import { useEffect, useContext, createContext } from 'react';
import { agent as defaultAgent } from 'polyrhythm';

// Call this anywhere in the tree to ensure that useListener/on, and trigger
// are bound to this agent

// Import AgentContext and wrap in:
//  <AgentContext.Provider value={yourAgent}>
//    <YourComponent/>
//  </AgentContext.Provider>

// Where YourComponent calls useListener or {trigger} = useLocalAgent
export const AgentContext = createContext(defaultAgent);

export const useLocalAgent = () => {
  const agent = useContext(AgentContext) || defaultAgent;
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
  const agent = useContext(AgentContext) || defaultAgent;
  useEffect(() => {
    const subscription = agent.on(eventSpec, handler, config);

    return () => subscription.unsubscribe();
  }, deps);
};

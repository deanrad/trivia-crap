import { action } from '@storybook/addon-actions';
import { spy } from 'polyrhythm';

const actionEmitters = {};
spy(({ type, payload }) => {
  actionEmitters[type] = actionEmitters[type] || action(type);
  actionEmitters[type](payload);
});

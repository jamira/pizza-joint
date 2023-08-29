import '@testing-library/jest-dom'

import { render } from '@testing-library/react';

const portalContainer = document.createElement('div');
portalContainer.id = 'portal-root';
document.body.appendChild(portalContainer);

// Make the render function available globally
(global as any).render = render;

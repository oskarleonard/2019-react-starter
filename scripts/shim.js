global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.console.error = () => {};
global.console.warn = () => {};

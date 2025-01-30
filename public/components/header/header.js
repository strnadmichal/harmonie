import { initializeDropdownMenu } from '../js/dropdown-menu.js';

export function initializeHeader() {
  initializeDropdownMenu();
  return {
    initialized: true
  };
}
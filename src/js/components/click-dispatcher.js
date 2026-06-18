import {handleSelectItemClick} from './select-item.js';
import {handleTabsClick} from './tabs.js';
import {handleCollapseClick} from './collapse.js';
import {handleRemovableItem} from './account-actions.js';
import {handleFancyboxSwitch} from './fancybox.js';

const clickHandlers = [
	handleSelectItemClick,
	handleTabsClick,
	handleCollapseClick,
	handleRemovableItem,
	handleFancyboxSwitch,
];


document.addEventListener('click', (e) => {
	clickHandlers.forEach(handler => {
		handler(e)
	});
})

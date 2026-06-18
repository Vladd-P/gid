export function handleTabsClick(e) {
	if (e.target.closest('[data-tabs]')) {
		const $tab = e.target.closest('[data-tabs]');
		const isActive = $tab.classList.contains('active');
		const content = document.getElementById($tab.dataset.tabTarget);

		if (isActive) {
			$tab.classList.remove('active');
			if (content) content.classList.remove('active');
		} 
		
		else {
			const activeTab = document.querySelector(`.active[data-tabs=${$tab.dataset.tabs}]`);
			const activeContent = document.querySelector(`.active[data-tabs-content=${$tab.dataset.tabs}]`);

			if (activeTab) activeTab.classList.remove('active');
			if (activeContent) activeContent.classList.remove('active');

			$tab.classList.add('active');
			if (content) content.classList.add('active');
		}
	}
}
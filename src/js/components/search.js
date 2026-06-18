const $input = $('.page-header__search-body input[type="search"]');

if ($input.length) {
	$input.on('input', function () {
		const $search = $(this).closest('.page-header__search');
		const $toggle = $search.find('.dropdown-toggle');
		const $menu   = $search.find('.dropdown-menu');
		const $items  = $menu.find('.dropdown-item');

		const query = this.value.trim().toLowerCase();
		let hasMatch = false;

		$items.each(function () {
			const match = $(this).text().toLowerCase().includes(query);
			$(this).toggle(match);
			if (match) hasMatch = true;
		});

		if (query.length >= 2 && hasMatch) {
			$toggle.dropdown('show');
		} else {
			$toggle.dropdown('hide');
		}
	});
}
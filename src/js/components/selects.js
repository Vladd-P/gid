document.querySelectorAll('.select-styled').forEach(select => {
	new TomSelect(select, {
		sortField: {
			field: "text",
			direction: "asc"
		}
	});
});


document.querySelectorAll('.select-styled-addr').forEach(select => {
	new TomSelect(select, {
		sortField: {
			field: "text",
			direction: "asc"
		},
		render: {
			option(item, escape) {
				return `<div class="ts-option"> <div class="fw-500">${escape(item.name)}</div><small>${escape(item.addr)}</small></div>`
			},
			item(item, escape) {
				return `<div class="ts-item"><div class="fw-500">${escape(item.name)}</div><small>${escape(item.addr)}</small></div>`
			}
		}		
	});
});
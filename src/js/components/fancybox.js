if (document.querySelector("[data-fancybox-img]")) {
	Fancybox.bind("[data-fancybox-img]");	
}

if (document.querySelector("[data-fancybox]")) {
	Fancybox.bind("[data-fancybox]", {
		closeButton: false,
		groupAttr: false
	});	
}


export function handleFancyboxSwitch(e) {
	const link = e.target.closest("[data-fancybox-switch]");
	if (!link) return false;

	e.preventDefault();

	const target = link.getAttribute("href") || link.getAttribute("data-src");
	
	if (!target) return true;

	const instance = Fancybox.getInstance();

	if (instance) {
		const newItems = [{ src: target, type: "inline" }];

		instance.close(); 

		setTimeout(() => {
			Fancybox.show(newItems, {
				closeButton: false,
				groupAttr: false
			});
		}, 300); 
	} 
	
	else {
		Fancybox.show([{ src: target, type: "inline" }], {
			closeButton: false,
			groupAttr: false
		});
	}
}
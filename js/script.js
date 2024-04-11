window.addEventListener("load", () => {
	document.getElementById("goTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

	document.body.addEventListener("click", (e) => {
		if (!e.target.classList.contains("control-burger")) {
			hideBurgerMenu();
		}
	});

	function hideBurgerMenu() {
		const e = document.getElementById("burgerMenuInput");
		if (e.checked) {
			e.checked = false;
		}
	}

	document
		.getElementById("scrollHome")
		.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

	const headerOffset = 80;

	document.getElementById("scrollBiographie").addEventListener("click", () => {
		const t =
			window.screen.width < 769
				? document.getElementById("biographie").offsetTop - headerOffset
				: document.getElementById("biographie").offsetTop;
		window.scrollTo({
			top: t,
			behavior: "smooth",
		});
	});

	document.getElementById("scrollDates").addEventListener("click", () => {
		const t =
			window.screen.width < 769
				? document.getElementById("dates").offsetTop - headerOffset
				: document.getElementById("dates").offsetTop;
		window.scrollTo({
			top: t,
			behavior: "smooth",
		});
	});

	document.getElementById("scrollGroup").addEventListener("click", () => {
		const t =
			window.screen.width < 769
				? document.getElementById("group").offsetTop - headerOffset
				: document.getElementById("group").offsetTop;
		window.scrollTo({
			top: t,
			behavior: "smooth",
		});
	});

	document.getElementById("scrollContact").addEventListener("click", () => {
        const t =
			window.screen.width < 769
				? document.getElementById("contact").offsetTop - headerOffset
				: document.getElementById("contact").offsetTop;
		window.scrollTo({
			top: t,
			behavior: "smooth",
		});
	});
});

const scrollToTop = document.getElementById("goTop");

window.addEventListener("scroll", () => {
	if (this.scrollY > 750 && scrollToTop.classList.contains("hidden")) {
		scrollToTop.classList.add("display");
		scrollToTop.classList.remove("hidden");
	} else if (this.scrollY < 750 && scrollToTop.classList.contains("display")) {
		scrollToTop.classList.add("hidden");
		scrollToTop.classList.remove("display");
	}
});

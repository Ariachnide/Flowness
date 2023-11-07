window.addEventListener("load", () => {
	const pressPath = "./ressources/press/";
    const illustrationPath = "./ressources/illustration/";

	fetch("./js/pressItems.json")
		.then((res) => res.json())
		.then((json) => {
			const carId = "pressCarousel";
			const indicatorList = document.getElementById(
				"pressCarouselIndicatorList",
			);
			const slideList = document.getElementById("pressCarouselSlideList");
			json.items.forEach((data, i) => {
				const indic = document.createElement("li");
				indic.dataset.target = "#" + carId;
				indic.dataset.slideTo = i;
				indicatorList.appendChild(indic);

				const slideItem = document.createElement("div");
				slideItem.classList.add("carousel-item");
				slideList.appendChild(slideItem);

				const slideImg = document.createElement("img");
				slideImg.classList.add("d-block", "w-100");
				slideImg.src = pressPath + data.src;
				slideImg.alt = data.alt;
				slideItem.appendChild(slideImg);

				if (i === 0) {
					indic.classList.add("active");
					slideItem.classList.add("active");
				}
			});
		});

	fetch("./js/illustrationItems.json")
		.then((res) => res.json())
		.then((json) => {
			const carId = "illustrationCarousel";
			const indicatorList = document.getElementById(
				"illustrationCarouselIndicatorList",
			);
			const slideList = document.getElementById("illustrationCarouselSlideList");
			json.items.forEach((data, i) => {
				const indic = document.createElement("li");
				indic.dataset.target = "#" + carId;
				indic.dataset.slideTo = i;
				indicatorList.appendChild(indic);

				const slideItem = document.createElement("div");
				slideItem.classList.add("carousel-item");
				slideList.appendChild(slideItem);

				const slideImg = document.createElement("img");
				slideImg.classList.add("d-block", "w-100");
				slideImg.src = illustrationPath + data.src;
				slideImg.alt = data.alt;
				slideItem.appendChild(slideImg);

				if (i === 0) {
					indic.classList.add("active");
					slideItem.classList.add("active");
				}
			});
		});
});

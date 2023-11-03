window.addEventListener("load", () => {
	const pressPath = "./ressources/press/";
	let pressCarState = 0;

	fetch("./js/pressItems.json")
		.then((res) => res.json())
		.then((json) => {
			const activatorList = document.getElementById(
				"pressCarouselActivatorList",
			);
			const slideList = document.getElementById("pressCarouselSlideList");
			const indicatorList = document.getElementById(
				"pressCarouselIndicatorList",
			);
			json.items.forEach((data, i, fullData) => {
				const elementId = `press${i}`;
				const activatorElement = document.createElement("input");
				activatorElement.classList.add("carousel__activator");
				activatorElement.type = "radio";
				activatorElement.name = "pressCarousel";
				activatorElement.id = elementId;
				activatorList.appendChild(activatorElement);

				const slideElement = document.createElement("img");
				slideElement.classList.add(
					"carouselPicture",
					"carousel__slide",
				);
				slideElement.src = pressPath + data.src;
				slideElement.alt = data.alt;
				slideElement.id = `slide-${elementId}`;
				slideElement.style.transform = `translateX(${i * 100}%)`;
				slideList.appendChild(slideElement);

				const indicatorElement = document.createElement("label");
				indicatorElement.classList.add("carousel__indicator");
				indicatorElement.id = `indic-${elementId}`;
				indicatorElement.setAttribute("for", elementId);
				indicatorList.appendChild(indicatorElement);

				if (i === 0) {
					slideElement.classList.add("selectedSlide");
					indicatorElement.classList.add("selectedIndicator");
					activatorElement.checked = true;
				}

				activatorElement.addEventListener("click", (e) =>
					fullData.forEach((fxData) =>
						updatePressCarousel(e.target.id, fxData.id),
					),
				);
			});

			function updatePressCarousel(targetId, indexId) {
				const id = `press${indexId}`;
				if (id !== targetId) {
					document
						.getElementById(`slide-${id}`)
						.classList.remove("selectedSlide");
					document
						.getElementById(`indic-${id}`)
						.classList.remove("selectedIndicator");
				} else {
					pressCarState = indexId;
					document.getElementById(
						`pressCarouselSlideList`,
					).style.transform = `translateX(-${indexId * 100}%)`;
					document
						.getElementById(`slide-${id}`)
						.classList.add("selectedSlide");
					document
						.getElementById(`indic-${id}`)
						.classList.add("selectedIndicator");
				}
			}

			document
				.getElementById("pressCtrlBackward")
				.addEventListener("click", () => {
					const targetId =
						pressCarState === 0
							? json.items[json.items.length - 1].id
							: json.items[pressCarState - 1].id;
					const prevState = pressCarState;
					updatePressCarousel(`press${targetId}`, targetId);
					updatePressCarousel(`press${targetId}`, prevState);
				});
			document
				.getElementById("pressCtrlForward")
				.addEventListener("click", () => {
					const targetId =
						pressCarState === json.items.length - 1
							? json.items[0].id
							: json.items[pressCarState + 1].id;
					const prevState = pressCarState;
					updatePressCarousel(`press${targetId}`, targetId);
					updatePressCarousel(`press${targetId}`, prevState);
				});
		});
});

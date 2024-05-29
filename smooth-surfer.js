var smoothSurfer = {
	isMobileView: function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},
	settings: {
		indications: {
			fontSettings: {
				fontSize: 20
			}
		}
	},
	colors: {
		green: '#32a852',
		purple: '#b727e3',
		blue: '#1451ED',
		red: '#ed1826',
		orange: "#f07229",
		yellow: "#f0c829",
		pink: "#f55fe3",
		brown: "#7d3f1b",
		black: "#000",
		white: "#fff"
	},
	icons: {
		default: "hand-index-thumb",
		link: "arrow-up-left",
		close: "x-lg",
		arrows: {
			left: "arrow-left",
			right: "arrow-right",
			up: "arrow-up",
			down: "arrow-down"
		},
		socials: {
			twitter: "twitter",
			x: "twitter-x",
			instagram: "instagram",
			threads: "threads",
			discord: "discord",
			youtube: "youtube",
			spotify: "spotify",
			apple: "apple",
			twitch: "twitch",
			github: "github",
			facebook: "facebook",
			messenger: "messenger",
			whatsapp: "whatsapp",
			meta: "meta",
			linkedin: "linkedin",
		}
	},
	indication: function(surfer, data) {
		console.log(data);

		const instance = surfer.instance;

		//Editables
		const icon = (data.icon === "none") ? "" : (data.icon || smoothSurfer.icons.default);
		const iconSize   = (data.iconSize == 0) ? 0 : data.iconSize || 20;
		const size       = (data.size == 0) ? 0 : data.size || 10;

		const iconColor = data.iconColor || "#fff";
		const color     = data.color || "#000";

		//Events
		const enter = data.enter || null;
		const leave = data.leave || null;

		const click = data.click || null;

		document.querySelectorAll(data.interactibles).forEach(interactible => {
			if (click != null) {
				interactible.addEventListener('click', () => {
					data.click();
				})
			}

			interactible.addEventListener('mouseenter', () => {
				if (enter != null) {
					data.enter();
				}

				//Changes
				instance.querySelector('.status-icon sl-icon').setAttribute('name',icon);
				status_icon = instance.querySelector('.status-icon').style;
				status_icon.color = iconColor;

				instance.style.backgroundColor = color;
				document.documentElement.style.setProperty('--smooth-surfer-font-size', `${iconSize}px`);
				document.documentElement.style.setProperty('--smooth-surfer-size', `${size}px`);

				instance.querySelector('.status-icon sl-icon').classList.add('is-indicating');
			});

			interactible.addEventListener('mouseleave', () => {
				if (data.leave != null) {
					data.leave();
				}

				instance.querySelector('.status-icon sl-icon').setAttribute('name', smoothSurfer.icons.default);

				instance.style.backgroundColor = surfer.color;
				document.documentElement.style.setProperty('--smooth-surfer-font-size', '20px');
				document.documentElement.style.setProperty('--smooth-surfer-size', '10px');

				instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
			});
		});
	},
	forceQuitIndication: function(instance) {
		instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
	},
	instantiate: function(data = {}) {

		function normalizedSpeed(speed, minSpeed = 1, maxSpeed = 100) {
            return (speed - minSpeed) / (maxSpeed - minSpeed);
        }

        function lerp(start, end, time) {
			return start + (end - start) * time;
		}

		//Cursor properties
		color = data.color      || "#000";
		size  = (data.size * 5) || 5;
		speed = data.speed      || normalizedSpeed(17);

		disableOnScroll = data.disableOnScroll || false;

		document.documentElement.style.setProperty('--init-surfer-size', `${size}px`);

		document.documentElement.style.setProperty('--smooth-surfer-size', '10px');
		document.documentElement.style.setProperty('--smooth-surfer-font-size', '20px');

		//On callback, create "SmoothSurferCursorPosition" item value to mosue position
		//If it doesn't already exist
		if (localStorage.getItem("smoothSurferCursorPosition") == null) {
			mouse = {
				x: innerWidth / 2,
				y: innerWidth / 2
			}
		} else {
			mouse = JSON.parse(localStorage.getItem("smoothSurferCursorPosition"));
		}

		localStorage.setItem("smoothSurferCursorPosition", JSON.stringify(mouse));

		target = {
			x: 0,
			y: 0
		}

		document.body.innerHTML += `
		<div class='ss-custom-cursor'>
			<div class='status-icon'>
				<sl-icon name='${smoothSurfer.icons.default}'></sl-icon>
			</div>
		</div>
		`;

		// Instantiate custom styles to HEADER
		var styles = document.createElement('style');
		styles.innerHTML = `
		*, a, img, div, p, h1, h2, h3, h4, h5, h6, section, header, footer, aside, details, input {
			cursor: none;
		}

		a, button, input, select, textarea {
			cursor: none; /* Restore default cursor for interactive elements */
		}

		sl-input::part(base),
		sl-textarea::part(base),
		sl-select::part(base),
		sl-checkbox::part(base),
		sl-drawer::part(base),
		sl-drawer::part(close-button__base),
		sl-radio::part(base),
		sl-switch::part(base),
		sl-range::part(base),
		sl-copy-button::part(button),
		sl-date-picker::part(base),
		sl-time-picker::part(base),
		sl-color-picker::part(base),
		sl-input-group::part(base) { cursor: none; }

		.is-indicating {
			font-size: var(--smooth-surfer-font-size);
			padding: var(--smooth-surfer-size);
		}

		.ss-custom-cursor {
			background: ${color};
			display: none;
			justify-content: center;
			align-items: center;
			padding: var(--init-surfer-size);
			border-radius: 100%;
			box-shadow: 0px 0px 15px 0px rgba(255,255,255,0.3);
			position: absolute;
			z-index: 100000000000000;
			pointer-events: none; /* Ensure the custom cursor does not block interactions */
		}

		.ss-custom-cursor .status-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 0px;
			color: #fff;
		}

		.ss-custom-cursor .status-icon sl-icon {
			transition: all 250ms ease-in-out;
		}
		`;

		document.head.appendChild(styles);

		document.body.addEventListener('mousemove', (event) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;

			localStorage.setItem("smoothSurferCursorPosition", JSON.stringify(mouse));
		});

		instance  = document.querySelector('.ss-custom-cursor');

		data = {
			color: color,
			size: size,
			speed: speed,
			disableOnScroll: disableOnScroll,
			instance: instance
		}

		if (disableOnScroll) {
			document.addEventListener('scroll',() => {
				instance.style.display = 'none';
			});

			document.addEventListener('scrollend',() => {
				instance.style.display = 'flex';
			});
		}

		let isScrolling;
		let hasScrolled = false

		document.addEventListener('scroll',() => {
			if (!hasScrolled) {
                hasScrolled = true;
                instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
                console.log('Remove indication!');
            }

            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(() => {
                hasScrolled = false;
                console.log('Cooled down!');
            }, 100); // Adjust the timeout as needed
		});

		// Hide cursor if not in body
		document.body.addEventListener('mouseenter', () => {
			instance.style.display = 'flex';
		});

		document.body.addEventListener('mouseleave', () => {
		    // Remove the 'is-indicating' class when the mouse leaves the body
		    instance.style.backgroundColor = color;
		    instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
		});

		function update_cursor_position() {
			localStorage.setItem("smoothSurferCursorPosition", JSON.stringify(mouse));

			// Offset the position to center the cursor
			const cursorWidth  = instance.offsetWidth;
			const cursorHeight = instance.offsetHeight;

			const scrollX = window.scrollX || window.pageXOffset;
    		const scrollY = window.scrollY || window.pageYOffset;

    		const mouseX = mouse.x + scrollX;
    		const mouseY = mouse.y + scrollY;

    		target.x = lerp(target.x, mouseX, speed);
			target.y = lerp(target.y, mouseY, speed);

			instance.style.top  = `${target.y - cursorHeight / 2}px`;
			instance.style.left = `${target.x - cursorWidth / 2}px`;

			requestAnimationFrame(update_cursor_position);
		}

		// Hover effect
		document.querySelectorAll('[pointer-indicator]').forEach(trigger => {
			trigger.addEventListener('mouseenter', () => {
				instance.querySelector('.status-icon sl-icon').setAttribute('name',smoothSurfer.icons.default);
				instance.querySelector('.status-icon sl-icon').classList.add('is-indicating');
			});

			trigger.addEventListener('mouseleave', () => {
				instance.style.backgroundColor = color;
				instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
			});
		});

		update_cursor_position();

		return data;
	}
};

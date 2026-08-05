type DeviceType = "mobile" | "tablet" | "desktop" | "large-monitor" | "tv"

export function WhichDeviceType(): DeviceType {
	return window.matchMedia("(max-width: 767px)").matches
		? "mobile"
		: window.matchMedia("(max-width: 1023px)").matches
			? "tablet"
			: window.matchMedia("(max-width: 1535px)").matches
				? "desktop"
				: window.matchMedia("(max-width: 2550px)").matches
					? "large-monitor"
					: "tv"
}

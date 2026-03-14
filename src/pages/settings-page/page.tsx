import { useState } from "react"
import { AlbumBlock, SettingsBlock } from "../../widgets/settings"

export function SettingsPage() {
	const [pageSelector, setPageSelector] = useState<"settings" | "album">(
		"settings",
	)

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "2% 10%",
				alignItems: "flex-start",
				flexDirection: "row",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "center",
					flexDirection: "column",
					// width: "260px",
					gap: "10px",
				}}
			>
				<button
					style={{
						border: "none",
						background: "none",
						fontSize: "16",
						fontFamily: "GT Walsheim Pro",
						fontWeight: pageSelector === "settings" ? "800" : "600",
						color:
							pageSelector === "settings" ? "#070A1C" : "#81818D",
						cursor: "pointer",
					}}
					onClick={() => {setPageSelector("settings")}}
				>
					Особиста інформація
				</button>
				<div
					style={{
						width: "100%",
						height: "2px",
						background: "#543C52",
					}}
				></div>
				<button
					style={{
						border: "none",
						background: "none",
						fontSize: "16",
						fontFamily: "GT Walsheim Pro",
						fontWeight: pageSelector === "album" ? "800" : "600",
						color: pageSelector === "album" ? "#070A1C" : "#81818D",
						cursor: "pointer",
					}}
					onClick={() => {setPageSelector("album")}}
				>
					Альбоми
				</button>
			</div>
			{pageSelector === "settings" && <SettingsBlock />}
			{pageSelector === "album" && <AlbumBlock />}
		</div>
	)
}

import { Input } from "../../shared/ui/input"
import { AuthFormBlock, AuthUserHeader } from "../../widgets/user"

export function AuthPage() {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "start",
				backgroundColor: "#E9E5EE",
				// paddingTop: "2%",
				overflowY: "hidden",
				gap: "40px",
			}}
		>
			<AuthUserHeader />
			{/* <div style={{
        width: "100%",
        position: "absolute",
        top: 0,
      }}>
      </div> */}

			<AuthFormBlock />
		</div>
	)
}

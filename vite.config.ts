import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	build: {
		outDir: "dist",
		assetsDir: "assets",
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					router: ["react-router-dom"],
					ui: ["@radix-ui/react-avatar", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-icons", "@radix-ui/react-label", "@radix-ui/react-scroll-area", "@radix-ui/react-select", "@radix-ui/react-slider", "@radix-ui/react-slot", "@radix-ui/react-tabs"],
				},
			},
		},
	},
	preview: {
		port: 4173,
		host: true,
	},
});

import { definePlugin } from "@expressive-code/core";

export function pluginLanguageBadge() {
	return definePlugin({
		name: "LanguageBadge",
		baseStyles: () => `
			.ec-line .ec-token:first-child {
				/* Add language badge styles here if needed */
			}
		`,
	});
}
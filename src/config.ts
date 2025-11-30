import type { ExpressiveCodeConfig, LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig, OrganizationsConfig, EducationConfig } from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Fox's Den",
	subtitle: "OvO",
	lang: "en",
	themeColor: {
		hue: 85,
		fixed: false,
	},
	banner: {
		enable: true,
		src: "assets/images/banner.webp",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
	// GitHub username for progress page
	githubUsername: "svecco",
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Progress,
		LinkPreset.About,
		{
			name: "Apache",
			url: "https://apache.org/",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp",
	name: "Svecco",
	bio: "Life can be such a mess sometimes.",
	links: [
		{
			name: "Email",
			icon: "material-symbols:mail-rounded",
			url: "mailto:Vansittart@proton.me",
		},
        {
            name: "Discord",
            icon: "fa6-brands:discord",
            url: "https://discordapp.com/users/svecco",
        },
        {
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Svecco",
		},
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/246563710",
		},
	],
};

export const organizationsConfig: OrganizationsConfig = {
	organizations: [
		{ name: "NixOS", url: "https://nixos.org/community/", logo: "/assets/images/nixos_logo.png", description: "Community", admitted: true },
		{ name: "Gentoo", url: "https://www.gentoo.org/", logo: "/assets/images/gentoo_logo.png", description: "Community", admitted: true },
        { name: "A.S.F.", url: "https://apache.org", logo: "/assets/images/apache_logo.png", description: "Unlock", admitted: false },
        { name: "Openatom", url: "https://www.openatom.org/", logo: "/assets/images/openatom_logo.png", description: "Unlock", admitted: false },
	],
};

export const educationConfig: EducationConfig = {
	educationList: [
		{
			institution: "Zhejiang Lishui H.S.",
			url: "https://www.lishui.gov.cn/",
			logo: "/assets/images/zlh.svg",
			duration: "2024-2027 Sci. Stream",
			admitted: true
		},
		{
			institution: "Zhejiang University",
			url: "https://www.zju.edu.cn/",
			logo: "/assets/images/zju.svg",
			duration: "2027-2031 Stay Tuned",
			admitted: false
		}
	]
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
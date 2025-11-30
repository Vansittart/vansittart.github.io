<script lang="ts">
import { onMount } from "svelte";

import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

export let githubUsername: string;

interface GitHubIssue {
	number: number;
	title: string;
	state: string;
	created_at: string;
	updated_at: string;
	html_url: string;
	repository_url: string;
	user: {
		login: string;
	};
	pull_request?: object;
}

interface Group {
	name: string;
	items: GitHubIssue[];
	loading: boolean;
}

// Cache key for localStorage
const CACHE_KEY = `github_progress_${githubUsername}`;
// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

let groups: Group[] = [
	{ name: "PRs", items: [], loading: true },
	{ name: "Issues", items: [], loading: true }
];

let error: string | null = null;

function formatDate(dateString: string) {
	const date = new Date(dateString);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function getRepoNameFromUrl(url: string): string {
	// Extract repository name from URL like: https://api.github.com/repos/owner/repo
	const parts = url.split("/");
	return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
}

// Load data from cache if available and not expired
function loadFromCache(): boolean {
	try {
		const cachedData = localStorage.getItem(CACHE_KEY);
		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);
			const now = new Date().getTime();
			
			// Check if cache is still valid
			if (now - timestamp < CACHE_EXPIRATION) {
				groups = data;
				return true;
			}
		}
	} catch (e) {
		console.error("Error loading from cache:", e);
	}
	return false;
}

// Save data to cache
function saveToCache(data: Group[]) {
	try {
		const cacheData = {
			data: data,
			timestamp: new Date().getTime()
		};
		localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
	} catch (e) {
		console.error("Error saving to cache:", e);
	}
}

onMount(async () => {
	// Try to load from cache first
	if (loadFromCache()) {
		// Update loading states to false since we have cached data
		groups = groups.map(group => ({ ...group, loading: false }));
		return;
	}
	
	try {
		// Fetch open issues and pull requests from GitHub
		const response = await fetch(
			`https://api.github.com/search/issues?q=author:${githubUsername}+state:open&sort=created&order=desc`
		);
		
		if (!response.ok) {
			throw new Error(`GitHub API request failed with status ${response.status}`);
		}
		
		const data = await response.json();
		
		// Separate pull requests and issues
		const pullRequests: GitHubIssue[] = [];
		const issues: GitHubIssue[] = [];
		
		data.items.forEach((item: GitHubIssue) => {
			if (item.pull_request) {
				pullRequests.push(item);
			} else {
				issues.push(item);
			}
		});
		
		const updatedGroups = [
			{ name: "PRs", items: pullRequests, loading: false },
			{ name: "Issues", items: issues, loading: false }
		];
		
		groups = updatedGroups;
		
		// Save to cache
		saveToCache(updatedGroups);
	} catch (err) {
		console.error("Error fetching GitHub data:", err);
		error = "Failed to load GitHub data. Please try again later.";
		// Mark loading as complete even on error
		groups = [
			{ name: "PRs", items: [], loading: false },
			{ name: "Issues", items: [], loading: false }
		];
	}
});
</script>

{#if error}
	<div class="card-base px-8 py-6">
		<div class="text-center py-8 text-red-500">{error}</div>
	</div>
{:else}
	<div class="card-base px-8 py-6">
		{#each groups as group}
				<div>
					<div class="flex flex-row w-full items-center h-[3.75rem]">
						<div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
							{group.name}
						</div>
						<div class="w-[15%] md:w-[10%]">
							<div
								class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto
									-outline-offset-[2px] z-50 outline-3"
							></div>
						</div>
						<div class="w-[70%] md:w-[80%] transition text-left text-50">
							{group.items.length} open
						</div>
					</div>

					{#if group.loading}
						<div class="h-10 flex items-center justify-start pl-[30%] md:pl-[20%] text-50 italic">
							Loading...
						</div>
					{:else if group.items.length > 0}
						{#each group.items as item}
							<a
								href={item.html_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={item.title}
								class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
							>
								<div class="flex flex-row justify-start items-center h-full">
									<!-- date -->
									<div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
										{formatDate(item.created_at)}
									</div>

									<!-- dot and line -->
									<div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
										<div
											class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
												bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
												outline outline-4 z-50
												outline-[var(--card-bg)]
												group-hover:outline-[var(--btn-plain-bg-hover)]
												group-active:outline-[var(--btn-plain-bg-active)]"
										></div>
									</div>

									<!-- item title -->
									<div
										class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
											group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
											text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
									>
										{item.title}
									</div>

									<!-- repo name -->
									<div
										class="hidden md:block md:w-[15%] text-left text-sm transition
											whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
									>
										{getRepoNameFromUrl(item.repository_url)}
									</div>
								</div>
							</a>
						{/each}
					{:else}
						<div class="h-10 flex items-center justify-start pl-[30%] md:pl-[20%] text-50 italic">
							None
						</div>
					{/if}
				</div>
		{/each}
	</div>
{/if}
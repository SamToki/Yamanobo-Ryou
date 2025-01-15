// For SamToki.github.io/Yamanobo-Ryou
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CacheName = "Yamanobo-Ryou_v2.05";

// Listeners
	// Service worker (https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/#step-5---add-a-service-worker)
	self.addEventListener("install", Event => {
		Event.waitUntil((async() => {
			const CacheContent = await caches.open(CacheName);
			CacheContent.addAll([
				"index.html",
				"images/Icon.png",
				"../styles/common.css",
				"../styles/common_Dark.css",
				"../styles/common_Genshin.css",
				"../styles/common_HighContrast.css",
				"styles/style.css",
				"styles/style_Dark.css",
				"styles/style_Genshin.css",
				"styles/style_HighContrast.css",
				"../scripts/common.js",
				"../scripts/common_UserDataRepairer.js",
				"scripts/script.js",
				"manifests/manifest.json",
				"images/Icon_Large.png",
				"images/Icon_Maskable.png",
				"images/Preview.jpg",
				"../cursors/BTRAhoge.cur",
				"../cursors/Genshin.cur",
				"../cursors/GenshinFurina.cur",
				"../cursors/GenshinNahida.cur",
				"images/Background.jpg",
				"images/YamadaRyou.png",
				"images/GotouHitori.png",
				"docs/山田凉上山 快速入门.pdf",
				"docs/山田凉上山 说明文档.pdf"
			]);
		})());
	});
	self.addEventListener("fetch", Event => {
		Event.respondWith((async() => {
			const CacheContent = await caches.open(CacheName);
			const CachedResponse = await CacheContent.match(Event.request);
			if(CachedResponse) {
				return CachedResponse;
			} else {
				const FetchResponse = await fetch(Event.request);
				CacheContent.put(Event.request, FetchResponse.clone());
				return FetchResponse;
			}
		})());
	});

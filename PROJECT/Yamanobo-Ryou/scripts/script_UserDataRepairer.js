// For SamToki.github.io/Yamanobo-Ryou
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

	// Repair user data: Solves incompatibility after version updates. A repairer may get removed if older than 24 months.
	function RepairUserData() {
		// System
			// v9.00 (2025/12/14)
			// Rename value (Mouse cursor)
			if(localStorage.System != undefined) {
				let System = JSON.parse(localStorage.getItem("System"));
				if(System.Display.Cursor == "Default") {
					System.Display.Cursor = "None";
					localStorage.setItem("System", JSON.stringify(System));
				}
			}

			// v10.00 (2026/02/08)
			// New feature (Fieldset collapsing)
			if(localStorage.System != undefined) {
				let System = JSON.parse(localStorage.getItem("System"));
				if(System.CollapsedFieldset == undefined) {
					System.CollapsedFieldset = [0];
					localStorage.setItem("System", JSON.stringify(System));
				}
			}

		// Yamanobo-Ryou
			// v2.00 (2025/01/08), v2.02 (2025/01/09)
			// Optimize user data structure
			if(localStorage.YamanoboRyou_Game != undefined) {
				let Game = JSON.parse(localStorage.getItem("YamanoboRyou_Game"));
				if(Game.Terrain.Data[0].C == undefined) {
					let NewObject = [
						{C: "", A: 0}
					];
					for(let Looper = 1; Looper < Game.Terrain.Data.length; Looper++) {
						NewObject[Looper] = {
							C: Game.Terrain.Data[Looper][1],
							A: Game.Terrain.Data[Looper][2]
						}
					}
					Game.Terrain.Data = structuredClone(NewObject);
					localStorage.setItem("YamanoboRyou_Game", JSON.stringify(Game));
				}
				if(Game.Stats.Keystroke == undefined) {
					Game.Stats.Keystroke = {
						Count: Game.Stats.KeystrokeCount,
						Timestamp: Game.Stats.KeystrokeTimestamp
					};
					delete Game.Stats.KeystrokeCount;
					delete Game.Stats.KeystrokeTimestamp;
					localStorage.setItem("YamanoboRyou_Game", JSON.stringify(Game));
				}
			}
			if(localStorage.YamanoboRyou_Highscore != undefined) {
				let Highscore = JSON.parse(localStorage.getItem("YamanoboRyou_Highscore"));
				if(Highscore[1].Sequence == undefined) {
					let NewObject = [
						0,
						{Sequence: Highscore[1][1], Date: Highscore[1][2], Score: Highscore[1][3], AvgSpeed: Highscore[1][4], AvgKeystrokeSpeed: Highscore[1][5], Accuracy: Highscore[1][6]},
						{Sequence: Highscore[2][1], Date: Highscore[2][2], Score: Highscore[2][3], AvgSpeed: Highscore[2][4], AvgKeystrokeSpeed: Highscore[2][5], Accuracy: Highscore[2][6]},
						{Sequence: Highscore[3][1], Date: Highscore[3][2], Score: Highscore[3][3], AvgSpeed: Highscore[3][4], AvgKeystrokeSpeed: Highscore[3][5], Accuracy: Highscore[3][6]},
						{Sequence: Highscore[4][1], Date: Highscore[4][2], Score: Highscore[4][3], AvgSpeed: Highscore[4][4], AvgKeystrokeSpeed: Highscore[4][5], Accuracy: Highscore[4][6]},
						{Sequence: Highscore[5][1], Date: Highscore[5][2], Score: Highscore[5][3], AvgSpeed: Highscore[5][4], AvgKeystrokeSpeed: Highscore[5][5], Accuracy: Highscore[5][6]},
						{Sequence: Highscore[6][1], Date: Highscore[6][2], Score: Highscore[6][3], AvgSpeed: Highscore[6][4], AvgKeystrokeSpeed: Highscore[6][5], Accuracy: Highscore[6][6]}
					];
					localStorage.setItem("YamanoboRyou_Highscore", JSON.stringify(NewObject));
				}
			}

			// v3.00 (2025/12/14)
			// Rename values (Game font)
			if(localStorage.YamanoboRyou_Subsystem != undefined) {
				let Subsystem = JSON.parse(localStorage.getItem("YamanoboRyou_Subsystem"));
				switch(Subsystem.Display.GameFont) {
					case "Default":
					case "Iosevka, monospace":
						Subsystem.Display.GameFont = "Iosevka";
						localStorage.setItem("YamanoboRyou_Subsystem", JSON.stringify(Subsystem));
						break;
					case "Sans":
						Subsystem.Display.GameFont = "Sans-serif";
						localStorage.setItem("YamanoboRyou_Subsystem", JSON.stringify(Subsystem));
						break;
					case "Inter, sans-serif":
						Subsystem.Display.GameFont = "Inter";
						localStorage.setItem("YamanoboRyou_Subsystem", JSON.stringify(Subsystem));
						break;
					default:
						break;
				}
			}

			// v3.02 (2026/06/13)
			// Rename values (Game font)
			if(localStorage.YamanoboRyou_Subsystem != undefined) {
				let Subsystem = JSON.parse(localStorage.getItem("YamanoboRyou_Subsystem"));
				if(Subsystem.Display.GameFont == "Iosevka") {
					Subsystem.Display.GameFont = "Victor Mono";
					localStorage.setItem("YamanoboRyou_Subsystem", JSON.stringify(Subsystem));
				}
			}
	}

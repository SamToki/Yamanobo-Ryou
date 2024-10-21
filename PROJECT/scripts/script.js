// For SamToki.github.io/Yamanobo-Ryou
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CurrentVersion = 0.24;
		var Game0 = {
			Terrain: {
				WalkedWidth: 0,
				Generation: {
					Ahead: 1, Behind: 0
				}
			},
			Stats: {
				PreviousClockTime: 0, PreviousElapsedTime: 0,
				KeystrokeSpeedDisplay: 0,
				ScoreDisplay: 0,
				SpeedTapeDisplay: 0, PreviousSpeedTapeDisplay: 0, SpeedBalloonDisplay: [0, 0, 0, 0],
				SpeedTrendDisplay: 0, AvgSpeedDisplay: 0, ChaserSpeedDisplay: 0, DangerousSpeedDisplay: 0,
				AltitudeTapeDisplay: 0, AltitudeBalloonDisplay: [0, 0, 0, 0, 0]
			}
		};
		Interaction.Deletion = 0;
		Automation.ClockGame = null;

		// Saved
		var Subsystem = {
			Display: {
				GameFont: "Monospace"
			}
		},
		Game = {
			Progressing: {
				Progressing: "Duration", Duration: 3, TravelDistance: 500, Altitude: 1600
			},
			Difficulty: {
				ChaserSpeed: {
					Initial: 180, Final: 240
				},
				MaxSeparation: 50
			},
			CustomCharacters: {
				PlayerImage: "", ChaserImage: "",
				BgImage: ""
			},
			Status: {
				IsRunning: false, IsPaused: false
			},
			Terrain: {
				Text: "",
				Data: [
					[0, "", 0]
				],
				Gradient: 3 // Range: -3 to 6.
			},
			PreviousTextboxContent: "",
			Stats: {
				Progress: 0,
				Odometer: 0, ChaserOdometer: 0, TypoCount: 0,
				StartTime: 0, ElapsedTime: 0,
				KeystrokeCount: 0, KeystrokeSpeed: 0, AvgKeystrokeSpeed: 0,
				Accuracy: 0,
				Score: 0,
				Speed: 0, SpeedTrend: 0, AvgSpeed: 0, ChaserSpeed: 0, DangerousSpeed: 0,
				Altitude: 0,
				KeystrokeTimestamp: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				TypeTimestamp: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
			}
		},
		Highscore = [
			0,
			[0, "#1", "", "", "", "", ""],
			[0, "#2", "", "", "", "", ""],
			[0, "#3", "", "", "", "", ""],
			[0, "#4", "", "", "", "", ""],
			[0, "#5", "", "", "", "", ""],
			[0, "#6", "", "", "", "", ""]
		],
		Library = {
			Selection: 1,
			Text: [
				0,
				{
					Name: "[英文] Yamada Ryou",
					Content: "Yamada Ryou is one of the main characters in the manga and anime series, Bocchi the Rock!. She is in her second year at Shimokitazawa High School and is the bassist of the band, Kessoku Band. She works a part-time job at the live house STARRY with Ijichi Nijika. She has an androgynous appearance and a mysterious atmosphere, such as silence and expressionlessness. She often fascinates women, including Kita Ikuyo, who falls in love at first sight. She lives with a wealthy family but never has any money because she spends it all on instruments. She occasionally eats weeds to get rid of her hunger. Ryou has short blue hair with two black square hair clips on the right side of her bangs and yellow eyes, with a mole on her left cheek. Ryou's uniform consists of a collared white shirt worn with a black ribbon, a dark blue pleated skirt, black leggings, maroon or brown loafers, and a matching long sleeved sweater. This outfit is similar to most Japanese high school uniforms (seifuku). ",
					Language: "en-US",
					Source: "Bocchi the Rock Wiki https://bocchi-the-rock.fandom.com/wiki/Ryo_Yamada (CC BY-SA 3.0)"
				},
				{
					Name: "[英文] Computer keyboard",
					Content: "A computer keyboard is a peripheral input device modeled after the typewriter keyboard which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches. Replacing early punched cards and paper tape technology, interaction via teleprinter-style keyboards have been the main input method for computers since the 1970s, supplemented by the computer mouse since the 1980s. Keyboard keys (buttons) typically have a set of characters engraved or printed on them, and each press of a key typically corresponds to a single written symbol. However, producing some symbols may require pressing and holding several keys simultaneously or in sequence. While most keys produce characters (letters, numbers or symbols), other keys (such as the escape key) can prompt the computer to execute system commands. In a modern computer, the interpretation of key presses is generally left to the software: the information sent to the computer, the scan code, tells it only which physical key (or keys) was pressed or released. ",
					Language: "en-US",
					Source: "Wikipedia https://en.wikipedia.org/wiki/Computer_keyboard (CC BY-SA 4.0)"
				},
				{
					Name: "[简体中文] 贝斯",
					Content: "贝斯，又称低音吉他，弹拨乐器。通常有四根弦，但也有五弦、六弦甚至更多弦的。贝斯的定弦方式来源于低音提琴，原理结构来源于吉他。当然，无品贝斯则在一定程度上又回归了同样无品的低音提琴。一般地，我们口头上的“狭义”的贝斯指的是电贝斯，通常与电吉他很相似，但琴颈比吉他要长得多，重量则略重一些，四弦和五弦贝斯的琴头比电吉他窄。贝斯的音阶处于低音位置。琴弦相当粗，弦张力相当大，拨弦的力量要比吉他大得多。广义上的贝斯则还包括了木贝斯，即原音贝斯，但很少见。现实世界中被用来充当木贝斯的一般是拨弦低音提琴，俗称“大贝斯”。不过低音提琴与其他提琴一样没有品格，并且拨奏时声音亦非常短促，并不能完全取代有品格的，形似木吉他的原声贝斯。且电贝斯相较于原声贝斯，需要通过拾音器来向音箱传输声音。电贝斯的拾音器又能分为使用P型拾音器的P贝斯，使用J型拾音器的J贝斯，同时使用P型和J型拾音器的PJ贝斯，还有双线圈拾音器贝斯等等诸多种类。贝斯在乐队中主要担任低音声部，是一个非常重要的角色，常被称为是乐队的灵魂。贝斯的奇妙之处在于控制整个乐队的律动。",
					Language: "zh-CN",
					Source: "萌娘百科 https://zh.moegirl.org.cn/%E8%B4%9D%E6%96%AF (CC BY-NC-SA 3.0)"
				},
				{
					Name: "[简体中文] 涡轮风扇发动机",
					Content: "涡轮风扇发动机是一种燃气涡轮式航空发动机，主要特点是其首级扇叶的面积较涡轮喷气发动机大上许多。经过涡轮喷气发动机的空气通道称为内涵道，空气在喷气发动机燃烧后获得机械能。外侧的空气通道称为外涵道，由内含的涡轮驱动首级增压扇叶推动空气，增压扇叶同时具有螺旋桨和压缩空气的作用，能将部分吸入的空气通过喷气发动机的外围提供直接推力，推力即由内外涵道共同产生。可同时具有涡轮螺旋桨与涡轮喷气发动机的推力供给。涡轮风扇发动机外观上似乎是更粗的发动机，实际上只有中心是喷气发动机，其他全是扇风推进。因为并非只依靠涡轮喷气直接燃油燃烧出高压空气提供推力，所以单位推力小时耗油率比纯涡轮喷气佳，但螺旋扇叶速度越快的推力重量比耗损功率较大，比较纯涡轮喷气，超音速飞行时其受到附面层影响使其低气压高空与超音速下推力重量不佳。于是乎，涡扇发动机最适合飞行速度为每小时400至2000公里时使用，故此现在多数的喷气机发动机都是采用涡扇发动机作为动力来源。",
					Language: "zh-CN",
					Source: "Wikipedia https://zh.wikipedia.org/zh-cn/%E6%B8%A6%E8%BC%AA%E6%89%87%E7%99%BC%E5%8B%95%E6%A9%9F (CC BY-SA 4.0)"
				},
				{
					Name: "[日文] 電車",
					Content: "電車は、鉄道車両のうち、電気を動力として自走する事が可能な客車や貨車の総称である。すなわち、客車や貨車そのものに動力が備わっており、機関車なしで自走可能な「電動客車」および「電動貨車」を指す。「電気列車」または「電動列車」とも呼ばれる。電車のうち、動力を持つ車両は電動車、動力を持たず電動車と編成を組む車両は付随車。また、運転席のある付随車は制御車、電動車に運転席のある物は制御電動車と呼称する。電動機を駆動する電力は、集電装置により外部から取り込む場合と、車載の蓄電池から供給する場合の2通りがある。車上の内燃機関で発電機を稼動させ、得られた電力で電動機を駆動する車両は電気式気動車と呼ばれ「電車」には含まれない。また、電気を動力にする鉄道車両としては電気機関車もあるが、これも電車には含まれない。また、電気機関車に牽引される客車や貨車も電車には含まれない。もともと「電車」は、自走式の電動機付き客車「電動客車」、および事業用車を含む電動機付き貨車「電動貨車など」の略称だったが、現在では一般名詞となり、各省庁をはじめ、運輸事業者や車両製造会社でも正式に用いられている。",
					Language: "ja-JP",
					Source: "Wikipedia https://ja.wikipedia.org/wiki/%E9%9B%BB%E8%BB%8A (CC BY-SA 4.0)"
				},
				{
					Name: "[测试用] osu!",
					Content: "zxzxzxzxzx",
					Language: "en-US",
					Source: ""
				}
			]
		};

	// Load user data
	window.onload = Load();
	function Load() {
		if(localStorage.System != undefined) {
			System = JSON.parse(localStorage.getItem("System"));
		} else {
			System.I18n.Language = "zh-CN";
		}
		switch(System.I18n.Language) {
			case "en-US":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"en-US\">Sorry, this page currently does not support English (US).</span>",
					"", "", "", "<span lang=\"en-US\">OK</span>");
				break;
			case "ja-JP":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"ja-JP\">すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "", "<span lang=\"ja-JP\">OK</span>");
				break;
			case "zh-CN":
				/* ChangeCursorOverall("wait");
				window.location.replace("index.html"); */
				break;
			case "zh-TW":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"zh-TW\">抱歉，本頁面暫不支援繁體中文。</span>",
					"", "", "", "<span lang=\"zh-TW\">確定</span>");
				break;
			default:
				AlertSystemError("The value of System.I18n.Language \"" + System.I18n.Language + "\" in function Load is invalid.");
				break;
		}
		if(System.Version.YamanoboRyou != undefined) {
			if(Math.floor(CurrentVersion) - Math.floor(System.Version.YamanoboRyou) >= 1) {
				ShowDialog("System_MajorUpdateDetected",
					"Info",
					"检测到大版本更新。若您继续使用旧版本的用户数据，则有可能发生兼容性问题。敬请留意。",
					"", "", "", "确定");
				System.Version.YamanoboRyou = CurrentVersion;
			}
		} else {
			System.Version.YamanoboRyou = CurrentVersion;
		}
		if(localStorage.YamanoboRyou_Subsystem != undefined) {
			Subsystem = JSON.parse(localStorage.getItem("YamanoboRyou_Subsystem"));
		}
		if(localStorage.YamanoboRyou_Game != undefined) {
			Game = JSON.parse(localStorage.getItem("YamanoboRyou_Game"));
			Game0.Terrain.Generation = {
				Ahead: Game.Stats.Odometer + 1, Behind: Game.Stats.Odometer
			};
		}
		if(localStorage.YamanoboRyou_Highscore != undefined) {
			Highscore = JSON.parse(localStorage.getItem("YamanoboRyou_Highscore"));
		}
		if(localStorage.YamanoboRyou_Library != undefined) {
			Library = JSON.parse(localStorage.getItem("YamanoboRyou_Library"));
		}
		ChangeValue("Textbox_LibraryFilter", "");
		ChangeValue("Textbox_LibraryImport", "");
		ChangeText("Ctnr_GameTerrain", "");
		ChangeValue("Textbox_Game", "");
		RefreshSystem();
		RefreshSubsystem();
		RefreshGame();
		RefreshHighscore();
		RefreshLibrary();
		Focus("Textbox_Game");
		setTimeout(HideToast, 0);
	}

// Refresh
	// System
	function RefreshSystem() {
		// Settings
			// Display
			if(window.matchMedia("(prefers-contrast: more)").matches == false) {
				ChangeDisabled("Combobox_SettingsTheme", false);
			} else {
				System.Display.Theme = "HighContrast";
				ChangeDisabled("Combobox_SettingsTheme", true);
			}
			ChangeValue("Combobox_SettingsTheme", System.Display.Theme);
			switch(System.Display.Theme) {
				case "Auto":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "(prefers-color-scheme: dark)");
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "(prefers-color-scheme: dark)");
					break;
				case "Light":
					ChangeLink("ThemeVariant_Common", "");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Dark":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Genshin":
					ChangeLink("ThemeVariant_Common", "../styles/common_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "HighContrast":
					ChangeLink("ThemeVariant_Common", "../styles/common_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				default:
					AlertSystemError("The value of System.Display.Theme \"" + System.Display.Theme + "\" in function RefreshSystem is invalid.");
					break;
			}
			ChangeValue("Combobox_SettingsCursor", System.Display.Cursor);
			switch(System.Display.Cursor) {
				case "Default":
					ChangeCursorOverall("");
					break;
				case "BTRAhoge":
				case "Genshin":
				case "GenshinFurina":
				case "GenshinNahida":
					ChangeCursorOverall("url(../cursors/" + System.Display.Cursor + ".cur), auto");
					break;
				default:
					AlertSystemError("The value of System.Display.Cursor \"" + System.Display.Cursor + "\" in function RefreshSystem is invalid.");
					break;
			}
			ChangeChecked("Checkbox_SettingsBlurBgImage", System.Display.BlurBgImage);
			if(System.Display.BlurBgImage == true) {
				ChangeFilter("Ctnr_BgImage", "blur(20px)");
			} else {
				ChangeFilter("Ctnr_BgImage", "");
			}
			ChangeChecked("Checkbox_SettingsShowTopbar", System.Display.ShowTopbar);
			if(System.Display.ShowTopbar == true && IsFullscreen() == false) {
				Show("Topbar");
			} else {
				Hide("Topbar");
			}
			ChangeValue("Combobox_SettingsHotkeyIndicators", System.Display.HotkeyIndicators);
			switch(System.Display.HotkeyIndicators) {
				case "Disabled":
					FadeHotkeyIndicators();
					break;
				case "ShowOnWrongKeyPress":
				case "ShowOnAnyKeyPress":
					break;
				case "AlwaysShow":
					ShowHotkeyIndicators();
					break;
				default:
					AlertSystemError("The value of System.Display.HotkeyIndicators \"" + System.Display.HotkeyIndicators + "\" in function RefreshSystem is invalid.");
					break;
			}
			if(window.matchMedia("(prefers-reduced-motion: reduce)").matches == false) {
				ChangeDisabled("Combobox_SettingsAnim", false);
			} else {
				System.Display.Anim = 0;
				ChangeDisabled("Combobox_SettingsAnim", true);
			}
			ChangeValue("Combobox_SettingsAnim", System.Display.Anim);
			ChangeAnimOverall(System.Display.Anim);

			// Dev
			ChangeChecked("Checkbox_SettingsTryToOptimizePerformance", System.Dev.TryToOptimizePerformance);
			if(System.Dev.TryToOptimizePerformance == true) {
				AddClass("Html", "PerformanceOptimization");
			} else {
				RemoveClass("Html", "PerformanceOptimization");
			}
			ChangeChecked("Checkbox_SettingsShowDebugOutlines", System.Dev.ShowDebugOutlines);
			ChangeShowDebugOutlines(System.Dev.ShowDebugOutlines);
			ChangeChecked("Checkbox_SettingsUseOldTypeface", System.Dev.UseOldTypeface);
			if(System.Dev.UseOldTypeface == true) {
				ChangeLanguage("Html", "ja-JP");
			} else {
				ChangeLanguage("Html", "zh-CN");
			}
			ChangeValue("Textbox_SettingsFont", System.Dev.Font);
			ChangeFont("Html", System.Dev.Font);

			// User data
			ChangeValue("Textbox_SettingsUserDataImport", "");

		// Save user data
		localStorage.setItem("System", JSON.stringify(System));
	}
	function RefreshSubsystem() {
		// Settings
			// Display
			ChangeValue("Combobox_SettingsGameFont", Subsystem.Display.GameFont);
			switch(Subsystem.Display.GameFont) {
				case "Default":
					ChangeFont("Ctnr_GameTerrain", "");
					ChangeFont("Textbox_Game", "");
					break;
				case "Sans":
				case "Serif":
				case "Monospace":
					ChangeFont("Ctnr_GameTerrain", Subsystem.Display.GameFont.toLowerCase());
					ChangeFont("Textbox_Game", Subsystem.Display.GameFont.toLowerCase());
					break;
				default:
					AlertSystemError("The value of Subsystem.Display.GameFont \"" + Subsystem.Display.GameFont + "\" in function RefreshSubsystem is invalid.");
					break;
			}

		// Save user data
		localStorage.setItem("YamanoboRyou_Subsystem", JSON.stringify(Subsystem));
	}

	// Game
	function ClockGame() {
		// Update times (High priority)
		if(Game.Status.IsRunning == true) {
			if(Game.Status.IsPaused == false) {
				Game.Stats.ElapsedTime = Date.now() - Game.Stats.StartTime;
			} else {
				Game.Stats.StartTime = Date.now() - Game.Stats.ElapsedTime;
			}
		}

		// Movement
			// Player
			RemoveClass("Textbox_Game", "HasTypo");
			if(ReadValue("Textbox_Game") != "" &&
			!(Game.Status.IsRunning == true && Game.Stats.Progress >= 100) &&
			!(Game.Status.IsRunning == true && Game.Stats.Odometer > 20 && Game.Stats.ChaserOdometer >= Game.Stats.Odometer)) {
				// Start or continue game
				if(Game.Status.IsRunning == false) {
					Game.Status.IsRunning = true;
					Game.Stats.StartTime = Date.now();
					setTimeout(RefreshGame, 0);
				} else {
					if(Game.Status.IsPaused == true) {
						Game.Status.IsPaused = false;
						Game.Stats.StartTime = Date.now() - Game.Stats.ElapsedTime;
						setTimeout(RefreshGame, 0);
					}
				}

				// Check typed text
				if(Interaction.IsInIMEComposition == false) {
					if(ReadValue("Textbox_Game").charAt(0) == Game.Terrain.Text.charAt(Game.Stats.Odometer)) {
						Game.Stats.Odometer++;
						if(IsElementExisting("Terrain_Game" + Game.Stats.Odometer) == true) {
							Game0.Terrain.WalkedWidth += ReadWidth("Terrain_Game" + Game.Stats.Odometer);
						}
						Game.Stats.TypeTimestamp.splice(1, 1);
						Game.Stats.TypeTimestamp[21] = Game.Stats.ElapsedTime;
						Game.Stats.Score += Math.floor(Math.pow(2, (Game.Stats.TypeTimestamp[20] - Game.Stats.TypeTimestamp[21]) / 100) * 100);
						if(Game.Stats.Score > 99999999) {
							Game.Stats.Score = 99999999;
						}
						if(IsElementExisting("Terrain_Game" + Game.Stats.Odometer) == true) {
							RemoveClass("Terrain_Game" + Game.Stats.Odometer, "Ahead");
						}
						ChangeValue("Textbox_Game", ReadValue("Textbox_Game").substring(1));
					} else {
						if(Game.PreviousTextboxContent.startsWith(ReadValue("Textbox_Game")) == false) {
							Game.Stats.TypoCount++;
						}
						AddClass("Textbox_Game", "HasTypo");
					}
				}
				Game.PreviousTextboxContent = ReadValue("Textbox_Game");
			}

			// Chaser
			if(Game.Stats.Odometer > 20) {
				Game.Stats.ChaserSpeed = Game.Difficulty.ChaserSpeed.Initial + (Game.Difficulty.ChaserSpeed.Final - Game.Difficulty.ChaserSpeed.Initial) * (Game.Stats.Progress / 100);
			} else {
				Game.Stats.ChaserSpeed = 0;
			}
			if(Game.Status.IsRunning == true && Game.Status.IsPaused == false) {
				Game.Stats.ChaserOdometer += Game.Stats.ChaserSpeed / 60000 * (Game.Stats.ElapsedTime - Game0.Stats.PreviousElapsedTime);
				if(Game.Stats.Odometer - Game.Stats.ChaserOdometer > Game.Difficulty.MaxSeparation) {
					Game.Stats.ChaserOdometer = Game.Stats.Odometer - Game.Difficulty.MaxSeparation;
				}
			}

		// Terrain
			// Generate text
			if(Library.Text[Library.Selection].Content != "") {
				while(Game.Terrain.Text.length - Game.Stats.Odometer < 100) {
					Game.Terrain.Text += Library.Text[Library.Selection].Content;
				}
			} else {
				AlertSystemError("The selected text in the library is empty.");
			}

			// Generate terrain data
			while((Game.Terrain.Data.length - 1) < Game.Terrain.Text.length) {
				Game.Terrain.Data[Game.Terrain.Data.length] = [
					0,
					Game.Terrain.Text.charAt(Game.Terrain.Data.length - 1),
					Game.Terrain.Data[Game.Terrain.Data.length - 1][2] + Game.Terrain.Gradient
				];
				if(Game.Terrain.Data[Game.Terrain.Data.length - 1][2] < 0) {
					Game.Terrain.Data[Game.Terrain.Data.length - 1][2] = 0;
				}
				if(Game.Terrain.Data[Game.Terrain.Data.length - 1][2] > 29000) {
					Game.Terrain.Data[Game.Terrain.Data.length - 1][2] = 29000;
				}
				Game.Terrain.Gradient += Randomize(-36 - Math.floor((Game.Terrain.Gradient - 3) * 6), 36 - Math.floor((Game.Terrain.Gradient - 3) * 6)) / 24;
					// This algorithm makes the gradient variation balanced.
					// For example, if gradient is -3, the variation is randomized between 0 and +3. So the descent cannot be steeper any more.
			}

			// Generate and remove terrain elements
				// Ahead
				if(Game.Terrain.Data[Game0.Terrain.Generation.Ahead][1] == "") {
					AlertSystemError("Terrain #" + Game0.Terrain.Generation.Ahead + " has empty text.");
				}
				if(IsElementExisting("Terrain_Game" + Game0.Terrain.Generation.Ahead) == false) {
					AddText("Ctnr_GameTerrain", "<div class=\"Terrain Ahead\" id=\"Terrain_Game" + Game0.Terrain.Generation.Ahead + "\">" + Game.Terrain.Data[Game0.Terrain.Generation.Ahead][1] + "</div>");
					let CumulativeWidth = 0;
					for(let Looper = Game.Stats.Odometer + 1; Looper < Game0.Terrain.Generation.Ahead; Looper++) {
						CumulativeWidth += ReadWidth("Terrain_Game" + Looper);
					}
					ChangeLeft("Terrain_Game" + Game0.Terrain.Generation.Ahead, Game0.Terrain.WalkedWidth + CumulativeWidth + "px");
					ChangeHeight("Terrain_Game" + Game0.Terrain.Generation.Ahead, 2000 + Game.Terrain.Data[Game0.Terrain.Generation.Ahead][2] + "px");
				}
				if(Game0.Terrain.Generation.Ahead - Game.Stats.Odometer < 100) {
					Game0.Terrain.Generation.Ahead++;
				} else {
					Game0.Terrain.Generation.Ahead = Game.Stats.Odometer + 100;
				}

				// Behind
				if(Game.Terrain.Data[Game0.Terrain.Generation.Behind][1] == "" && Game0.Terrain.Generation.Behind > 0) {
					AlertSystemError("Terrain #" + Game0.Terrain.Generation.Behind + " has empty text.");
				}
				if(IsElementExisting("Terrain_Game" + Game0.Terrain.Generation.Behind) == false) {
					AddText("Ctnr_GameTerrain", "<div class=\"Terrain\" id=\"Terrain_Game" + Game0.Terrain.Generation.Behind + "\">" + Game.Terrain.Data[Game0.Terrain.Generation.Behind][1] + "</div>");
					let CumulativeWidth = 0;
					for(let Looper = Game.Stats.Odometer; Looper >= Game0.Terrain.Generation.Behind; Looper--) {
						CumulativeWidth += ReadWidth("Terrain_Game" + Looper);
					}
					ChangeLeft("Terrain_Game" + Game0.Terrain.Generation.Behind, Game0.Terrain.WalkedWidth - CumulativeWidth + "px");
					ChangeHeight("Terrain_Game" + Game0.Terrain.Generation.Behind, 2000 + Game.Terrain.Data[Game0.Terrain.Generation.Behind][2] + "px");
				}
				if(Game.Stats.Odometer - Game0.Terrain.Generation.Behind < 100) {
					Game0.Terrain.Generation.Behind--;
				} else {
					Game0.Terrain.Generation.Behind = Game.Stats.Odometer - 100;
				}
				if(Game0.Terrain.Generation.Behind < 0) {
					Game0.Terrain.Generation.Behind = 0;
				}

				// Removal
				for(let Looper = 0; Looper <= Game0.Terrain.Generation.Behind - 1; Looper++) {
					if(IsElementExisting("Terrain_Game" + Looper) == true) {
						RemoveElement("Terrain_Game" + Looper);
					}
				}

			// Align terrain to player
			if(IsMobileLayout() == false) {
				ChangeBottom("Ctnr_GameTerrain", "calc(50% - 1980px - " + Game.Terrain.Data[Game.Stats.Odometer + 1][2] + "px)");
			} else {
				ChangeBottom("Ctnr_GameTerrain", "calc(85px + (100% - 260px) / 2 - 1980px - " + Game.Terrain.Data[Game.Stats.Odometer + 1][2] + "px)");
			}
			ChangeRight("Ctnr_GameTerrain", "calc(50% + " + Game0.Terrain.WalkedWidth + "px)");

		// Characters
			// Player
			if(IsMobileLayout() == false) {
				ChangeBottom("Character_GamePlayer", "calc(50% + 20px - " + (Game.Terrain.Data[Game.Stats.Odometer + 1][2] - Game.Terrain.Data[Game.Stats.Odometer][2]) + "px)");
			} else {
				ChangeBottom("Character_GamePlayer", "calc(85px + (100% - 260px) / 2 + 20px - " + (Game.Terrain.Data[Game.Stats.Odometer + 1][2] - Game.Terrain.Data[Game.Stats.Odometer][2]) + "px)");
			}

			// Chaser
				// Vertical separation
				if(IsMobileLayout() == false) {
					ChangeBottom("Character_GameChaser", "calc(50% + 20px - " + (Game.Terrain.Data[Game.Stats.Odometer + 1][2] - Game.Terrain.Data[Math.floor(Game.Stats.ChaserOdometer)][2]) + "px)");
				} else {
					ChangeBottom("Character_GameChaser", "calc(85px + (100% - 260px) / 2 + 20px - " + (Game.Terrain.Data[Game.Stats.Odometer + 1][2] - Game.Terrain.Data[Math.floor(Game.Stats.ChaserOdometer)][2]) + "px)");
				}

				// Horizontal separation
				let HorizontalSeparation = 0;
				for(let Looper = Math.floor(Game.Stats.ChaserOdometer) + 1; Looper <= Game.Stats.Odometer; Looper++) {
					if(IsElementExisting("Terrain_Game" + Looper) == true) {
						HorizontalSeparation += ReadWidth("Terrain_Game" + Looper);
					}
				}
				if(Game.Stats.Odometer < 20) {
					HorizontalSeparation += (20 - Game.Stats.Odometer) * 10;
				}
				ChangeRight("Character_GameChaser", "calc(50% + " + HorizontalSeparation + "px)");

			// Chaser balloon
			if((IsMobileLayout() == false && ReadLeft("Character_GameChaser") < -130) ||
				(IsMobileLayout() == true && ReadLeft("Character_GameChaser") < -65)) {
				Show("GameChaserBalloon");
			} else {
				Fade("GameChaserBalloon");
			}
			ChangeText("Label_GameDistance", Game.Stats.Odometer - Math.floor(Game.Stats.ChaserOdometer));

		// Progbar
		switch(Game.Progressing.Progressing) {
			case "Duration":
				Game.Stats.Progress = Game.Stats.ElapsedTime / (Game.Progressing.Duration * 60000) * 100;
				break;
			case "TravelDistance":
				Game.Stats.Progress = Game.Stats.Odometer / Game.Progressing.TravelDistance * 100;
				break;
			case "Altitude":
				Game.Stats.Progress = Game.Stats.Altitude / Game.Progressing.Altitude * 100;
				break;
			default:
				AlertSystemError("The value of Game.Progressing.Progressing \"" + Game.Progressing.Progressing + "\" in function ClockGame is invalid.");
				break;
		}
		ChangeProgbar("ProgbarFg_Game", "Horizontal", Game.Stats.Progress);

		// Stats
		ChangeText("Label_GameOdometerValue", Game.Stats.Odometer);
		ChangeText("Label_GameTypoCountValue", Game.Stats.TypoCount);
		ChangeText("Label_GameElapsedTimeValue", Math.floor(Game.Stats.ElapsedTime / 60000) + ":" + Math.floor(Game.Stats.ElapsedTime % 60000 / 1000).toString().padStart(2, "0"));
		if(Game.Stats.KeystrokeCount > 20) {
			if(Game.Stats.KeystrokeTimestamp[1] >= 0) {
				Game.Stats.KeystrokeSpeed = 60000 / ((Game.Stats.ElapsedTime - Game.Stats.KeystrokeTimestamp[1]) / 20);
				Game.Stats.AvgKeystrokeSpeed = Game.Stats.KeystrokeCount / (Game.Stats.ElapsedTime / 60000);
			} else {
				AlertSystemError("The array Game.Stats.KeystrokeTimestamp is not filled when Game.Stats.KeystrokeCount got greater than 20.");
			}
			RemoveClass("Label_GameKeystrokeSpeedValue", "Transparent");
		} else {
			Game.Stats.KeystrokeSpeed = 0;
			Game.Stats.AvgKeystrokeSpeed = 0;
			if(Game.Stats.KeystrokeCount > 0) {
				AddClass("Label_GameKeystrokeSpeedValue", "Transparent");
			} else {
				RemoveClass("Label_GameKeystrokeSpeedValue", "Transparent");
			}
		}
		if(System.Display.Anim > 0) {
			Game0.Stats.KeystrokeSpeedDisplay += (Game.Stats.KeystrokeSpeed - Game0.Stats.KeystrokeSpeedDisplay) / 200;
		} else {
			Game0.Stats.KeystrokeSpeedDisplay = Game.Stats.KeystrokeSpeed;
		}
		ChangeText("Label_GameKeystrokeSpeedValue", Game0.Stats.KeystrokeSpeedDisplay.toFixed(0) + "<span class=\"SmallerText\">kpm</span>");
		if(Game.Stats.Odometer > 0) {
			Game.Stats.Accuracy = Game.Stats.Odometer / (Game.Stats.Odometer + Game.Stats.TypoCount) * 100;
		} else {
			Game.Stats.Accuracy = 0;
		}
		ChangeText("Label_GameAccuracyValue", Game.Stats.Accuracy.toFixed(2) + "%");
		if(System.Display.Anim > 0) {
			Game0.Stats.ScoreDisplay += (Game.Stats.Score - Game0.Stats.ScoreDisplay) / 5;
		} else {
			Game0.Stats.ScoreDisplay = Game.Stats.Score;
		}
		ChangeText("Label_GameScoreValue", Game0.Stats.ScoreDisplay.toFixed(0).toString().padStart(8, "0"));

		// Speed
		if(Game.Stats.Odometer > 20) { // The speed is not calculated when travel distance is less than 20.
			if(Game.Stats.TypeTimestamp[1] >= 0) {
				Game.Stats.Speed = 60000 / ((Game.Stats.ElapsedTime - Game.Stats.TypeTimestamp[1]) / 20);
				Game.Stats.AvgSpeed = Game.Stats.Odometer / (Game.Stats.ElapsedTime / 60000);
			} else {
				AlertSystemError("The array Game.Stats.TypeTimestamp is not filled when Game.Stats.Odometer got greater than 20.");
			}
			RemoveClass("CtrlGroup_GameSpeedBalloon", "Transparent");
		} else {
			Game.Stats.Speed = 0;
			Game.Stats.AvgSpeed = 0;
			if(Game.Stats.Odometer > 0) {
				AddClass("CtrlGroup_GameSpeedBalloon", "Transparent");
			} else {
				RemoveClass("CtrlGroup_GameSpeedBalloon", "Transparent");
			}
		}
		if(Game.Status.IsRunning == true && Game.Status.IsPaused == false && System.Display.Anim > 0) {
			ChangeAnim("CtrlGroup_GameSpeed", "100ms");
			ChangeAnim("CtrlGroup_GameAltitude", "100ms");
		} else {
			ChangeAnim("CtrlGroup_GameSpeed", "");
			ChangeAnim("CtrlGroup_GameAltitude", "");
		}
			// Tape
			Game0.Stats.SpeedTapeDisplay += (Game.Stats.Speed - Game0.Stats.SpeedTapeDisplay) / 200;
			if(Game0.Stats.SpeedTapeDisplay > 500) {
				Game0.Stats.SpeedTapeDisplay = 500;
			}
			ChangeTop("CtrlGroup_GameSpeedTape", "calc(50% - 2500px + " + Game0.Stats.SpeedTapeDisplay * 5 + "px)");

			// Additional indicators
				// Speed trend
				Game.Stats.SpeedTrend = (Game0.Stats.SpeedTapeDisplay - Game0.Stats.PreviousSpeedTapeDisplay) * (5000 / (Date.now() - Game0.Stats.PreviousClockTime));
				Game0.Stats.SpeedTrendDisplay += (Game.Stats.SpeedTrend - Game0.Stats.SpeedTrendDisplay) / 5;
				if(Game0.Stats.SpeedTrendDisplay >= 0) {
					RemoveClass("Ctrl_GameSpeedTrend", "Decreasing");
					AddClass("Ctrl_GameSpeedTrend", "Increasing");
					ChangeBottom("Ctrl_GameSpeedTrend", "50%");
					ChangeHeight("Ctrl_GameSpeedTrend", Game0.Stats.SpeedTrendDisplay * 5 + "px");
				} else {
					RemoveClass("Ctrl_GameSpeedTrend", "Increasing");
					AddClass("Ctrl_GameSpeedTrend", "Decreasing");
					ChangeBottom("Ctrl_GameSpeedTrend", "calc(50% - " + (-Game0.Stats.SpeedTrendDisplay * 5) + "px)");
					ChangeHeight("Ctrl_GameSpeedTrend", -Game0.Stats.SpeedTrendDisplay * 5 + "px");
				}
				if(Math.abs(Game0.Stats.SpeedTrendDisplay) >= 5) {
					Show("Ctrl_GameSpeedTrend");
				} else {
					Fade("Ctrl_GameSpeedTrend");
				}

				// Other speeds
				ChangeTop("CtrlGroup_GameOtherSpeeds", "calc(50% - 2500px + " + Game0.Stats.SpeedTapeDisplay * 5 + "px)");
					// Chaser speed
					Game0.Stats.ChaserSpeedDisplay += (Game.Stats.ChaserSpeed - Game0.Stats.ChaserSpeedDisplay) / 5;
					ChangeHeight("Ctrl_GameChaserSpeed", Game0.Stats.ChaserSpeedDisplay * 5 + "px");

					// Dangerous speed
					if(Game.Stats.Odometer > 20) {
						Game.Stats.DangerousSpeed = Game.Stats.ChaserSpeed - (Game.Stats.Odometer - Game.Stats.ChaserOdometer) * 6;
					} else {
						Game.Stats.DangerousSpeed = 0;
					}
					Game0.Stats.DangerousSpeedDisplay += (Game.Stats.DangerousSpeed - Game0.Stats.DangerousSpeedDisplay) / 5;
					ChangeHeight("Ctrl_GameDangerousSpeed", Game0.Stats.DangerousSpeedDisplay * 5 + "px");

					// Avg speed
					Game0.Stats.AvgSpeedDisplay += (Game.Stats.AvgSpeed - Game0.Stats.AvgSpeedDisplay) / 5;
					if(Game0.Stats.AvgSpeedDisplay > 500) {
						Game0.Stats.AvgSpeedDisplay = 500;
					}
					ChangeBottom("Ctrl_GameAvgSpeed", Game0.Stats.AvgSpeedDisplay * 5 - 35 + "px");

			// Balloon
			Game0.Stats.SpeedBalloonDisplay[1] = Math.floor(Game0.Stats.SpeedTapeDisplay / 100);
			Game0.Stats.SpeedBalloonDisplay[2] = Math.floor(Game0.Stats.SpeedTapeDisplay % 100 / 10);
			Game0.Stats.SpeedBalloonDisplay[3] = Game0.Stats.SpeedTapeDisplay % 10;
			if(System.Display.Anim > 0) {
				if(Game0.Stats.SpeedBalloonDisplay[3] > 9) {Game0.Stats.SpeedBalloonDisplay[2] += (Game0.Stats.SpeedBalloonDisplay[3] - 9);} // Imitating the cockpit PFD number scrolling effect.
				if(Game0.Stats.SpeedBalloonDisplay[2] > 9) {Game0.Stats.SpeedBalloonDisplay[1] += (Game0.Stats.SpeedBalloonDisplay[2] - 9);}
			} else {
				Game0.Stats.SpeedBalloonDisplay[3] = Math.floor(Game0.Stats.SpeedBalloonDisplay[3]);
			}
			if(IsMobileLayout() == false) {
				ChangeTop("ScrollingNumber_GameSpeed1", -45 * (5 - Game0.Stats.SpeedBalloonDisplay[1]) + "px");
				ChangeTop("ScrollingNumber_GameSpeed2", -45 * (10 - Game0.Stats.SpeedBalloonDisplay[2]) + "px");
				ChangeTop("ScrollingNumber_GameSpeed3", 15 - 30 * (11 - Game0.Stats.SpeedBalloonDisplay[3]) + "px");
			} else {
				ChangeTop("ScrollingNumber_GameSpeed1", -30 * (5 - Game0.Stats.SpeedBalloonDisplay[1]) + "px");
				ChangeTop("ScrollingNumber_GameSpeed2", -30 * (10 - Game0.Stats.SpeedBalloonDisplay[2]) + "px");
				ChangeTop("ScrollingNumber_GameSpeed3", 10 - 20 * (11 - Game0.Stats.SpeedBalloonDisplay[3]) + "px");
			}
			if(Game0.Stats.SpeedTapeDisplay < Game0.Stats.DangerousSpeedDisplay) {
				AddClass("CtrlGroup_GameSpeedBalloon", "EmphasizedText");
			} else {
				RemoveClass("CtrlGroup_GameSpeedBalloon", "EmphasizedText");
			}

		// Altitude
		Game.Stats.Altitude = Game.Terrain.Data[Game.Stats.Odometer][2];
			// Tape
			Game0.Stats.AltitudeTapeDisplay += (Game.Stats.Altitude - Game0.Stats.AltitudeTapeDisplay) / 5;
			ChangeTop("CtrlGroup_GameAltitudeTape", "calc(50% - 30000px + " + Game0.Stats.AltitudeTapeDisplay + "px)");

			// Balloon
			Game0.Stats.AltitudeBalloonDisplay[1] = Math.floor(Game0.Stats.AltitudeTapeDisplay / 10000);
			Game0.Stats.AltitudeBalloonDisplay[2] = Math.floor(Game0.Stats.AltitudeTapeDisplay % 10000 / 1000);
			Game0.Stats.AltitudeBalloonDisplay[3] = Math.floor(Game0.Stats.AltitudeTapeDisplay % 1000 / 100);
			Game0.Stats.AltitudeBalloonDisplay[4] = Game0.Stats.AltitudeTapeDisplay % 100;
			if(System.Display.Anim > 0) {
				if(Game0.Stats.AltitudeBalloonDisplay[4] > 80) {Game0.Stats.AltitudeBalloonDisplay[3] += ((Game0.Stats.AltitudeBalloonDisplay[4] - 80) / 20);}
				if(Game0.Stats.AltitudeBalloonDisplay[3] > 9) {Game0.Stats.AltitudeBalloonDisplay[2] += (Game0.Stats.AltitudeBalloonDisplay[3] - 9);}
				if(Game0.Stats.AltitudeBalloonDisplay[2] > 9) {Game0.Stats.AltitudeBalloonDisplay[1] += (Game0.Stats.AltitudeBalloonDisplay[2] - 9);}
			} else {
				Game0.Stats.AltitudeBalloonDisplay[4] = Math.floor(Game0.Stats.AltitudeBalloonDisplay[4] / 20) * 20;
			}
			if(IsMobileLayout() == false) {
				ChangeTop("ScrollingNumber_GameAltitude1", -45 * (3 - Game0.Stats.AltitudeBalloonDisplay[1]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude2", -45 * (10 - Game0.Stats.AltitudeBalloonDisplay[2]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude3", -45 * (10 - Game0.Stats.AltitudeBalloonDisplay[3]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude4", 17.5 - 25 * (6 - Game0.Stats.AltitudeBalloonDisplay[4] / 20) + "px");
			} else {
				ChangeTop("ScrollingNumber_GameAltitude1", -30 * (3 - Game0.Stats.AltitudeBalloonDisplay[1]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude2", -30 * (10 - Game0.Stats.AltitudeBalloonDisplay[2]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude3", -30 * (10 - Game0.Stats.AltitudeBalloonDisplay[3]) + "px");
				ChangeTop("ScrollingNumber_GameAltitude4", 12 - 16 * (6 - Game0.Stats.AltitudeBalloonDisplay[4] / 20) + "px");
			}

		// Prompts
		if(Game.Status.IsRunning == false) {
			Show("Ctrl_GameStartPrompt");
			if(document.activeElement.id == "Textbox_Game") {
				ChangeText("Label_GameStartPrompt", "开始打字即可开始游戏");
			} else {
				ChangeText("Label_GameStartPrompt", "请点击画面");
			}
		} else {
			if(Game.Status.IsPaused == false || Game.Stats.Progress >= 100) {
				Hide("Ctrl_GameStartPrompt");
			} else {
				Show("Ctrl_GameStartPrompt");
				if(document.activeElement.id == "Textbox_Game") {
					ChangeText("Label_GameStartPrompt", "开始打字即可继续游戏");
				} else {
					ChangeText("Label_GameStartPrompt", "请点击画面");
				}
			}
		}
		if(Game.Status.IsRunning == true && Game.Status.IsPaused == false && Game.Stats.Odometer <= 20) {
			Show("Ctrl_GameChasePrompt");
		} else {
			Hide("Ctrl_GameChasePrompt");
		}

		// Victory
		if(Game.Status.IsRunning == true && Game.Stats.Progress >= 100) {
			Game.Stats.Progress = 100;
			ChangeDisabled("Cmdbtn_GamePauseOrReset", true);
			if(Game.Status.IsPaused == false) {
				Game.Status.IsPaused = true;
				ChangeValue("Textbox_Game", "");
				ShowToast("胜利!");
				Highscore[6][1] = "最新";
				Highscore[6][2] = new Date(Date.now()).toLocaleDateString(System.I18n.Language);
				Highscore[6][3] = Game.Stats.Score.toString().padStart(8, "0");
				Highscore[6][4] = Game.Stats.AvgSpeed.toFixed(0) + "cpm";
				Highscore[6][5] = Game.Stats.AvgKeystrokeSpeed.toFixed(0) + "kpm";
				Highscore[6][6] = Game.Stats.Accuracy.toFixed(2) + "%";
				RefreshHighscore();
				setTimeout(function() {
					ResetGame();
					ScrollIntoView("Highscore");
				}, System.Display.Anim * 2 + 1000);
			}
		}

		// Game over
		if(Game.Status.IsRunning == true && Game.Stats.Odometer > 20 && Game.Stats.ChaserOdometer >= Game.Stats.Odometer) {
			Game.Stats.ChaserOdometer = Game.Stats.Odometer;
			ChangeDisabled("Cmdbtn_GamePauseOrReset", true);
			if(Game.Status.IsPaused == false) {
				Game.Status.IsPaused = true;
				ChangeValue("Textbox_Game", "");
				ShowToast("游戏结束");
				setTimeout(ResetGame, System.Display.Anim * 2 + 1000);
			}
		}

		// Update previous variants
		Game0.Stats.PreviousClockTime = Date.now();
		Game0.Stats.PreviousElapsedTime = Game.Stats.ElapsedTime;
		Game0.Stats.PreviousSpeedTapeDisplay = Game0.Stats.SpeedTapeDisplay;
	}
	function RefreshGame() {
		// Call
		RefreshLibrary(); // Section "Game" relies on section "Library".
		ClockGame();

		// Terrain & textbox
		ChangeLanguage("Ctnr_GameTerrain", Library.Text[Library.Selection].Language);
		ChangeLanguage("Textbox_Game", Library.Text[Library.Selection].Language);

		// Ctrls
		if(Game.Status.IsRunning == false) {
			ChangeDisabled("Cmdbtn_GamePauseOrReset", true);
			ChangeText("Cmdbtn_GamePauseOrReset", "暂停");
			ChangeDisabled("Fieldset_Library", false);
			ChangeDisabled("Fieldset_LibraryTextProperties", false);
			ChangeDisabled("Fieldset_LibraryManagement", false);
			ChangeDisabled("Fieldset_SettingsProgressing", false);
			ChangeDisabled("Fieldset_SettingsDifficulty", false);
			ChangeDisabled("Combobox_SettingsGameFont", false);
		} else {
			ChangeDisabled("Cmdbtn_GamePauseOrReset", false);
			if(Game.Status.IsPaused == false) {
				ChangeText("Cmdbtn_GamePauseOrReset", "暂停");
			} else {
				ChangeText("Cmdbtn_GamePauseOrReset", "重置");
			}
			ChangeDisabled("Fieldset_Library", true);
			ChangeDisabled("Fieldset_LibraryTextProperties", true);
			ChangeDisabled("Fieldset_LibraryManagement", true);
			ChangeDisabled("Fieldset_SettingsProgressing", true);
			ChangeDisabled("Fieldset_SettingsDifficulty", true);
			ChangeDisabled("Combobox_SettingsGameFont", true);
		}

		// Settings
			// Progressing
			switch(Game.Progressing.Progressing) {
				case "Duration":
					ChangeChecked("Radiobtn_SettingsDuration", true);
					ChangeChecked("Radiobtn_SettingsTravelDistance", false);
					ChangeChecked("Radiobtn_SettingsAltitude", false);
					break;
				case "TravelDistance":
					ChangeChecked("Radiobtn_SettingsDuration", false);
					ChangeChecked("Radiobtn_SettingsTravelDistance", true);
					ChangeChecked("Radiobtn_SettingsAltitude", false);
					break;
				case "Altitude":
					ChangeChecked("Radiobtn_SettingsDuration", false);
					ChangeChecked("Radiobtn_SettingsTravelDistance", false);
					ChangeChecked("Radiobtn_SettingsAltitude", true);
					break;
				default:
					AlertSystemError("The value of Game.Progressing.Progressing \"" + Game.Progressing.Progressing + "\" in function RefreshGame is invalid.");
					break;
			}
			ChangeValue("Textbox_SettingsDuration", Game.Progressing.Duration);
			ChangeValue("Textbox_SettingsTravelDistance", Game.Progressing.TravelDistance);
			ChangeValue("Textbox_SettingsAltitude", Game.Progressing.Altitude);

			// Difficulty
			ChangeValue("Textbox_SettingsChaserSpeedInitial", Game.Difficulty.ChaserSpeed.Initial);
			ChangeValue("Textbox_SettingsChaserSpeedFinal", Game.Difficulty.ChaserSpeed.Final);
			RemoveClass("Cmdbtn_SettingsChaserSpeedWestern", "Active");
			RemoveClass("Cmdbtn_SettingsChaserSpeedCJK", "Active");
			RemoveClass("Cmdbtn_SettingsChaserSpeedZenMode", "Active");
			if(Game.Difficulty.ChaserSpeed.Initial == 180 && Game.Difficulty.ChaserSpeed.Final == 240) {
				AddClass("Cmdbtn_SettingsChaserSpeedWestern", "Active");
			}
			if(Game.Difficulty.ChaserSpeed.Initial == 40 && Game.Difficulty.ChaserSpeed.Final == 60) {
				AddClass("Cmdbtn_SettingsChaserSpeedCJK", "Active");
			}
			if(Game.Difficulty.ChaserSpeed.Initial == 10 && Game.Difficulty.ChaserSpeed.Final == 10) {
				AddClass("Cmdbtn_SettingsChaserSpeedZenMode", "Active");
			}
			ChangeValue("Textbox_SettingsMaxSeparation", Game.Difficulty.MaxSeparation);

			// Custom characters
			ChangeValue("Textbox_SettingsPlayerImage", Game.CustomCharacters.PlayerImage);
			if(Game.CustomCharacters.PlayerImage != "") {
				ChangeImage("Image_GamePlayer", Game.CustomCharacters.PlayerImage);
			} else {
				ChangeImage("Image_GamePlayer", "images/YamadaRyou.png");
			}
			ChangeValue("Textbox_SettingsChaserImage", Game.CustomCharacters.ChaserImage);
			if(Game.CustomCharacters.ChaserImage != "") {
				ChangeImage("Image_GameChaser", Game.CustomCharacters.ChaserImage);
				ChangeImage("Image_GameChaserBalloon", Game.CustomCharacters.ChaserImage);
			} else {
				ChangeImage("Image_GameChaser", "images/GotouHitori.png");
				ChangeImage("Image_GameChaserBalloon", "images/GotouHitori.png");
			}
			ChangeValue("Textbox_SettingsBgImage", Game.CustomCharacters.BgImage);
			ChangeBgImage(Game.CustomCharacters.BgImage);

		// Save user data (Only when the game is not running or when the game is paused)
		if(Game.Status.IsRunning == false || Game.Status.IsPaused == true) {
			localStorage.setItem("YamanoboRyou_Game", JSON.stringify(Game));
		}
	}

	// Highscore
	function RefreshHighscore() {
		// Remove "Latest" from original highscore table
		for(let Looper = 1; Looper <= 5; Looper++) {
			Highscore[Looper][1] = "名次";
		}

		// Sort (bubble sort)
		for(let Looper = 1; Looper <= 5; Looper++) {
			for(let Looper2 = 5; Looper2 >= 1; Looper2--) {
				if(parseInt(Number(Highscore[Looper2 + 1][3])) > parseInt(Number(Highscore[Looper2][3]))) {
					Highscore[0] = Highscore[Looper2];
					Highscore[Looper2] = Highscore[Looper2 + 1];
					Highscore[Looper2 + 1] = Highscore[0];
				}
			}
		}
		Highscore[0] = 0;

		// Refresh
		for(let Looper = 1; Looper <= 6; Looper++) {
			RemoveClass("Item_HighscoreRow" + Looper, "Box");
			if(Highscore[Looper][1] == "最新") {
				AddClass("Item_HighscoreRow" + Looper, "Box");
			} else {
				Highscore[Looper][1] = "#" + Looper;
			}
			ChangeText("Label_HighscoreRow" + Looper + "Sequence", Highscore[Looper][1]);
			ChangeText("Label_HighscoreRow" + Looper + "Date", Highscore[Looper][2]);
			ChangeText("Label_HighscoreRow" + Looper + "Score", Highscore[Looper][3]);
			ChangeText("Label_HighscoreRow" + Looper + "AvgSpeed", Highscore[Looper][4]);
			ChangeText("Label_HighscoreRow" + Looper + "AvgKeystrokeSpeed", Highscore[Looper][5]);
			ChangeText("Label_HighscoreRow" + Looper + "Accuracy", Highscore[Looper][6]);
		}

		// Save user data
		localStorage.setItem("YamanoboRyou_Highscore", JSON.stringify(Highscore));
	}

	// Library
	function RefreshLibrary() {
		// Generate list
		ChangeText("CtrlGroup_LibraryList", "");
		for(let Looper = 1; Looper < Library.Text.length; Looper++) {
			AddText("CtrlGroup_LibraryList",
				"<li class=\"Ctrl\" id=\"Ctrl_LibraryText" + Looper + "\">" +
				"	<label class=\"ListItemLabel\" id=\"Label_LibraryText" + Looper + "\" for=\"Radiobtn_LibraryText" + Looper + "\">" +
				"		<input class=\"Radiobtn\" id=\"Radiobtn_LibraryText" + Looper + "\" type=\"radio\" checked=\"false\" onchange=\"SetText(" + Looper + ")\" />" +
				"		<span class=\"ListItemName\">" + ConvertEmptyName(Library.Text[Looper].Name) + "</span>" +
				"	</label>" +
				"	<button class=\"Cmdbtn ShownAsLabel ListItemDuplicate\" id=\"Cmdbtn_LibraryText" + Looper + "Duplicate\" onclick=\"DuplicateText(" + Looper + ")\">" +
				"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\">" +
				"			<path d=\"M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z\"/>" +
				"		</svg>" +
				"	</button>" +
				"	<button class=\"Cmdbtn ShownAsLabel ListItemExport\" id=\"Cmdbtn_LibraryText" + Looper + "Export\" onclick=\"ExportText(" + Looper + ")\">" +
				"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\">" +
				"			<path d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5\"/>" +
				"			<path d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z\"/>" +
				"		</svg>" +
				"	</button>" +
				"	<button class=\"Cmdbtn ShownAsLabel ListItemDelete\" id=\"Cmdbtn_LibraryText" + Looper + "Delete\" onclick=\"ConfirmDeleteText(" + Looper + ")\">" +
				"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\">" +
				"			<path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5\"/>" +
				"		</svg>" +
				"	</button>" +
				"</li>");
		}
		if(Library.Text.length <= 1) {
			AlertSystemError("The library is empty.");
		}
		if(Library.Text.length == 2) {
			ChangeDisabled("Cmdbtn_LibraryText1Delete", true);
		}

		// Selection
		for(let Looper = 1; Looper < Library.Text.length; Looper++) {
			if(Library.Selection == Looper) {
				ChangeChecked("Radiobtn_LibraryText" + Looper, true);
				AddClass("Label_LibraryText" + Looper, "Active");
			} else {
				ChangeChecked("Radiobtn_LibraryText" + Looper, false);
				RemoveClass("Label_LibraryText" + Looper, "Active");
			}
		}

		// Filter
		FilterLibrary();

		// Text properties
		ChangeValue("Textbox_LibraryName", Library.Text[Library.Selection].Name);
		ChangeValue("Textbox_LibraryContent", Library.Text[Library.Selection].Content);
		ChangeLanguage("Textbox_LibraryContent", Library.Text[Library.Selection].Language);
		ChangeValue("Textbox_LibraryLanguage", Library.Text[Library.Selection].Language);
		ChangeValue("Textbox_LibrarySource", Library.Text[Library.Selection].Source);

		// Save user data
		localStorage.setItem("YamanoboRyou_Library", JSON.stringify(Library));
	}

// Cmds
	// Game
		// Textbox
		function Keypress() {
			if(Game.Status.IsRunning == true && Game.Status.IsPaused == false) {
				Game.Stats.KeystrokeCount++;
				Game.Stats.KeystrokeTimestamp.splice(1, 1);
				Game.Stats.KeystrokeTimestamp[21] = Game.Stats.ElapsedTime;
			}
		}
		function WarnAboutPasting() {
			if(Game.Status.IsRunning == true && Game.Status.IsPaused == false) { // Make sure the game is paused before showing the dialog.
				Game.Status.IsPaused = true;
				ChangeValue("Textbox_Game", "");
				RefreshGame();
			}
			ShowDialog("Game_DoNotPaste",
				"Caution",
				"本游戏是打字游戏。请勿在游戏主界面进行粘贴操作。",
				"", "", "", "确定");
		}

		// Ctrl
		function PauseOrResetGame() {
			if(Game.Status.IsRunning == true) {
				if(Game.Status.IsPaused == false) {
					Game.Status.IsPaused = true;
					ChangeValue("Textbox_Game", "");
					ShowToast("游戏暂停");
					RefreshGame();
				} else {
					ResetGame();
				}
			}
		}
		function ResetGame() {
			Game.Status = {
				IsRunning: false, IsPaused: false
			};
			Game.Terrain = {
				Text: "",
				Data: [
					[0, "", 0]
				],
				Gradient: 5
			};
			Game.PreviousTextboxContent = "";
			Game.Stats = {
				Progress: 0,
				Odometer: 0, ChaserOdometer: 0, TypoCount: 0,
				StartTime: 0, ElapsedTime: 0,
				KeystrokeCount: 0, KeystrokeSpeed: 0, AvgKeystrokeSpeed: 0,
				Accuracy: 0,
				Score: 0,
				Speed: 0, SpeedTrend: 0, AvgSpeed: 0, ChaserSpeed: 0, DangerousSpeed: 0,
				Altitude: 0,
				KeystrokeTimestamp: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				TypeTimestamp: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
			};
			Game0 = {
				Terrain: {
					WalkedWidth: 0,
					Generation: {
						Ahead: 1, Behind: 0
					}
				},
				Stats: {
					PreviousClockTime: 0, PreviousElapsedTime: 0,
					KeystrokeSpeedDisplay: 0,
					ScoreDisplay: 0,
					SpeedTapeDisplay: 0, PreviousSpeedTapeDisplay: 0, SpeedBalloonDisplay: [0, 0, 0, 0],
					SpeedTrendDisplay: 0, AvgSpeedDisplay: 0, ChaserSpeedDisplay: 0, DangerousSpeedDisplay: 0,
					AltitudeTapeDisplay: 0, AltitudeBalloonDisplay: [0, 0, 0, 0, 0]
				}
			};
			ChangeText("Ctnr_GameTerrain", "");
			ChangeValue("Textbox_Game", "");
			RefreshGame();
		}

	// Library
		// Library
		function FilterLibrary() {
			let Counter = 0, Counter2 = 0;
			for(let Looper = 1; Looper < Library.Text.length; Looper++) {
				if(Library.Text[Looper].Name.toLowerCase().includes(ReadValue("Textbox_LibraryFilter").toLowerCase()) == true ||
				Library.Text[Looper].Content.toLowerCase().includes(ReadValue("Textbox_LibraryFilter").toLowerCase()) == true ||
				Library.Text[Looper].Language.toLowerCase().includes(ReadValue("Textbox_LibraryFilter").toLowerCase()) == true ||
				Library.Text[Looper].Source.toLowerCase().includes(ReadValue("Textbox_LibraryFilter").toLowerCase()) == true) {
					Show("Ctrl_LibraryText" + Looper);
					Counter++;
				} else {
					Hide("Ctrl_LibraryText" + Looper);
				}
				Counter2++;
			}
			ChangeText("Label_LibraryItemCount", "显示 " + Counter + "/" + Counter2);
		}
		function SetText(Number) {
			Library.Selection = Number;
			ResetGame();
		}
		function DuplicateText(Number) {
			Library.Text.splice(Number + 1, 0, structuredClone(Library.Text[Number]));
			if(Library.Selection > Number) {
				Library.Selection++;
			}
			RefreshGame();
		}
		function ExportText(Number) {
			navigator.clipboard.writeText(JSON.stringify(Library.Text[Number]));
			if(System.DontShowAgain.includes("YamanoboRyou_Library_TextExported") == false) {
				ShowDialog("Library_TextExported",
					"Info",
					"已导出文本「" + Library.Text[Number].Name + "」至剪贴板。",
					"不再弹窗提示", "", "", "确定");
			} else {
				ShowToast("已导出文本");
			}
		}
		function ConfirmDeleteText(Number) {
			Interaction.Deletion = Number;
			ShowDialog("Library_ConfirmDeleteText",
				"Caution",
				"您确认要删除文本「" + ConvertEmptyName(Library.Text[Number].Name) + "」？",
				"", "", "删除", "取消");
		}
		function NewText() {
			Library.Text[Library.Text.length] = {
				Name: "",
				Content: "在此粘贴文本内容",
				Language: "",
				Source: ""
			};
			Library.Selection = Library.Text.length - 1;
			ResetGame();
		}
		function SortByName() {
			for(let Looper = 1; Looper < Library.Text.length - 1; Looper++) {
				for(let Looper2 = 1; Looper2 < Library.Text.length - 1; Looper2++) {
					if(Library.Text[Looper2].Name > Library.Text[Looper2 + 1].Name) {
						Library.Text[0] = structuredClone(Library.Text[Looper2]);
						Library.Text[Looper2] = structuredClone(Library.Text[Looper2 + 1]);
						Library.Text[Looper2 + 1] = structuredClone(Library.Text[0]);
						if(Library.Selection == Looper2) {
							Library.Selection++;
						}
					}
				}
			}
			Library.Text[0] = 0;
			ResetGame();
		}

		// Text properties
		function SetTextName() {
			Library.Text[Library.Selection].Name = ReadValue("Textbox_LibraryName");
			RefreshLibrary();
		}
		function SetTextContent() {
			if(ReadValue("Textbox_LibraryContent") != "") {
				Library.Text[Library.Selection].Content = ReadValue("Textbox_LibraryContent");
			} else {
				ShowDialog("Library_ContentCannotBeEmpty",
					"Error",
					"文本内容不能为空。",
					"", "", "", "确定");
			}
			ResetGame();
		}
		function SetTextLanguage() {
			Library.Text[Library.Selection].Language = ReadValue("Textbox_LibraryLanguage");
			ResetGame();
		}
		function SetTextSource() {
			Library.Text[Library.Selection].Source = ReadValue("Textbox_LibrarySource");
			RefreshLibrary();
		}

		// Management
		function ImportLibraryObjects() {
			let Objects = ReadValue("Textbox_LibraryImport").split("\n"), Counter = 0, Counter2 = 0;
			for(let Looper = 0; Looper < Objects.length; Looper++) {
				switch(true) {
					// Text
					case Objects[Looper].startsWith("{\"Name\":") == true:
						Library.Text[Library.Text.length] = JSON.parse(Objects[Looper]);
						Counter++;
						break;

					// Whole library
					case Objects[Looper].startsWith("{\"Selection\":") == true:
						Library = JSON.parse(Objects[Looper]);
						Counter++;
						break;
					
					// Empty line
					case Objects[Looper] == "":
						break;
					
					// Failed to import
					default:
						Counter2++;
						break;
				}
			}
			if(Counter > 0) {
				if(Counter2 <= 0) {
					ShowDialog("Library_ObjectsImported",
						"Info",
						"成功导入" + Counter + "个对象。",
						"", "", "", "确定");
				} else {
					ShowDialog("Library_ObjectsImported",
						"Info",
						"成功导入" + Counter + "个对象。" + Counter2 + "个对象的 JSON 字符串不合法，无法导入。",
						"", "", "", "确定");
				}
			} else {
				if(ReadValue("Textbox_LibraryImport") != "") {
					ShowDialog("Library_ImportFailed",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
				} else {
					ShowDialog("Library_ImportFailed",
						"Error",
						"文本框为空。请先在文本框键入要导入的对象，然后再点击「导入」。",
						"", "", "", "确定");
				}
			}
			ChangeValue("Textbox_LibraryImport", "");
			ResetGame();
		}
		function ExportLibrary() {
			navigator.clipboard.writeText(JSON.stringify(Library));
			ShowDialog("Library_LibraryExported",
				"Info",
				"已导出文库 (" + (Library.Text.length - 1) + "条文本) 至剪贴板。",
				"", "", "", "确定");
		}
		function ConfirmResetLibrary() {
			ShowDialog("Library_ConfirmResetLibrary",
				"Caution",
				"您确认要重置文库？",
				"", "", "重置", "取消");
		}

	// Settings
		// Progressing
		function SetProgressing(Value) {
			switch(Value) {
				case "Duration":
				case "TravelDistance":
				case "Altitude":
					Game.Progressing.Progressing = Value;
					RefreshGame();
					break;
				default:
					AlertSystemError("The value of Value \"" + Value + "\" in function SetProgressing is invalid.");
					break;
			}
		}
		function SetDuration() {
			Game.Progressing.Duration = parseInt(Number(ReadValue("Textbox_SettingsDuration"))); // Use parseInt(Number()) to force convert value to integer.
			if(Game.Progressing.Duration < 1) {
				Game.Progressing.Duration = 1;
			}
			if(Game.Progressing.Duration > 60) {
				Game.Progressing.Duration = 60;
			}
			RefreshGame();
		}
		function SetTravelDistance() {
			Game.Progressing.TravelDistance = parseInt(Number(ReadValue("Textbox_SettingsTravelDistance")));
			if(Game.Progressing.TravelDistance < 50) {
				Game.Progressing.TravelDistance = 50;
			}
			if(Game.Progressing.TravelDistance > 9999) {
				Game.Progressing.TravelDistance = 9999;
			}
			RefreshGame();
		}
		function SetAltitude() {
			Game.Progressing.Altitude = parseInt(Number(ReadValue("Textbox_SettingsAltitude")));
			if(Game.Progressing.Altitude < 200) {
				Game.Progressing.Altitude = 200;
			}
			if(Game.Progressing.Altitude > 29000) {
				Game.Progressing.Altitude = 29000;
			}
			RefreshGame();
		}

		// Difficulty
		function SetChaserSpeedInitial() {
			Game.Difficulty.ChaserSpeed.Initial = parseInt(Number(ReadValue("Textbox_SettingsChaserSpeedInitial")));
			if(Game.Difficulty.ChaserSpeed.Initial < 10) {
				Game.Difficulty.ChaserSpeed.Initial = 10;
			}
			if(Game.Difficulty.ChaserSpeed.Initial > 500) {
				Game.Difficulty.ChaserSpeed.Initial = 500;
			}
			if(Game.Difficulty.ChaserSpeed.Initial > Game.Difficulty.ChaserSpeed.Final) {
				Game.Difficulty.ChaserSpeed.Final = Game.Difficulty.ChaserSpeed.Initial;
			}
			if(Game.Difficulty.ChaserSpeed.Initial < Game.Difficulty.ChaserSpeed.Final - 100) {
				Game.Difficulty.ChaserSpeed.Final = Game.Difficulty.ChaserSpeed.Initial + 100;
			}
			RefreshGame();
		}
		function SetChaserSpeedFinal() {
			Game.Difficulty.ChaserSpeed.Final = parseInt(Number(ReadValue("Textbox_SettingsChaserSpeedFinal")));
			if(Game.Difficulty.ChaserSpeed.Final < 10) {
				Game.Difficulty.ChaserSpeed.Final = 10;
			}
			if(Game.Difficulty.ChaserSpeed.Final > 500) {
				Game.Difficulty.ChaserSpeed.Final = 500;
			}
			if(Game.Difficulty.ChaserSpeed.Final < Game.Difficulty.ChaserSpeed.Initial) {
				Game.Difficulty.ChaserSpeed.Initial = Game.Difficulty.ChaserSpeed.Final;
			}
			if(Game.Difficulty.ChaserSpeed.Final > Game.Difficulty.ChaserSpeed.Initial + 100) {
				Game.Difficulty.ChaserSpeed.Initial = Game.Difficulty.ChaserSpeed.Final - 100;
			}
			RefreshGame();
		}
		function SetChaserSpeedWestern() {
			Game.Difficulty.ChaserSpeed.Initial = 180;
			Game.Difficulty.ChaserSpeed.Final = 240;
			RefreshGame();
		}
		function SetChaserSpeedCJK() {
			Game.Difficulty.ChaserSpeed.Initial = 40;
			Game.Difficulty.ChaserSpeed.Final = 60;
			RefreshGame();
		}
		function SetChaserSpeedZenMode() {
			Game.Difficulty.ChaserSpeed.Initial = 10;
			Game.Difficulty.ChaserSpeed.Final = 10;
			RefreshGame();
		}
		function SetMaxSeparation() {
			Game.Difficulty.MaxSeparation = parseInt(Number(ReadValue("Textbox_SettingsMaxSeparation")));
			if(Game.Difficulty.MaxSeparation < 10) {
				Game.Difficulty.MaxSeparation = 10;
			}
			if(Game.Difficulty.MaxSeparation > 100) {
				Game.Difficulty.MaxSeparation = 100;
			}
			RefreshGame();
		}

		// Custom characters
		function SetPlayerImage() {
			Game.CustomCharacters.PlayerImage = ReadValue("Textbox_SettingsPlayerImage");
			RefreshGame();
		}
		function SetChaserImage() {
			Game.CustomCharacters.ChaserImage = ReadValue("Textbox_SettingsChaserImage");
			RefreshGame();
		}
		function SetBgImage() {
			Game.CustomCharacters.BgImage = ReadValue("Textbox_SettingsBgImage");
			RefreshGame();
		}
		function SwapCharacters() {
			let Swapper = Game.CustomCharacters.PlayerImage;
			Game.CustomCharacters.PlayerImage = Game.CustomCharacters.ChaserImage;
			Game.CustomCharacters.ChaserImage = Swapper;
			RefreshGame();
		}
		function ResetCustomCharacters() {
			Game.CustomCharacters = {
				PlayerImage: "", ChaserImage: "",
				BgImage: ""
			};
			RefreshGame();
		}

		// Display
		function SetGameFont() {
			Subsystem.Display.GameFont = ReadValue("Combobox_SettingsGameFont");
			RefreshSubsystem();
			ResetGame();
		}

		// User data
		function ImportUserData() {
			if(ReadValue("Textbox_SettingsUserDataImport") != "") {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\":{\"Display\":{\"Theme\":") == true) {
					let Objects = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Objects).forEach(function(ObjectName) {
						localStorage.setItem(ObjectName, JSON.stringify(Objects[ObjectName]));
					});
					ChangeCursorOverall("wait");
					window.location.reload();
				} else {
					ShowDialog("System_JSONStringInvalid",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
					RefreshSystem();
				}
			}
		}
		function ExportUserData() {
			navigator.clipboard.writeText("{" +
				"\"System\":" + JSON.stringify(System) + "," +
				"\"YamanoboRyou_Subsystem\":" + JSON.stringify(Subsystem) + "," +
				"\"YamanoboRyou_Game\":" + JSON.stringify(Game) + "," +
				"\"YamanoboRyou_Highscore\":" + JSON.stringify(Highscore) + "," +
				"\"YamanoboRyou_Library\":" + JSON.stringify(Library) +
				"}");
			ShowDialog("System_UserDataExported",
				"Info",
				"已导出用户数据至剪贴板。",
				"", "", "", "确定");
		}
		function ConfirmClearUserData() {
			ShowDialog("System_ConfirmClearUserData",
				"Caution",
				"您确认要清空用户数据？",
				"", "", "清空", "取消");
		}

	// Dialog
	function AnswerDialog(Selector) {
		switch(Interaction.DialogEvent) {
			case "System_LanguageUnsupported":
			case "System_MajorUpdateDetected":
			case "System_JSONStringInvalid":
			case "System_UserDataExported":
			case "Game_DoNotPaste":
			case "Library_ContentCannotBeEmpty":
			case "Library_ObjectsImported":
			case "Library_ImportFailed":
			case "Library_LibraryExported":
				switch(Selector) {
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "System_ConfirmClearUserData":
				switch(Selector) {
					case 2:
						localStorage.clear();
						ChangeCursorOverall("wait");
						window.location.reload();
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "System_Error":
				switch(Selector) {
					case 2:
						ScrollIntoView("Item_SettingsUserData");
						ShowIAmHere("Item_SettingsUserData");
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "Subsystem_ConfirmGoToTutorial":
				switch(Selector) {
					case 2:
						ScrollIntoView("Item_HelpTutorial");
						ShowIAmHere("Item_HelpTutorial");
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "Library_TextExported":
				switch(Selector) {
					case 3:
						if(IsChecked("Checkbox_DialogCheckboxOption") == true) {
							System.DontShowAgain[System.DontShowAgain.length] = "YamanoboRyou_Library_TextExported";
							setTimeout(RefreshSystem, 0);
						}
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "Library_ConfirmDeleteText":
				switch(Selector) {
					case 2:
						if(Library.Selection >= Interaction.Deletion) {
							Library.Selection--;
						}
						Library.Text.splice(Interaction.Deletion, 1);
						Interaction.Deletion = 0;
						setTimeout(ResetGame, 0);
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "Library_ConfirmResetLibrary":
				switch(Selector) {
					case 2:
						localStorage.removeItem("YamanoboRyou_Library");
						ChangeCursorOverall("wait");
						window.location.reload();
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			default:
				setTimeout(function() {
					AlertSystemError("The value of Interaction.DialogEvent \"" + Interaction.DialogEvent + "\" in function AnswerDialog is invalid.");
				}, 0);
				return;
		}
		HideDialog();
	}

// Listeners
	// On keyboard
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "F1") {
			if(Game.Status.IsRunning == true && Game.Status.IsPaused == false) { // Make sure the game is paused before showing the dialog.
				Game.Status.IsPaused = true;
				ChangeValue("Textbox_Game", "");
				RefreshGame();
			}
			ShowDialog("Subsystem_ConfirmGoToTutorial",
				"Question",
				"您按下了 F1 键。是否前往教程？",
				"", "", "前往", "取消");
			if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
				ShowHotkeyIndicators();
			}
		}
		if((document.activeElement.tagName.toLowerCase() != "input" && document.activeElement.tagName.toLowerCase() != "textarea") || // Prevent hotkey activation when inputing text etc.
			document.activeElement.id == "Textbox_Game") { // Except when typing in game.
			switch(Hotkey.key.toUpperCase()) {
				case "DELETE":
					Click("Cmdbtn_GamePauseOrReset");
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				default:
					if((System.Display.HotkeyIndicators == "ShowOnWrongKeyPress" && IsWrongKeyNegligible(Hotkey.key) == false && Hotkey.key != "F1") ||
					System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
			}
		}
	});

	// On resizing window
	window.addEventListener("resize", ClockGame);

// Automations
Automation.ClockGame = setInterval(ClockGame, 20);

// Features
	// Converters
	function ConvertEmptyName(Value) {
		if(Value != "") {
			return Value;
		} else {
			return "(未命名)";
		}
	}

// Error handling
function AlertSystemError(Message) {
	console.error("● 系统错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了系统错误。这可能是损坏了的用户数据导致的。是否前往用户数据？<br />" +
		"<br />" +
		"错误信息：" + Message,
		"", "", "前往", "取消");
}

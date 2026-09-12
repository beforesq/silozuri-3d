import { i as __toESM } from "../_runtime.mjs";
import { a as useThree, c as CanvasTexture, d as RepeatWrapping, f as SRGBColorSpace, g as require_react, h as require_jsx_runtime, i as useFrame, l as DynamicDrawUsage, n as Html, p as Vector3, r as Canvas, t as OrbitControls, u as Object3D } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as RotateCcw, c as Eye, i as SkipBack, l as EyeOff, o as Play, r as SkipForward, s as Pause, t as Video } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SimulationApp-CeZISnwt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RAW = [
	{
		id: "overview",
		kicker: "01",
		title: "Ansamblu silozuri",
		lead: "Cele 12 silozuri de ciment ale fabricii.",
		detail: "Silozurile 5 și 7 sunt modelate complet — con de extracție, extractor cu două axe și rigolă. Restul rămân în context, cu opacitate redusă, ca să nu deranjeze lectura.",
		duration: 7.2,
		camera: {
			position: [
				16,
				24,
				54
			],
			target: [
				0,
				9,
				0
			]
		}
	},
	{
		id: "focus",
		kicker: "02",
		title: "Zona de lucru",
		lead: "Extracția se întâmplă sub cota terenului.",
		detail: "La nivelul solului, în siloz, materialul este încă brut. Sub pământ: conul, poarta glisantă, placa pătrată, extractorul și rigola către însăcuire / vrac.",
		duration: 6.4,
		camera: {
			position: [
				3,
				11.5,
				27
			],
			target: [
				0,
				5.5,
				6
			]
		}
	},
	{
		id: "interior",
		kicker: "03",
		title: "Interior siloz",
		lead: "Pe terminate, crusta de pe pereți se desprinde.",
		detail: "Cimentul fin curge. Plăcile dure lipite de perete și bolovanii de la fund nu se mai macină — ajung ca un capac în extractor.",
		duration: 8,
		camera: {
			position: [
				.2,
				11.2,
				18.5
			],
			target: [
				0,
				8.6,
				6.1
			]
		}
	},
	{
		id: "extraction",
		kicker: "04",
		title: "Extracție subterană",
		lead: "Secțiune prin teren — camera de sub siloz.",
		detail: "Poarta glisantă stă orizontal, acționată de volant, pentru mentenanță. Sub ea: extractor cu două axe dințate. Pe placa pătrată montăm tunurile de aer.",
		duration: 8.2,
		camera: {
			position: [
				2.4,
				-.2,
				16.2
			],
			target: [
				0,
				-3.5,
				6.1
			]
		}
	},
	{
		id: "flow",
		kicker: "05",
		title: "Flux normal",
		lead: "Cimentul fin trece, extractorul toacă, rigola transportă.",
		detail: "Cât materialul rămâne pulverulent, linia de însăcuire și instalațiile de vrac sunt alimentate continuu. Nu există timp mort.",
		duration: 9,
		camera: {
			position: [
				1.1,
				-1.05,
				14.2
			],
			target: [
				0,
				-3.7,
				6.1
			]
		}
	},
	{
		id: "blockage",
		kicker: "06",
		title: "Formarea blocajului",
		lead: "Bolovanii fac capac pe extractor. Rigola rămâne goală.",
		detail: "Fluxul spre stațiile de vrac și mașinile de însăcuit se oprește. Blocajul nu e opțional — este oprirea liniei.",
		duration: 11.2,
		camera: {
			position: [
				.4,
				-1.45,
				13.2
			],
			target: [
				0,
				-3.15,
				6.1
			]
		}
	},
	{
		id: "temporary",
		kicker: "07",
		title: "Soluție temporară",
		lead: "Tijă cu aer prin tubul roșu de vizitare.",
		detail: "Merge, dar greu: prezență fizică în subteran, risc, rezultate parțiale. Capacul se reface. Nu este o soluție de flux continuu.",
		duration: 9,
		camera: {
			position: [
				8.4,
				-1.55,
				13
			],
			target: [
				6.5,
				-2.35,
				7
			]
		}
	},
	{
		id: "cannons",
		kicker: "08",
		title: "Tunuri de aer AGICO",
		lead: "KQP, montate pe placa extractorului, trag în sus.",
		detail: "Unda de șoc (0.4–0.8 MPa) rupe capacul, fluidizează crusta și repornește curgerea. Acționare din camera de comandă sau pe senzor de presiune — fără oameni în groapă.",
		duration: 12.4,
		camera: {
			position: [
				.2,
				-.55,
				14.8
			],
			target: [
				0,
				-2.7,
				6.1
			]
		}
	},
	{
		id: "restored",
		kicker: "09",
		title: "Flux restabilit",
		lead: "Curgere continuă. Timpii morți dispar.",
		detail: "Personalul iese din intervenții repetitive în zona subterană. Linia de însăcuire și vracul rămân alimentate. Continuitate operațională — critic, nu opțional.",
		duration: 8,
		camera: {
			position: [
				13,
				7.2,
				24
			],
			target: [
				0,
				1.4,
				6
			]
		}
	}
];
var CHAPTERS = (() => {
	let t = 0;
	return RAW.map((c) => {
		const start = t;
		t += c.duration;
		return {
			...c,
			start
		};
	});
})();
var TOTAL_TIME = CHAPTERS[CHAPTERS.length - 1].start + CHAPTERS[CHAPTERS.length - 1].duration;
function chapterIndexAt(time) {
	const t = Math.max(0, Math.min(time, TOTAL_TIME - .001));
	for (let i = CHAPTERS.length - 1; i >= 0; i--) if (t >= CHAPTERS[i].start) return i;
	return 0;
}
function chapterAt(time) {
	return CHAPTERS[chapterIndexAt(time)];
}
function chapterProgress(time) {
	const c = chapterAt(time);
	return Math.max(0, Math.min(1, (time - c.start) / c.duration));
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function smoothstep(t) {
	const x = Math.max(0, Math.min(1, t));
	return x * x * (3 - 2 * x);
}
function cameraShotAt(time) {
	const i = chapterIndexAt(time);
	const a = CHAPTERS[i];
	const b = CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)];
	const local = time - a.start;
	const window = Math.min(1.85, a.duration * .34);
	const t = a === b ? 0 : smoothstep((local - (a.duration - window)) / window);
	const bulge = Math.sin(t * Math.PI) * 5.5;
	const position = [
		lerp(a.camera.position[0], b.camera.position[0], t),
		lerp(a.camera.position[1], b.camera.position[1], t),
		lerp(a.camera.position[2], b.camera.position[2], t) + bulge
	];
	position[2] = Math.max(position[2], 12.05);
	return {
		position,
		target: [
			lerp(a.camera.target[0], b.camera.target[0], t),
			lerp(a.camera.target[1], b.camera.target[1], t),
			lerp(a.camera.target[2], b.camera.target[2], t)
		]
	};
}
function envAt(time) {
	const ch = chapterAt(time);
	const p = chapterProgress(time);
	const id = ch.id;
	let jam = 0;
	let flow = 0;
	let lance = 0;
	let cannon = 0;
	let cutaway = 0;
	let siloGhost = 0;
	let detach = 0;
	if (id === "overview") {
		flow = .08;
		cutaway = 0;
	} else if (id === "focus") {
		flow = .12;
		cutaway = p * .35;
	} else if (id === "interior") {
		flow = .22;
		cutaway = .55 + p * .45;
		detach = p * .15;
	} else if (id === "extraction") {
		flow = .45;
		cutaway = 1;
		siloGhost = .55 + p * .25;
	} else if (id === "flow") {
		flow = 1;
		cutaway = 1;
		siloGhost = .72;
	} else if (id === "blockage") {
		cutaway = 1;
		siloGhost = .7;
		detach = Math.min(1, p * 1.6);
		jam = smoothstep((p - .18) / .45);
		flow = 1 - jam * .95;
	} else if (id === "temporary") {
		cutaway = 1;
		siloGhost = .68;
		detach = 1;
		jam = .78;
		const pulse = Math.max(0, Math.sin(p * Math.PI * 6.2));
		lance = .42 + pulse * pulse * .58;
		flow = .12 + lance * .28;
	} else if (id === "cannons") {
		cutaway = 1;
		siloGhost = .62;
		detach = 1;
		const beat = p * 4.15;
		const pulse = Math.max(0, Math.sin(beat * Math.PI));
		cannon = pulse * pulse;
		jam = Math.max(0, .9 - p * 1.15) * (1 - cannon * .85);
		flow = Math.min(1, p * 1.2 + cannon * .45);
	} else {
		cutaway = .85;
		siloGhost = .25;
		flow = 1;
		jam = 0;
		detach = .08;
	}
	return {
		jam,
		flow,
		lance,
		cannon,
		cutaway,
		siloGhost,
		detach
	};
}
var useSimStore = create((set, get) => ({
	started: false,
	playing: false,
	time: 0,
	cameraMode: "cinematic",
	labels: true,
	start: () => set({
		started: true,
		playing: true,
		time: 0,
		cameraMode: "cinematic"
	}),
	togglePlay: () => {
		const { started, playing, time } = get();
		if (!started) {
			set({
				started: true,
				playing: true,
				cameraMode: "cinematic"
			});
			return;
		}
		if (!playing && time >= TOTAL_TIME - .05) {
			set({
				playing: true,
				time: 0,
				cameraMode: "cinematic"
			});
			return;
		}
		set({ playing: !playing });
	},
	setPlaying: (v) => set({ playing: v }),
	seek: (t) => {
		const time = Math.max(0, Math.min(TOTAL_TIME, t));
		set({
			time,
			started: true,
			playing: time < TOTAL_TIME - .02
		});
	},
	goToChapter: (index) => {
		set({
			started: true,
			time: CHAPTERS[Math.max(0, Math.min(CHAPTERS.length - 1, index))].start + .12,
			playing: true,
			cameraMode: "cinematic"
		});
	},
	setCameraMode: (cameraMode) => set({ cameraMode }),
	recinema: () => set({ cameraMode: "cinematic" }),
	setLabels: (labels) => set({ labels }),
	tick: (dt) => {
		const { playing, time } = get();
		if (!playing) return;
		const next = time + dt;
		if (next >= TOTAL_TIME) {
			set({
				time: TOTAL_TIME,
				playing: false
			});
			return;
		}
		set({ time: next });
	}
}));
function CameraRig() {
	const camera = useThree((s) => s.camera);
	const pos = (0, import_react.useRef)(new Vector3(16, 24, 54));
	const look = (0, import_react.useRef)(new Vector3(0, 9, 0));
	const tmpP = (0, import_react.useRef)(new Vector3());
	const tmpT = (0, import_react.useRef)(new Vector3());
	(0, import_react.useEffect)(() => {
		camera.near = .15;
		camera.far = 420;
		camera.updateProjectionMatrix();
	}, [camera]);
	useFrame((state, delta) => {
		const d = Math.min(delta, .08);
		const { cameraMode, time } = useSimStore.getState();
		const shot = cameraShotAt(time);
		tmpP.current.set(...shot.position);
		tmpT.current.set(...shot.target);
		const controls = state.controls;
		if (cameraMode === "cinematic") {
			if (controls) controls.enabled = false;
			const k = 1 - Math.exp(-d * 2.15);
			pos.current.lerp(tmpP.current, k);
			look.current.lerp(tmpT.current, k);
			camera.position.copy(pos.current);
			camera.lookAt(look.current);
			if (controls) {
				controls.target.copy(look.current);
				controls.update();
			}
		} else if (controls) {
			controls.enabled = true;
			pos.current.copy(camera.position);
			look.current.copy(controls.target);
		}
	});
	return null;
}
var SILO_R = 5.35;
var SILO_H = 27.5;
var PITCH_X = 13.05;
var FRONT_Z = 6.075;
var BACK_Z = -6.075;
var PIT_FLOOR = -6.65;
var PIT_FRONT = 12.4;
var PIT_BACK = -2.2;
var PIT_LEFT = -14.2;
var PIT_RIGHT = 14.2;
var OUTLET_Y = -1.28;
var EXTRACTOR_Y = -3.35;
var TROUGH_Y = -5.08;
var WORKING_IDS = [5, 7];
function colOf(id) {
	return (12 - (id % 2 === 0 ? id : id + 1)) / 2;
}
var SILOS = Array.from({ length: 12 }, (_, i) => {
	const id = 12 - i;
	const row = id % 2 === 0 ? "back" : "front";
	const col = colOf(id);
	return {
		id,
		col,
		row,
		x: (col - 2.5) * PITCH_X,
		z: row === "front" ? FRONT_Z : BACK_Z,
		working: WORKING_IDS.includes(id)
	};
});
var WORKING = SILOS.filter((s) => s.working);
Math.PI / 2 - .42;
Math.PI * 2 - .84;
var cache = /* @__PURE__ */ new Map();
function noise(x, y) {
	const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
	return s - Math.floor(s);
}
function make(key, size, draw) {
	const hit = cache.get(key);
	if (hit) return hit;
	const c = document.createElement("canvas");
	c.width = c.height = size;
	const ctx = c.getContext("2d");
	if (!ctx) throw new Error("canvas");
	draw(ctx, size);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 1;
	tex.wrapS = tex.wrapT = RepeatWrapping;
	tex.needsUpdate = true;
	cache.set(key, tex);
	return tex;
}
function soilTex() {
	return make("soil", 512, (ctx, s) => {
		const g = ctx.createLinearGradient(0, 0, 0, s);
		g.addColorStop(0, "#6a5a3a");
		g.addColorStop(.18, "#5a4a32");
		g.addColorStop(.45, "#4a3a28");
		g.addColorStop(.72, "#3a2c20");
		g.addColorStop(1, "#2c2218");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, s, s);
		for (let i = 0; i < 2800; i++) {
			const x = noise(i, 21) * s;
			const y = noise(i, 22) * s;
			const r = 70 + noise(i, 23) * 50;
			ctx.fillStyle = `rgba(${r},${r * .72},${r * .45},${.1 + noise(i, 24) * .2})`;
			ctx.fillRect(x, y, 2, 2);
		}
		for (let y = 0; y < s; y += 28) {
			ctx.fillStyle = `rgba(20,14,8,0.12)`;
			ctx.fillRect(0, y + noise(y, 3) * 6, s, 3);
		}
	});
}
function rustTex() {
	return make("rust", 256, (ctx, s) => {
		ctx.fillStyle = "#6d7178";
		ctx.fillRect(0, 0, s, s);
		for (let i = 0; i < 900; i++) {
			ctx.fillStyle = `rgba(${90 + noise(i, 1) * 80},${70 + noise(i, 2) * 40},50,0.12)`;
			ctx.fillRect(noise(i, 3) * s, noise(i, 4) * s, 3, 2);
		}
	});
}
function gravelTex() {
	return make("gravel", 512, (ctx, s) => {
		ctx.fillStyle = "#7a756c";
		ctx.fillRect(0, 0, s, s);
		for (let i = 0; i < 3600; i++) {
			const g = 90 + noise(i, 5) * 80;
			ctx.fillStyle = `rgb(${g},${g - 6},${g - 14})`;
			ctx.beginPath();
			ctx.arc(noise(i, 6) * s, noise(i, 7) * s, 1 + noise(i, 8) * 2.2, 0, Math.PI * 2);
			ctx.fill();
		}
	});
}
function Shaft({ localZ, dir, spinning }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (ref.current && spinning) ref.current.rotation.x += dir * 2.35 * Math.min(dt, .05);
	});
	const teeth = (0, import_react.useMemo)(() => Array.from({ length: 9 }, (_, i) => i), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: [
			0,
			0,
			localZ
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.16,
				.16,
				2.35,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3e444c",
				metalness: .55,
				roughness: .38
			})]
		}), teeth.map((i) => {
			const a = i / 9 * Math.PI * 2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					Math.cos(a) * .28,
					Math.sin(a) * .28
				],
				rotation: [
					a,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.05,
					.12,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2c3138",
					metalness: .45,
					roughness: .42
				})]
			}, i);
		})]
	});
}
/** AGICO KQP — mounted on the square plate, firing UP into the hopper cap. */
function AirCannon({ side, pulse }) {
	const tank = (0, import_react.useRef)(null);
	useFrame(() => {
		if (tank.current) tank.current.position.y = -pulse * .05;
	});
	const x = side * .72;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			OUTLET_Y + .08,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: tank,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .72,
						-.02,
						.38
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.26,
						.26,
						.95,
						20
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#c0392b",
						metalness: .35,
						roughness: .4,
						emissive: "#ff6a3d",
						emissiveIntensity: pulse * 1.8
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * 1.2,
						-.02,
						.38
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.26,
						14,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#a93226",
						metalness: .4,
						roughness: .38
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .24,
						-.02,
						.38
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.26,
						14,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#a93226",
						metalness: .4,
						roughness: .38
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .18,
						.12,
						.38
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.22,
						.28,
						.28
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2f343c",
						metalness: .5,
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .08,
						.38,
						.12
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.075,
						.075,
						.72,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#5c6370",
						metalness: .5,
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .08,
						.74,
						.12
					],
					rotation: [
						0,
						0,
						-side * .35
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.06,
						.09,
						.28,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#4a5058",
						metalness: .5,
						roughness: .35
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * .08,
						.18,
						.12
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.16,
						.16,
						.06,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#6a7078",
						metalness: .45,
						roughness: .4
					})]
				})
			]
		}), pulse > .05 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				side * .06,
				1.15 + pulse * .35,
				.08
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.28 + pulse * .95,
				14,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#f4e2c2",
				transparent: true,
				opacity: .28 * pulse,
				depthWrite: false
			})]
		})]
	});
}
function Handwheel({ radius = .28 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			radius,
			.032,
			8,
			18
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#2e333a",
			metalness: .55,
			roughness: .35
		})] }),
		[
			0,
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				0,
				i * Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				radius * 1.85,
				.035,
				.035
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3e444c",
				metalness: .5,
				roughness: .35
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			.045,
			.045,
			.08,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#4a5058",
			metalness: .5,
			roughness: .35
		})] })
	] });
}
function Unit({ silo, env }) {
	const rust = (0, import_react.useMemo)(() => rustTex(), []);
	const spinning = env.flow > .2;
	const showLabels = useSimStore((s) => s.labels) && env.cutaway > .6;
	const showRod = env.lance > .04 || env.jam > .5 && env.cannon < .25;
	const insert = showRod ? .55 + env.lance * .7 : 0;
	const glass = {
		color: "#b7c2cc",
		metalness: .12,
		roughness: .18,
		transparent: true,
		opacity: .22,
		side: 2,
		depthWrite: false
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			silo.x,
			0,
			silo.z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					OUTLET_Y + .22,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.7,
					.14,
					1.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#8d9096",
					metalness: .4,
					roughness: .45,
					map: rust
				})]
			}),
			[-.68, .68].flatMap((x) => [-.68, .68].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					OUTLET_Y + .32,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.045,
					.045,
					.12,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cfd3d8",
					metalness: .6,
					roughness: .3
				})]
			}, `${x}${z}`))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					OUTLET_Y + .62,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.42,
					.55,
					.7,
					16,
					1,
					true
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#9aa0a8",
					metalness: .3,
					roughness: .5,
					side: 2,
					transparent: true,
					opacity: .45
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					OUTLET_Y - .08,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.95,
						.2,
						1.28
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#5b616a",
						metalness: .35,
						roughness: .5
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.18,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.28,
							.07,
							1.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#3d434c",
							metalness: .45,
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-1.45,
							0,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.038,
							.038,
							1.85,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#6a7180",
							metalness: .5,
							roughness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.62,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.22,
							.16,
							.16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#4a5058",
							metalness: .4,
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							-2.38,
							0,
							0
						],
						rotation: [
							0,
							Math.PI / 2,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handwheel, { radius: .3 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					EXTRACTOR_Y,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.78,
							.05
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.55,
							.1,
							1.45
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#6c7078",
							metalness: .2,
							roughness: .6
						})]
					}),
					[-1.26, 1.26].flatMap((x) => [-.66, .66].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							0,
							z
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							1.58,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#7a7e85",
							metalness: .28,
							roughness: .5
						})]
					}, `${x}-${z}`))),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							-.68
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.55,
							.1,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#7a7e85",
							metalness: .28,
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.72
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.42,
							1.48,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...glass })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							-.62
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.42,
							1.48,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...glass })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-1.22,
							0,
							.05
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							1.48,
							1.32
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...glass })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							1.22,
							0,
							.05
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							1.48,
							1.32
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...glass })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.82,
							.05
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.05,
							.06,
							.85
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#5c6168",
							metalness: .3,
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shaft, {
						localZ: -.22,
						dir: 1,
						spinning
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shaft, {
						localZ: .28,
						dir: -1,
						spinning
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.58,
					OUTLET_Y + .02,
					.92
				],
				rotation: [
					.7,
					.08,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.16,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.12,
							.175,
							.42,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#c0392b",
							metalness: .2,
							roughness: .45,
							emissive: "#7a1f14",
							emissiveIntensity: .35 + env.lance * 1.4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.38,
							0
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.2,
							.2,
							.05,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#8a2a22",
							metalness: .3,
							roughness: .45
						})]
					}),
					showRod && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.2 - insert * .85,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.042,
								.042,
								2.35,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#c5ccd4",
								metalness: .72,
								roughness: .22
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								1.22,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.38,
								8
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#2c3138",
								metalness: .4,
								roughness: .45
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								1.22,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.07,
								10,
								8
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#3a4048",
								metalness: .4,
								roughness: .4
							})]
						}),
						env.lance > .12 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-1.05 - env.lance * .15,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.16 + env.lance * .42,
								12,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								color: "#f0e0c0",
								transparent: true,
								opacity: .32 * env.lance,
								depthWrite: false
							})]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirCannon, {
				side: -1,
				pulse: env.cannon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirCannon, {
				side: 1,
				pulse: env.cannon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					EXTRACTOR_Y - 1.05,
					.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.1,
					.45,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6e737c",
					metalness: .25,
					roughness: .55
				})]
			}),
			showLabels && silo.id === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
					position: [
						0,
						-3.2,
						1.35
					],
					center: true,
					distanceFactor: 18,
					occlude: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase",
						children: "Extractor 2 axe"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
					position: [
						1.55,
						-.73,
						.55
					],
					center: true,
					distanceFactor: 18,
					occlude: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-moss uppercase",
						children: "Tun KQP"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
					position: [
						-2.2,
						-.93,
						.2
					],
					center: true,
					distanceFactor: 18,
					occlude: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase",
						children: "Shiber orizontal"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
					position: [
						.95,
						-1.28 + .15,
						1.55
					],
					center: true,
					distanceFactor: 18,
					occlude: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none rounded-sm bg-danger/90 px-2 py-1 font-display text-[11px] tracking-[0.12em] text-paper uppercase",
						children: "Tijă + tub vizitare"
					})
				})
			] })
		]
	});
}
function Trough({ env }) {
	const labels = useSimStore((s) => s.labels);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			TROUGH_Y,
			FRONT_Z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					28,
					.08,
					.85
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6d727a",
					metalness: .3,
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					-.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					28,
					.55,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7a8088",
					metalness: .25,
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					28,
					.55,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7a8088",
					metalness: .25,
					roughness: .5,
					transparent: true,
					opacity: .35
				})]
			}),
			env.flow > .55 && env.jam < .5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.16,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					26,
					.14,
					.48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d5c7ad",
					roughness: 1
				})]
			}),
			labels && env.cutaway > .6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					.7,
					.6
				],
				center: true,
				distanceFactor: 20,
				occlude: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase",
					children: "Rigolă"
				})
			})
		]
	});
}
function Extraction() {
	const env = envAt(useSimStore((s) => s.time));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [WORKING.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unit, {
		silo: s,
		env
	}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trough, { env })] });
}
var dummy = new Object3D();
function rand(i, k) {
	const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
	return s - Math.floor(s);
}
var SILO_POS = [WORKING.find((s) => s.id === 7), WORKING.find((s) => s.id === 5)];
function pathFine(i, t, env) {
	const silo = SILO_POS[i % 2];
	const cx = silo.x;
	const cz = silo.z;
	const seed = rand(i, 1);
	const seed2 = rand(i, 2);
	const seed3 = rand(i, 3);
	let u = (t * (.07 + seed * .055) * (.25 + env.flow * .9) + seed) % 1;
	if (env.jam > .55 && u > .5) u = .5 + seed2 * .045 + Math.sin(t * 7 + i) * .008 * env.lance;
	if (env.cannon > .4 && u > .42 && u < .62) u = Math.min(.95, u + env.cannon * .22);
	const a = seed * Math.PI * 2;
	const spin = t * .15 + seed3 * 6;
	let x = cx;
	let y = 12;
	let z = cz;
	let s = .055 + seed2 * .055;
	if (u < .28) {
		const k = u / .28;
		const r = (.4 + (1 - k) * 3.6) * (.55 + seed2 * .45);
		x = cx + Math.cos(a + spin * .2) * r;
		z = cz + Math.sin(a + spin * .2) * r;
		y = 5 + k * 12 + Math.sin(spin) * .3;
	} else if (u < .48) {
		const k = (u - .28) / .2;
		const r = (1 - k) * 3.2 * (.3 + seed * .5);
		x = cx + Math.cos(a) * r;
		z = cz + Math.sin(a) * r * .85;
		y = 16 - k * (16 - OUTLET_Y - .35);
	} else if (u < .56) {
		const k = (u - .48) / .08;
		const jamLift = env.jam * (.35 + seed * .4);
		x = cx + (seed - .5) * .45;
		z = cz + (seed2 - .5) * .45;
		y = OUTLET_Y - k * .7 + jamLift;
		if (env.jam > .7) s *= .9;
	} else if (u < .7) {
		const k = (u - .56) / .14;
		x = cx + Math.sin(k * 8 + i) * .18;
		z = cz + (k - .5) * .15;
		y = EXTRACTOR_Y + .35 - k * 1.35;
	} else {
		const k = (u - .7) / .3;
		x = cx + (silo.id === 7 ? 1 : -1) * k * 9.5;
		y = TROUGH_Y + .22 + Math.sin(k * 10 + i) * .04;
		z = cz + (FRONT_Z - cz) * 0 + (seed3 - .5) * .22;
		if (k > .92) s *= Math.max(0, 1 - (k - .92) / .08);
	}
	if (env.flow < .1 && u > .3) {
		const r = (.4 + (1 - (.28 + seed * .08) / .28) * 3.6) * .7;
		x = cx + Math.cos(a) * r;
		z = cz + Math.sin(a) * r;
		y = 8 + seed2 * 6;
	}
	const alive = env.flow > .04 || u < .35;
	return {
		x,
		y,
		z,
		s: alive ? s : 0,
		alive
	};
}
function boulderPos(i, t, env) {
	const silo = SILO_POS[i % 2];
	const cx = silo.x;
	const cz = silo.z;
	const n = Math.floor(i / 2);
	const seed = rand(i, 9);
	const seed2 = rand(i, 10);
	const ang = n / 18 * Math.PI * 2 + seed * .4;
	const wallY = 7.5 + n % 12 * 1.05 + seed2 * .5;
	const wallR = SILO_R - .38;
	const wallX = cx + Math.cos(ang) * wallR;
	const wallZ = cz + Math.sin(ang) * wallR * .92;
	const detachAt = n % 18 / 18;
	const fallen = env.detach > detachAt + .04;
	const jamAng = n * 2.31 + seed;
	const jamR = .12 + n % 6 * .1;
	const jamX = cx + Math.cos(jamAng) * jamR;
	const jamZ = cz + Math.sin(jamAng) * jamR;
	const jamY = OUTLET_Y + .22 + Math.floor(n / 7) * .32 + seed2 * .08;
	const size = .28 + seed * .32;
	if (!fallen) return {
		x: wallX,
		y: wallY,
		z: wallZ,
		s: size * (.55 + env.detach * .5)
	};
	const fallK = Math.min(1, (env.detach - detachAt) / .28);
	const ease = fallK * fallK * (3 - 2 * fallK);
	let x = wallX + (jamX - wallX) * ease;
	let y = wallY + (jamY - wallY) * ease + Math.sin(ease * Math.PI) * 1.8;
	let z = wallZ + (jamZ - wallZ) * ease;
	let s = size;
	if (env.lance > .2 && env.jam > .4) {
		const wiggle = env.lance * .22;
		x += Math.sin(t * 18 + i) * wiggle;
		z += .35 * env.lance;
		y += Math.abs(Math.sin(t * 11 + i)) * .15 * env.lance;
	}
	if (env.cannon > .15) {
		const kick = env.cannon;
		const outward = .4 + seed * .8;
		x += Math.cos(jamAng) * outward * kick;
		z += Math.sin(jamAng) * outward * kick;
		y += kick * (1.1 + seed2 * 1.4);
		s *= 1 - kick * .25;
	}
	if (env.jam < .25 && fallen && env.flow > .55) {
		const k = 1 - env.jam;
		const dir = silo.id === 7 ? 1 : -1;
		y = jamY * (1 - k) + (TROUGH_Y + .3) * k;
		x = jamX + dir * k * 4.5;
		z = jamZ * (1 - k) + cz * k;
		if (k > .7) s *= Math.max(0, 1 - (k - .7) / .3);
	}
	if (env.detach < .02) return {
		x: wallX,
		y: wallY,
		z: wallZ,
		s: size * .7
	};
	return {
		x,
		y,
		z,
		s
	};
}
function writeFines(mesh, time) {
	const env = envAt(time);
	for (let i = 0; i < 160; i++) {
		const p = pathFine(i, time, env);
		dummy.position.set(p.x, p.y, p.z);
		dummy.scale.setScalar(p.s);
		dummy.rotation.set(0, rand(i, 4) * 6, 0);
		dummy.updateMatrix();
		mesh.setMatrixAt(i, dummy.matrix);
	}
	mesh.instanceMatrix.needsUpdate = true;
}
function writeBoulders(mesh, time) {
	const env = envAt(time);
	for (let i = 0; i < 22; i++) {
		const p = boulderPos(i, time, env);
		dummy.position.set(p.x, p.y, p.z);
		dummy.scale.set(p.s * (.85 + rand(i, 11) * .4), p.s, p.s * (.75 + rand(i, 12) * .5));
		dummy.rotation.set(rand(i, 13) * 6, rand(i, 14) * 6, rand(i, 15) * 6);
		dummy.updateMatrix();
		mesh.setMatrixAt(i, dummy.matrix);
	}
	mesh.instanceMatrix.needsUpdate = true;
}
function prepInstanced(mesh) {
	mesh.frustumCulled = false;
	mesh.instanceMatrix.setUsage(DynamicDrawUsage);
}
function Flow() {
	const fines = (0, import_react.useRef)(null);
	const boulders = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (fines.current) prepInstanced(fines.current);
		if (boulders.current) prepInstanced(boulders.current);
	}, []);
	useFrame(() => {
		const t = useSimStore.getState().time;
		if (fines.current) writeFines(fines.current, t);
		if (boulders.current) writeBoulders(boulders.current, t);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: fines,
		args: [
			void 0,
			void 0,
			160
		],
		frustumCulled: false,
		castShadow: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			5,
			4
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e2d3b8" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: boulders,
		args: [
			void 0,
			void 0,
			22
		],
		frustumCulled: false,
		castShadow: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#6a5340" })]
	})] });
}
var YARD = 160;
var TRENCH_END = 48;
function Pit() {
	const soil = (0, import_react.useMemo)(() => {
		const t = soilTex().clone();
		t.repeat.set(2, 2);
		return t;
	}, []);
	const gravel = (0, import_react.useMemo)(() => {
		const t = gravelTex().clone();
		t.repeat.set(22, 22);
		return t;
	}, []);
	const w = PIT_RIGHT - PIT_LEFT;
	const trenchDepth = TRENCH_END - PIT_BACK;
	const h = -PIT_FLOOR;
	const midZ = (TRENCH_END + PIT_BACK) / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				PIT_LEFT - 50,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [100, YARD] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: gravel,
				color: "#8a8478",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				PIT_RIGHT + 50,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [100, YARD] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: gravel,
				color: "#8a8478",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				PIT_BACK - 40
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w + 2, 80] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: gravel,
				color: "#8a8478",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				PIT_LEFT,
				PIT_FLOOR / 2,
				midZ
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.95,
				h,
				trenchDepth
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: soil,
				color: "#5a4a32",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				PIT_RIGHT,
				PIT_FLOOR / 2,
				midZ
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.95,
				h,
				trenchDepth
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: soil,
				color: "#5a4a32",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				PIT_FLOOR / 2,
				PIT_BACK
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w,
				h,
				.95
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: soil,
				color: "#4e3f2c",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				PIT_LEFT,
				.08,
				midZ
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.4,
				.16,
				trenchDepth + .6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4d6a38",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				PIT_RIGHT,
				.08,
				midZ
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.4,
				.16,
				trenchDepth + .6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4d6a38",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.08,
				PIT_BACK
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w + 1.4,
				.16,
				1.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4d6a38",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.04,
				PIT_FRONT
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w + .6,
				.07,
				.07
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#dce8c8",
				emissive: "#7cb518",
				emissiveIntensity: .28
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				PIT_FLOOR + .08,
				(PIT_FRONT + PIT_BACK) / 2
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w - 1.2,
				.16,
				PIT_FRONT - PIT_BACK - .6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8f8c86",
				roughness: .88
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				PIT_FLOOR / 2,
				PIT_BACK + .55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w - 1.4,
				h - .2,
				.22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9a9790",
				roughness: .85
			})]
		}),
		[
			-10,
			0,
			10
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				PIT_FLOOR / 2,
				PIT_BACK + 1.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				h,
				.7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9c9890",
				roughness: .9
			})]
		}, x)),
		WORKING.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				s.x,
				PIT_FLOOR + .2,
				s.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				SILO_R + .6,
				SILO_R + .8,
				.28,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7d7a74",
				roughness: .9
			})]
		}, `pad-${s.id}`))
	] });
}
function Silos() {
	const env = envAt(useSimStore((s) => s.time));
	const cut = env.cutaway > .4;
	const ghost = env.siloGhost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: SILOS.map((silo) => {
		const isWork = silo.working;
		const opacity = isWork ? 1 - ghost * .5 : .28;
		const segments = isWork ? 16 : 10;
		const thetaStart = isWork && cut ? Math.PI * .35 : 0;
		const thetaLength = isWork && cut ? Math.PI * 1.3 : Math.PI * 2;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				silo.x,
				0,
				silo.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					SILO_H / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					SILO_R,
					SILO_R,
					SILO_H,
					segments,
					1,
					false,
					thetaStart,
					thetaLength
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: isWork ? "#c9c6bf" : "#8a8680",
					transparent: opacity < .95,
					opacity,
					depthWrite: opacity > .5
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					SILO_H + .25,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					SILO_R + .1,
					SILO_R - .3,
					.5,
					10,
					1,
					false,
					thetaStart,
					thetaLength
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#8e949c",
					transparent: opacity < .95,
					opacity
				})]
			})]
		}, silo.id);
	}) });
}
function Gantry() {
	const xs = SILOS.filter((s) => s.row === "back").map((s) => s.x);
	const minX = Math.min(...xs) - 4;
	const maxX = Math.max(...xs) + 4;
	const z = SILOS.find((s) => s.row === "back").z;
	const len = maxX - minX;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			(minX + maxX) / 2,
			29.2,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			len,
			.45,
			2.4
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#8b929a",
			metalness: .4,
			roughness: .45
		})]
	}) });
}
function World() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#8fb7d6",
				80,
				240
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .72 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d7e6f5",
			"#6a6458",
			.45
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				30,
				48,
				22
			],
			intensity: 1.55,
			color: "#fff3dd"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				-1.6,
				10
			],
			intensity: 38,
			distance: 24,
			color: "#f2ead8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pit, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Silos, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gantry, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extraction, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flow, {})
	] });
}
function Canvas3D() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: "h-full w-full",
		dpr: [1, 1.25],
		frameloop: "always",
		gl: {
			antialias: false,
			alpha: false,
			powerPreference: "high-performance",
			failIfMajorPerformanceCaveat: false,
			stencil: false,
			depth: true
		},
		onCreated: ({ gl }) => {
			gl.toneMapping = 4;
			gl.toneMappingExposure = 1.05;
			gl.shadowMap.enabled = false;
			const canvas = gl.domElement;
			const onLost = (e) => {
				e.preventDefault();
				console.warn("[WebGL] Context Lost – attempting recovery...");
				useSimStore.getState().setPlaying(false);
			};
			const onRestored = () => {
				gl.setSize(canvas.clientWidth, canvas.clientHeight, false);
			};
			canvas.addEventListener("webglcontextlost", onLost, false);
			canvas.addEventListener("webglcontextrestored", onRestored, false);
		},
		camera: {
			position: [
				16,
				24,
				54
			],
			fov: 40,
			near: .15,
			far: 420
		},
		onPointerDown: () => useSimStore.getState().setCameraMode("manual"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
				attach: "background",
				args: ["#8fb7d6"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				enableDamping: true,
				dampingFactor: .08,
				minDistance: 4.5,
				maxDistance: 95,
				minPolarAngle: .12,
				maxPolarAngle: Math.PI - .18,
				target: [
					0,
					2,
					6
				]
			})
		]
	});
}
function formatTime(t) {
	const s = Math.max(0, t);
	return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
function Hud() {
	const started = useSimStore((s) => s.started);
	const playing = useSimStore((s) => s.playing);
	const time = useSimStore((s) => s.time);
	const cameraMode = useSimStore((s) => s.cameraMode);
	const labels = useSimStore((s) => s.labels);
	const togglePlay = useSimStore((s) => s.togglePlay);
	const seek = useSimStore((s) => s.seek);
	const goToChapter = useSimStore((s) => s.goToChapter);
	const recinema = useSimStore((s) => s.recinema);
	const setLabels = useSimStore((s) => s.setLabels);
	const chapter = chapterAt(time);
	const idx = chapterIndexAt(time);
	const env = envAt(time);
	const jammed = env.jam > .55;
	const live = env.flow > .55 && env.jam < .4;
	if (!started) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-ink/72 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto hud-enter w-full max-w-xl rounded-lg border border-line bg-panel p-7 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.28em] text-moss uppercase",
					children: "Holcim · Internship"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-none tracking-tight text-paper sm:text-5xl",
					children: "Simulare 3D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-2xl text-paper/80",
					children: "Silozuri și blocaje la extracție"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-prose text-sm leading-relaxed text-paper/70",
					children: "Când silozul e pe terminate, crusta de pe pereți și bolovanii de la fund se așază ca un capac în extractor. Linia de însăcuire și vracul rămân fără material. Soluția propusă: tunuri de aer AGICO KQP, montate pe placa extractorului, acționate din camera de comandă."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-2 text-sm text-paper/75",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" }), "12 silozuri — detaliu complet pe silozurile 5 și 7"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" }), "Extractor cu două axe, rigolă, poartă glisantă orizontală"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" }), "Blocaj → tijă temporară → tunuri de aer → flux restabilit"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => useSimStore.getState().start(),
						className: "inline-flex h-11 items-center gap-2 rounded-sm bg-moss px-5 font-display text-sm tracking-[0.14em] text-ink uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), "Pornește prezentarea"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							useSimStore.getState().start();
							useSimStore.getState().setPlaying(false);
							useSimStore.getState().setCameraMode("manual");
						},
						className: "inline-flex h-11 items-center gap-2 rounded-sm border border-line px-5 font-display text-sm tracking-[0.14em] text-paper uppercase",
						children: "Explorează scena"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-auto flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-panel px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[10px] tracking-[0.26em] text-moss uppercase",
						children: "Holcim · Simulare 3D"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg leading-none text-paper sm:text-xl",
						children: [
							chapter.kicker,
							" ",
							chapter.title
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-md border border-line px-3 py-2 font-display text-[11px] tracking-[0.16em] uppercase ${jammed ? "bg-danger text-paper" : live ? "bg-ok text-paper" : "bg-panel text-paper/80"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper live-dot` }), jammed ? "Flux blocat" : live ? "Flux activ" : "Stand-by"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 gap-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "pointer-events-auto hidden w-52 shrink-0 flex-col justify-center gap-1 lg:flex",
					children: CHAPTERS.map((c, i) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => goToChapter(i),
							className: `rounded-sm border px-2.5 py-1.5 text-left transition-colors ${i === idx ? "border-moss/50 bg-moss/15 text-paper" : "border-transparent bg-panel-2 text-paper/60 hover:text-paper"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[10px] tracking-[0.18em] text-moss uppercase",
								children: c.kicker
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-[13px] leading-tight",
								children: c.title
							})]
						}, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "pointer-events-auto rounded-md border border-line bg-panel p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: togglePlay,
								className: "inline-flex h-10 w-10 items-center justify-center rounded-sm bg-moss text-ink",
								"aria-label": playing ? "Pauză" : "Redare",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => goToChapter(Math.max(0, idx - 1)),
								className: "inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper",
								"aria-label": "Capitol anterior",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => goToChapter(Math.min(CHAPTERS.length - 1, idx + 1)),
								className: "inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper",
								"aria-label": "Capitol următor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									seek(0);
									recinema();
								},
								className: "inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper",
								"aria-label": "De la început",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 hidden h-6 w-px bg-line sm:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: recinema,
								className: `inline-flex h-10 items-center gap-2 rounded-sm border px-3 font-display text-[11px] tracking-[0.12em] uppercase ${cameraMode === "cinematic" ? "border-moss/40 bg-moss/15 text-paper" : "border-line text-paper/70"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3.5 w-3.5" }), cameraMode === "cinematic" ? "Cameră ghidată" : "Revino la ghidaj"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLabels(!labels),
								className: "inline-flex h-10 items-center gap-2 rounded-sm border border-line px-3 font-display text-[11px] tracking-[0.12em] text-paper/70 uppercase",
								children: [labels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }), "Etichete"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto font-mono text-xs tabular-nums text-paper/60",
								children: [
									formatTime(time),
									" / ",
									formatTime(TOTAL_TIME)
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: TOTAL_TIME,
							step: .05,
							value: time,
							onChange: (e) => seek(Number(e.target.value)),
							className: "relative z-10 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-2 accent-moss",
							"aria-label": "Poziție timeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none mt-1.5 flex",
							children: CHAPTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => goToChapter(CHAPTERS.indexOf(c)),
								style: { width: `${c.duration / TOTAL_TIME * 100}%` },
								className: "pointer-events-auto truncate px-0.5 text-left font-display text-[9px] tracking-[0.12em] text-paper/45 uppercase hover:text-moss",
								children: c.kicker
							}, c.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 hidden text-[11px] text-paper/40 sm:block",
						children: "Trageți scena pentru a roti camera — simularea nu se oprește. Spațiu: play / pauză."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-sm text-paper/80 lg:hidden",
						children: chapter.lead
					})
				]
			})
		]
	});
}
function SimulationApp() {
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			useSimStore.getState().tick(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.code === "Space") {
				e.preventDefault();
				useSimStore.getState().togglePlay();
			} else if (e.code === "ArrowRight") {
				e.preventDefault();
				const s = useSimStore.getState();
				s.seek(s.time + 2);
			} else if (e.code === "ArrowLeft") {
				e.preventDefault();
				const s = useSimStore.getState();
				s.seek(s.time - 2);
			} else if (e.code === "KeyC") useSimStore.getState().recinema();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas3D, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { SimulationApp };

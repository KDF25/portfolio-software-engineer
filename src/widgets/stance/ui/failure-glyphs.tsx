/** Мини-схемы трёх видов отказа; подписи на них — технические, без перевода */

const BOX = "fill-none stroke-border";
const LABEL = "fill-muted-foreground font-mono text-xs";
const OK_LINE = "fill-none stroke-success";
const BAD_LINE = "fill-none stroke-danger";

export const NetworkGlyph = () => (
	<svg viewBox="0 0 240 84" aria-hidden="true" className="h-20 w-full">
		<rect
			className={BOX}
			strokeWidth={1.5}
			x="4"
			y="22"
			width="56"
			height="40"
			rx="8"
		/>
		<text className={LABEL} x="32" y="46" textAnchor="middle">
			worker
		</text>
		<rect
			className={BOX}
			strokeWidth={1.5}
			x="180"
			y="22"
			width="56"
			height="40"
			rx="8"
		/>
		<text className={LABEL} x="208" y="46" textAnchor="middle">
			node
		</text>
		<path className={OK_LINE} strokeWidth={1.8} d="M64 34 H176" />
		<path
			className={BAD_LINE}
			strokeWidth={1.8}
			strokeDasharray="4 4"
			d="M176 52 H64"
		/>
		<text
			className="fill-danger font-mono text-xs"
			x="120"
			y="74"
			textAnchor="middle"
		>
			no answer
		</text>
		<text
			className="fill-success font-mono text-xs"
			x="120"
			y="26"
			textAnchor="middle"
		>
			same tx
		</text>
	</svg>
);

export const RaceGlyph = () => (
	<svg viewBox="0 0 240 84" aria-hidden="true" className="h-20 w-full">
		<rect
			className={BOX}
			strokeWidth={1.5}
			x="4"
			y="6"
			width="56"
			height="30"
			rx="8"
		/>
		<text className={LABEL} x="32" y="25" textAnchor="middle">
			A
		</text>
		<rect
			className={BOX}
			strokeWidth={1.5}
			x="4"
			y="48"
			width="56"
			height="30"
			rx="8"
		/>
		<text className={LABEL} x="32" y="67" textAnchor="middle">
			B
		</text>
		<rect
			className={BOX}
			strokeWidth={1.5}
			x="168"
			y="22"
			width="68"
			height="40"
			rx="8"
		/>
		<text className={LABEL} x="202" y="46" textAnchor="middle">
			order
		</text>
		<path
			className={OK_LINE}
			strokeWidth={1.8}
			d="M64 21 C110 21 120 38 164 38"
		/>
		<path
			className={BAD_LINE}
			strokeWidth={1.8}
			strokeDasharray="4 4"
			d="M64 63 C110 63 120 48 150 48"
		/>
		<text
			className="fill-danger font-mono text-xs"
			x="112"
			y="80"
			textAnchor="middle"
		>
			0 rows
		</text>
	</svg>
);

export const ModelGlyph = () => (
	<svg viewBox="0 0 240 84" aria-hidden="true" className="h-20 w-full">
		<path
			className="fill-none stroke-muted-foreground"
			strokeWidth={1.5}
			d="M20 70 A100 100 0 0 1 220 70"
		/>
		<path
			className={OK_LINE}
			strokeWidth={1.8}
			d="M150 22 A100 100 0 0 1 220 70"
		/>
		<path
			className="fill-none stroke-muted-foreground"
			strokeWidth={1.5}
			d="M120 70 L84 34"
		/>
		<circle cx="120" cy="70" r="4" className="fill-muted-foreground" />
		<text className="fill-danger font-mono text-xs" x="40" y="82">
			0.41
		</text>
		<text
			className="fill-success font-mono text-xs"
			x="200"
			y="82"
			textAnchor="end"
		>
			threshold
		</text>
	</svg>
);

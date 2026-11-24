"use client";

import { useId, useState } from "react";

import { useElementWidth } from "@/shared/hooks";
import { cn } from "@/shared/lib";

export interface ISequenceMessage {
	from: number;
	to: number;
	label: string;
	failed?: boolean;
}

export interface ISequenceScenario {
	messages: ISequenceMessage[];
	outcome: string;
}

export interface ISequenceDiagramProps {
	/** Подпись типа схемы в шапке окна */
	kicker: string;
	name: string;
	lanes: string[];
	normal: ISequenceScenario;
	failure: ISequenceScenario;
	labels: { normal: string; failure: string };
}

const ENUM_SEQUENCE_MODE = {
	NORMAL: "normal",
	FAILURE: "failure"
} as const;

type ENUM_SEQUENCE_MODE_TYPE =
	(typeof ENUM_SEQUENCE_MODE)[keyof typeof ENUM_SEQUENCE_MODE];

const ROW_STEP = 40;
const TOP = 52;
const BOTTOM = 24;
const NARROW_WIDTH = 520;

/** Диаграмма последовательности с переключателем «норма / отказ» */
export const SequenceDiagram = ({
	kicker,
	name,
	lanes,
	normal,
	failure,
	labels
}: ISequenceDiagramProps) => {
	const [mode, setMode] = useState<ENUM_SEQUENCE_MODE_TYPE>(
		ENUM_SEQUENCE_MODE.NORMAL
	);
	const [boxRef, width] = useElementWidth<HTMLDivElement>();
	const markerId = useId();

	const scenario = mode === ENUM_SEQUENCE_MODE.NORMAL ? normal : failure;
	const rows = Math.max(normal.messages.length, failure.messages.length);
	const height = TOP + rows * ROW_STEP + BOTTOM;
	const isNarrow = width < NARROW_WIDTH;
	const pad = isNarrow ? 44 : 64;
	const xs = lanes.map(
		(_, index) => pad + ((width - pad * 2) * index) / (lanes.length - 1)
	);
	const bottom = TOP + rows * ROW_STEP + 8;

	const modes = [
		{ id: ENUM_SEQUENCE_MODE.NORMAL, label: labels.normal },
		{ id: ENUM_SEQUENCE_MODE.FAILURE, label: labels.failure }
	];

	return (
		<div className="overflow-hidden rounded-xl border bg-card">
			<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b py-1.5 pr-1.5 pl-3.5">
				<span className="font-mono text-xs text-muted-foreground">
					{kicker} · {name.toLowerCase()}
				</span>
				<div role="group" aria-label={name} className="flex gap-1">
					{modes.map(({ id, label }) => {
						const isActive = id === mode;
						const isFailure = id === ENUM_SEQUENCE_MODE.FAILURE;

						return (
							<button
								key={id}
								type="button"
								aria-pressed={isActive}
								onClick={() => setMode(id)}
								className={cn(
									"min-h-11 cursor-pointer rounded-lg border border-transparent px-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
									isActive &&
										!isFailure &&
										"border-success bg-success-soft text-foreground",
									isActive &&
										isFailure &&
										"border-danger bg-danger-soft text-foreground"
								)}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>

			<div ref={boxRef} className="bg-dots relative" style={{ height }}>
				{width > 0 && (
					<svg
						role="img"
						aria-label={`${name}: ${labels[mode]}`}
						className="absolute inset-0 size-full"
					>
						<defs>
							<marker
								id={`${markerId}-ok`}
								viewBox="0 0 8 8"
								refX="7"
								refY="4"
								markerWidth="7"
								markerHeight="7"
								orient="auto"
							>
								<path
									d="M0,0 L8,4 L0,8 z"
									className="fill-success"
								/>
							</marker>
							<marker
								id={`${markerId}-bad`}
								viewBox="0 0 8 8"
								refX="7"
								refY="4"
								markerWidth="7"
								markerHeight="7"
								orient="auto"
							>
								<path
									d="M0,0 L8,4 L0,8 z"
									className="fill-danger"
								/>
							</marker>
						</defs>

						{lanes.map((lane, index) => (
							<g key={lane}>
								<text
									x={xs[index]}
									y={30}
									textAnchor="middle"
									className="fill-foreground font-mono text-xs font-medium"
								>
									{lane}
								</text>
								<line
									x1={xs[index]}
									y1={40}
									x2={xs[index]}
									y2={bottom}
									strokeDasharray="3 5"
									className="stroke-border"
								/>
							</g>
						))}

						{scenario.messages.map(
							({ from, to, label, failed }, index) => {
								const y = TOP + index * ROW_STEP + 18;
								const direction = xs[to] > xs[from] ? 1 : -1;

								return (
									<g key={`${mode}-${index}`}>
										<line
											x1={xs[from] + direction * 4}
											y1={y}
											x2={xs[to] - direction * 6}
											y2={y}
											strokeWidth={1.5}
											strokeDasharray={
												failed ? "5 4" : undefined
											}
											markerEnd={`url(#${markerId}-${failed ? "bad" : "ok"})`}
											className={
												failed
													? "stroke-danger"
													: "stroke-success"
											}
										/>
										<text
											x={(xs[from] + xs[to]) / 2}
											y={y - 8}
											textAnchor="middle"
											className={cn(
												"font-mono text-xs",
												failed
													? "fill-danger"
													: "fill-soft"
											)}
										>
											{label}
										</text>
									</g>
								);
							}
						)}
					</svg>
				)}
			</div>

			<p
				aria-live="polite"
				className="flex items-center gap-2.5 border-t px-3.5 py-3 font-mono text-xs text-success"
			>
				<span
					aria-hidden="true"
					className={cn(
						"size-2 rounded-full",
						mode === ENUM_SEQUENCE_MODE.FAILURE
							? "bg-danger"
							: "bg-success"
					)}
				/>
				{scenario.outcome}
			</p>
		</div>
	);
};

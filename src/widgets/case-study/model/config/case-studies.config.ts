import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

export const ENUM_CASE_STUDY = {
	PAYOUTS: "payouts",
	CLAIMS: "claims",
	AGENT: "agent"
} as const;

export type ENUM_CASE_STUDY_TYPE =
	(typeof ENUM_CASE_STUDY)[keyof typeof ENUM_CASE_STUDY];

interface ICaseSequenceScenario {
	outcome: TMainKeys;
	messages: {
		from: number;
		to: number;
		label: TMainKeys;
		failed?: boolean;
	}[];
}

export interface ICaseSequenceConfig {
	name: TMainKeys;
	lanes: TMainKeys[];
	normal: ICaseSequenceScenario;
	failure: ICaseSequenceScenario;
}

export interface ICaseStudyConfig {
	/** Якорь главы: на него ведут карточки отказов */
	anchor: string;
	stack: TMainKeys;
	title: TMainKeys;
	metric: TMainKeys;
	metricLabel: TMainKeys;
	situation: TMainKeys;
	risks: { cause: TMainKeys; effect: TMainKeys }[];
	tasks: TMainKeys[];
	actions: { title: TMainKeys; note: TMainKeys; accepted: boolean }[];
	result: TMainKeys;
	quote: TMainKeys;
	sequence: ICaseSequenceConfig;
}

/** Порядок кейсов на странице; схема чередует сторону */
export const CASE_STUDY_ORDER: ENUM_CASE_STUDY_TYPE[] = [
	ENUM_CASE_STUDY.PAYOUTS,
	ENUM_CASE_STUDY.CLAIMS,
	ENUM_CASE_STUDY.AGENT
];

export const CASE_STUDIES: Record<ENUM_CASE_STUDY_TYPE, ICaseStudyConfig> = {
	[ENUM_CASE_STUDY.PAYOUTS]: {
		anchor: "case-payouts",
		stack: key("cases.payouts.stack"),
		title: key("cases.payouts.title"),
		metric: key("cases.payouts.metric"),
		metricLabel: key("cases.payouts.metric_label"),
		situation: key("cases.payouts.situation"),
		risks: [
			{
				cause: key("cases.payouts.risks.timeout.cause"),
				effect: key("cases.payouts.risks.timeout.effect")
			},
			{
				cause: key("cases.payouts.risks.order.cause"),
				effect: key("cases.payouts.risks.order.effect")
			},
			{
				cause: key("cases.payouts.risks.race.cause"),
				effect: key("cases.payouts.risks.race.effect")
			},
			{
				cause: key("cases.payouts.risks.crash.cause"),
				effect: key("cases.payouts.risks.crash.effect")
			}
		],
		tasks: [
			key("cases.payouts.tasks.parallel"),
			key("cases.payouts.tasks.duplicates"),
			key("cases.payouts.tasks.order"),
			key("cases.payouts.tasks.resume")
		],
		actions: [
			{
				title: key("cases.payouts.actions.sequential.title"),
				note: key("cases.payouts.actions.sequential.note"),
				accepted: false
			},
			{
				title: key("cases.payouts.actions.memory.title"),
				note: key("cases.payouts.actions.memory.note"),
				accepted: false
			},
			{
				title: key("cases.payouts.actions.transaction.title"),
				note: key("cases.payouts.actions.transaction.note"),
				accepted: true
			},
			{
				title: key("cases.payouts.actions.resend.title"),
				note: key("cases.payouts.actions.resend.note"),
				accepted: true
			},
			{
				title: key("cases.payouts.actions.coroutines.title"),
				note: key("cases.payouts.actions.coroutines.note"),
				accepted: true
			},
			{
				title: key("cases.payouts.actions.reconcile.title"),
				note: key("cases.payouts.actions.reconcile.note"),
				accepted: true
			}
		],
		result: key("cases.payouts.result"),
		quote: key("cases.payouts.quote"),
		sequence: {
			name: key("cases.payouts.sequence.name"),
			lanes: [
				key("cases.payouts.sequence.lanes.worker"),
				key("cases.payouts.sequence.lanes.db"),
				key("cases.payouts.sequence.lanes.node")
			],
			normal: {
				outcome: key("cases.payouts.sequence.normal.outcome"),
				messages: [
					{
						from: 0,
						to: 1,
						label: key(
							"cases.payouts.sequence.normal.steps.allocate"
						)
					},
					{
						from: 0,
						to: 1,
						label: key("cases.payouts.sequence.normal.steps.store")
					},
					{
						from: 0,
						to: 2,
						label: key("cases.payouts.sequence.normal.steps.send")
					},
					{
						from: 2,
						to: 0,
						label: key(
							"cases.payouts.sequence.normal.steps.accepted"
						)
					},
					{
						from: 0,
						to: 1,
						label: key("cases.payouts.sequence.normal.steps.done")
					}
				]
			},
			failure: {
				outcome: key("cases.payouts.sequence.failure.outcome"),
				messages: [
					{
						from: 0,
						to: 1,
						label: key(
							"cases.payouts.sequence.failure.steps.allocate"
						)
					},
					{
						from: 0,
						to: 1,
						label: key("cases.payouts.sequence.failure.steps.store")
					},
					{
						from: 0,
						to: 2,
						label: key("cases.payouts.sequence.failure.steps.send")
					},
					{
						from: 2,
						to: 0,
						label: key(
							"cases.payouts.sequence.failure.steps.timeout"
						),
						failed: true
					},
					{
						from: 0,
						to: 1,
						label: key("cases.payouts.sequence.failure.steps.load")
					},
					{
						from: 0,
						to: 2,
						label: key(
							"cases.payouts.sequence.failure.steps.resend"
						)
					},
					{
						from: 2,
						to: 0,
						label: key("cases.payouts.sequence.failure.steps.known")
					}
				]
			}
		}
	},
	[ENUM_CASE_STUDY.CLAIMS]: {
		anchor: "case-claims",
		stack: key("cases.claims.stack"),
		title: key("cases.claims.title"),
		metric: key("cases.claims.metric"),
		metricLabel: key("cases.claims.metric_label"),
		situation: key("cases.claims.situation"),
		risks: [
			{
				cause: key("cases.claims.risks.race.cause"),
				effect: key("cases.claims.risks.race.effect")
			},
			{
				cause: key("cases.claims.risks.retry.cause"),
				effect: key("cases.claims.risks.retry.effect")
			},
			{
				cause: key("cases.claims.risks.stale.cause"),
				effect: key("cases.claims.risks.stale.effect")
			},
			{
				cause: key("cases.claims.risks.peak.cause"),
				effect: key("cases.claims.risks.peak.effect")
			}
		],
		tasks: [
			key("cases.claims.tasks.single"),
			key("cases.claims.tasks.repeat"),
			key("cases.claims.tasks.peak")
		],
		actions: [
			{
				title: key("cases.claims.actions.check.title"),
				note: key("cases.claims.actions.check.note"),
				accepted: false
			},
			{
				title: key("cases.claims.actions.lock.title"),
				note: key("cases.claims.actions.lock.note"),
				accepted: false
			},
			{
				title: key("cases.claims.actions.conditional.title"),
				note: key("cases.claims.actions.conditional.note"),
				accepted: true
			},
			{
				title: key("cases.claims.actions.idempotent.title"),
				note: key("cases.claims.actions.idempotent.note"),
				accepted: true
			},
			{
				title: key("cases.claims.actions.filter.title"),
				note: key("cases.claims.actions.filter.note"),
				accepted: true
			},
			{
				title: key("cases.claims.actions.push.title"),
				note: key("cases.claims.actions.push.note"),
				accepted: true
			}
		],
		result: key("cases.claims.result"),
		quote: key("cases.claims.quote"),
		sequence: {
			name: key("cases.claims.sequence.name"),
			lanes: [
				key("cases.claims.sequence.lanes.courier_a"),
				key("cases.claims.sequence.lanes.courier_b"),
				key("cases.claims.sequence.lanes.redis"),
				key("cases.claims.sequence.lanes.db")
			],
			normal: {
				outcome: key("cases.claims.sequence.normal.outcome"),
				messages: [
					{
						from: 0,
						to: 2,
						label: key("cases.claims.sequence.normal.steps.free")
					},
					{
						from: 2,
						to: 0,
						label: key(
							"cases.claims.sequence.normal.steps.probably"
						)
					},
					{
						from: 0,
						to: 3,
						label: key("cases.claims.sequence.normal.steps.update")
					},
					{
						from: 3,
						to: 0,
						label: key(
							"cases.claims.sequence.normal.steps.assigned"
						)
					}
				]
			},
			failure: {
				outcome: key("cases.claims.sequence.failure.outcome"),
				messages: [
					{
						from: 0,
						to: 3,
						label: key(
							"cases.claims.sequence.failure.steps.update_a"
						)
					},
					{
						from: 1,
						to: 3,
						label: key(
							"cases.claims.sequence.failure.steps.update_b"
						)
					},
					{
						from: 3,
						to: 0,
						label: key(
							"cases.claims.sequence.failure.steps.assigned"
						)
					},
					{
						from: 3,
						to: 1,
						label: key("cases.claims.sequence.failure.steps.taken"),
						failed: true
					},
					{
						from: 0,
						to: 3,
						label: key("cases.claims.sequence.failure.steps.repeat")
					},
					{
						from: 3,
						to: 0,
						label: key(
							"cases.claims.sequence.failure.steps.success"
						)
					}
				]
			}
		}
	},
	[ENUM_CASE_STUDY.AGENT]: {
		anchor: "case-agent",
		stack: key("cases.agent.stack"),
		title: key("cases.agent.title"),
		metric: key("cases.agent.metric"),
		metricLabel: key("cases.agent.metric_label"),
		situation: key("cases.agent.situation"),
		risks: [
			{
				cause: key("cases.agent.risks.manual.cause"),
				effect: key("cases.agent.risks.manual.effect")
			},
			{
				cause: key("cases.agent.risks.guess.cause"),
				effect: key("cases.agent.risks.guess.effect")
			},
			{
				cause: key("cases.agent.risks.latency.cause"),
				effect: key("cases.agent.risks.latency.effect")
			},
			{
				cause: key("cases.agent.risks.format.cause"),
				effect: key("cases.agent.risks.format.effect")
			}
		],
		tasks: [
			key("cases.agent.tasks.grounded"),
			key("cases.agent.tasks.fast"),
			key("cases.agent.tasks.structured")
		],
		actions: [
			{
				title: key("cases.agent.actions.plain.title"),
				note: key("cases.agent.actions.plain.note"),
				accepted: false
			},
			{
				title: key("cases.agent.actions.sequential.title"),
				note: key("cases.agent.actions.sequential.note"),
				accepted: false
			},
			{
				title: key("cases.agent.actions.rag.title"),
				note: key("cases.agent.actions.rag.note"),
				accepted: true
			},
			{
				title: key("cases.agent.actions.streaming.title"),
				note: key("cases.agent.actions.streaming.note"),
				accepted: true
			},
			{
				title: key("cases.agent.actions.schema.title"),
				note: key("cases.agent.actions.schema.note"),
				accepted: true
			},
			{
				title: key("cases.agent.actions.evals.title"),
				note: key("cases.agent.actions.evals.note"),
				accepted: true
			}
		],
		result: key("cases.agent.result"),
		quote: key("cases.agent.quote"),
		sequence: {
			name: key("cases.agent.sequence.name"),
			lanes: [
				key("cases.agent.sequence.lanes.client"),
				key("cases.agent.sequence.lanes.agent"),
				key("cases.agent.sequence.lanes.rag"),
				key("cases.agent.sequence.lanes.human")
			],
			normal: {
				outcome: key("cases.agent.sequence.normal.outcome"),
				messages: [
					{
						from: 0,
						to: 1,
						label: key("cases.agent.sequence.normal.steps.brief")
					},
					{
						from: 1,
						to: 2,
						label: key("cases.agent.sequence.normal.steps.retrieve")
					},
					{
						from: 2,
						to: 1,
						label: key(
							"cases.agent.sequence.normal.steps.confidence"
						)
					},
					{
						from: 1,
						to: 0,
						label: key("cases.agent.sequence.normal.steps.scenario")
					},
					{
						from: 0,
						to: 1,
						label: key("cases.agent.sequence.normal.steps.confirm")
					}
				]
			},
			failure: {
				outcome: key("cases.agent.sequence.failure.outcome"),
				messages: [
					{
						from: 0,
						to: 1,
						label: key("cases.agent.sequence.failure.steps.brief")
					},
					{
						from: 1,
						to: 2,
						label: key(
							"cases.agent.sequence.failure.steps.retrieve"
						)
					},
					{
						from: 2,
						to: 1,
						label: key("cases.agent.sequence.failure.steps.low"),
						failed: true
					},
					{
						from: 1,
						to: 3,
						label: key("cases.agent.sequence.failure.steps.handoff")
					},
					{
						from: 3,
						to: 0,
						label: key("cases.agent.sequence.failure.steps.answer")
					}
				]
			}
		}
	}
};

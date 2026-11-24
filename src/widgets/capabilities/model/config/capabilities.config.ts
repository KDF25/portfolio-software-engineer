import {
	Bot,
	CreditCard,
	Layers,
	LayoutDashboard,
	type LucideIcon,
	Server,
	Workflow,
	Zap
} from "lucide-react";

import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

export const ENUM_CAPABILITY_SIZE = {
	/** 2×2 — главная карточка со схемой потока */
	FEATURE: "feature",
	WIDE: "wide",
	DEFAULT: "default"
} as const;

export type ENUM_CAPABILITY_SIZE_TYPE =
	(typeof ENUM_CAPABILITY_SIZE)[keyof typeof ENUM_CAPABILITY_SIZE];

export interface ICapabilityConfig {
	id: string;
	icon: LucideIcon;
	title: TMainKeys;
	text: TMainKeys;
	tags: string[];
	size: ENUM_CAPABILITY_SIZE_TYPE;
	withFlow?: boolean;
}

export const CAPABILITIES: ICapabilityConfig[] = [
	{
		id: "ai",
		icon: Bot,
		title: key("capabilities.items.ai.title"),
		text: key("capabilities.items.ai.text"),
		tags: ["LiveKit", "RAG", "MCP", "evals", "STT/TTS"],
		size: ENUM_CAPABILITY_SIZE.FEATURE,
		withFlow: true
	},
	{
		id: "backend",
		icon: Server,
		title: key("capabilities.items.backend.title"),
		text: key("capabilities.items.backend.text"),
		tags: [
			"Node.js",
			"NestJS",
			"Python asyncio",
			"gRPC",
			"Kafka",
			"PostgreSQL"
		],
		size: ENUM_CAPABILITY_SIZE.WIDE
	},
	{
		id: "payments",
		icon: CreditCard,
		title: key("capabilities.items.payments.title"),
		text: key("capabilities.items.payments.text"),
		tags: ["Stripe", "DocuSign", "EVM"],
		size: ENUM_CAPABILITY_SIZE.DEFAULT
	},
	{
		id: "realtime",
		icon: Zap,
		title: key("capabilities.items.realtime.title"),
		text: key("capabilities.items.realtime.text"),
		tags: ["WebSocket", "SSE", "Redis"],
		size: ENUM_CAPABILITY_SIZE.DEFAULT
	},
	{
		id: "automation",
		icon: Workflow,
		title: key("capabilities.items.automation.title"),
		text: key("capabilities.items.automation.text"),
		tags: ["Playwright", "Puppeteer", "cron", "Telegram bots", "S3"],
		size: ENUM_CAPABILITY_SIZE.WIDE
	},
	{
		id: "frontend",
		icon: Layers,
		title: key("capabilities.items.frontend.title"),
		text: key("capabilities.items.frontend.text"),
		tags: ["React", "Next.js", "React Native", "FSD"],
		size: ENUM_CAPABILITY_SIZE.DEFAULT
	},
	{
		id: "admin",
		icon: LayoutDashboard,
		title: key("capabilities.items.admin.title"),
		text: key("capabilities.items.admin.text"),
		tags: ["RBAC", "audit"],
		size: ENUM_CAPABILITY_SIZE.DEFAULT
	}
];

/** Поток агента: шаги по порядку, последний — подтверждение */
export const CAPABILITY_FLOW = [
	key("capabilities.flow.speech"),
	key("capabilities.flow.retrieval"),
	key("capabilities.flow.model"),
	key("capabilities.flow.schema"),
	key("capabilities.flow.confirm")
];

export const CAPABILITY_FALLBACK = [
	key("capabilities.flow.low"),
	key("capabilities.flow.human")
];

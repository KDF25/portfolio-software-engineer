import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

export interface IHarnessStepConfig {
	title: TMainKeys;
	text: TMainKeys;
	/** Инструменты — названия, не переводятся */
	tools: string;
}

export const HARNESS_STEPS: IHarnessStepConfig[] = [
	{
		title: key("build.steps.spec.title"),
		text: key("build.steps.spec.text"),
		tools: "Spec Kit · OpenSpec"
	},
	{
		title: key("build.steps.context.title"),
		text: key("build.steps.context.text"),
		tools: "CodeGraph · zvec-grep"
	},
	{
		title: key("build.steps.tests.title"),
		text: key("build.steps.tests.text"),
		tools: "TDD"
	},
	{
		title: key("build.steps.guardrails.title"),
		text: key("build.steps.guardrails.text"),
		tools: "Aegis"
	},
	{
		title: key("build.steps.memory.title"),
		text: key("build.steps.memory.text"),
		tools: "agent memory"
	}
];

export interface IStackGroupConfig {
	id: string;
	title: TMainKeys;
	items: string[];
	isHighlighted?: boolean;
}

export const STACK_GROUPS: IStackGroupConfig[] = [
	{
		id: "systems",
		title: key("build.stack.systems"),
		items: [
			"Distributed services",
			"Queues",
			"Transactions",
			"Idempotency",
			"gRPC",
			"WebSockets",
			"Kafka"
		]
	},
	{
		id: "backend",
		title: key("build.stack.backend"),
		items: [
			"Node.js",
			"NestJS",
			"Python",
			"asyncio",
			"aiohttp",
			"REST",
			"GraphQL"
		]
	},
	{
		id: "data",
		title: key("build.stack.data"),
		items: ["PostgreSQL", "Redis", "Vector search", "Prisma", "TypeORM"]
	},
	{
		id: "ai",
		title: key("build.stack.ai"),
		items: [
			"RAG",
			"LLM integration",
			"MCP servers",
			"Voice agents",
			"LiveKit",
			"Evals"
		]
	},
	{
		id: "harness",
		title: key("build.stack.harness"),
		items: [
			"Spec Kit",
			"OpenSpec",
			"Aegis",
			"CodeGraph",
			"zvec-grep",
			"Agent memory",
			"SDD",
			"TDD"
		],
		isHighlighted: true
	},
	{
		id: "frontend",
		title: key("build.stack.frontend"),
		items: [
			"TypeScript",
			"React",
			"Next.js",
			"React Native",
			"Module Federation",
			"FSD"
		]
	},
	{
		id: "integrations",
		title: key("build.stack.integrations"),
		items: [
			"Stripe",
			"DocuSign",
			"WalletConnect",
			"Playwright",
			"Puppeteer",
			"Telegram bots"
		]
	},
	{
		id: "infrastructure",
		title: key("build.stack.infrastructure"),
		items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Prometheus", "Grafana"]
	}
];

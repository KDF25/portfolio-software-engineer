import { notFound } from "next/navigation";

/** Любой путь вне маршрутов → [locale]/not-found.tsx с лейаутом и переводами */
export default function CatchAllPage() {
	notFound();
}

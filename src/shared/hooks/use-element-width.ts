"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

/** Ширина элемента в CSS-пикселях; обновляется при ресайзе */
export const useElementWidth = <T extends HTMLElement>(): [
	RefObject<T | null>,
	number
] => {
	const ref = useRef<T>(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const observer = new ResizeObserver(([entry]) => {
			setWidth(Math.round(entry.contentRect.width));
		});

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return [ref, width];
};

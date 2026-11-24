interface IJsonLdProps {
	data: Record<string, unknown>;
}

/** Структурированные данные schema.org; `<` экранируется, чтобы строка не закрыла script */
export const JsonLd = ({ data }: IJsonLdProps) => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(data).replace(/</g, "\\u003c")
		}}
	/>
);

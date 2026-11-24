import { type TTagChipVariant, TagChip } from "../../tag-chip";

export const ENUM_METRIC_DIRECTION = {
	UP: "up",
	DOWN: "down",
	SCALE: "scale"
} as const;

export type ENUM_METRIC_DIRECTION_TYPE =
	(typeof ENUM_METRIC_DIRECTION)[keyof typeof ENUM_METRIC_DIRECTION];

const DIRECTION_VARIANT: Record<ENUM_METRIC_DIRECTION_TYPE, TTagChipVariant> = {
	[ENUM_METRIC_DIRECTION.UP]: "success",
	[ENUM_METRIC_DIRECTION.DOWN]: "danger",
	[ENUM_METRIC_DIRECTION.SCALE]: "outline"
};

const DIRECTION_ARROW: Record<ENUM_METRIC_DIRECTION_TYPE, string> = {
	[ENUM_METRIC_DIRECTION.UP]: " ↑",
	[ENUM_METRIC_DIRECTION.DOWN]: " ↓",
	[ENUM_METRIC_DIRECTION.SCALE]: ""
};

interface IMetricBadgeProps {
	direction: ENUM_METRIC_DIRECTION_TYPE;
}

/** Бейдж направления метрики: по цвету видно, выросло или упало, не дочитывая строку */
/** Слово в бейдже — само направление (up / down / scale), на всех языках одинаковое */
export const MetricBadge = ({ direction }: IMetricBadgeProps) => (
	<TagChip variant={DIRECTION_VARIANT[direction]}>
		{direction}
		{DIRECTION_ARROW[direction]}
	</TagChip>
);

/** Цвет цифры в тексте совпадает с бейджем */
export const METRIC_VALUE_CLASS: Record<ENUM_METRIC_DIRECTION_TYPE, string> = {
	[ENUM_METRIC_DIRECTION.UP]: "text-success",
	[ENUM_METRIC_DIRECTION.DOWN]: "text-danger",
	[ENUM_METRIC_DIRECTION.SCALE]: "text-foreground"
};

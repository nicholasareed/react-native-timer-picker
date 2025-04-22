import type { LimitType } from "../components/DurationScroll/types";
export declare const getAdjustedLimit: (limit: LimitType | undefined, numberOfItems: number, interval: number) => {
    max: number;
    min: number;
};

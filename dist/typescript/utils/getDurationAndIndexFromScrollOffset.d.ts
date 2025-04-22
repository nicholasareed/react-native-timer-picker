export declare const getDurationAndIndexFromScrollOffset: (variables: {
    disableInfiniteScroll: boolean;
    interval: number;
    itemHeight: number;
    numberOfItems: number;
    padWithNItems: number;
    yContentOffset: number;
}) => {
    duration: number;
    index: number;
};

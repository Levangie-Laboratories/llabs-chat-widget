export type PresentationAgent = {
    name: string;
    description: string;
};
export type PresentationInvestment = {
    range: string;
    variance_reason?: string;
    roi_ratio?: string;
};
export type PresentationBooking = {
    host: string;
    calendly_url: string;
    duration_min?: number;
    description?: string;
};
export type PresentationData = {
    company: string;
    what_we_heard: string;
    goal: string;
    agents: PresentationAgent[];
    why_different: string;
    what_unlocks: string;
    connects_to: string[];
    investment: PresentationInvestment;
    booking?: PresentationBooking;
};
type Props = {
    data: PresentationData;
    backgroundColor?: string;
    textColor?: string;
};
export declare const PresentationCard: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=PresentationCard.d.ts.map
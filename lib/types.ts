export type Automation = {
    id: string;
    title: string;
    shortDescription: string;
    slug: string;
    priority: number;
    categories: { title: string; slug: string }[];
    sites: { logoSmall2x: string; domains: string[]; title: string; slug: string }[];
};
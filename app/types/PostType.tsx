export interface PostProps {
    id: string;
    title: string;
    body: string;
    tags: string[];
    views: string,
    reactions: {
        [key: string]: number;
    };
}
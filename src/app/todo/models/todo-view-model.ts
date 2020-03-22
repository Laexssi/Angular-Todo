export interface TodoViewModel {
    title: string;
    id: string;
    description: string;
    done: boolean;
    priority: string;
    createdDate: Date;
    deadline: any;
    isOutdate: boolean
}

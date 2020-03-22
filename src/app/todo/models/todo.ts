export interface Todo {
    title: string;
    description: string;
    done: boolean;
    priority: string;
    createdDate: Date;
    deadline: Date|boolean;
}

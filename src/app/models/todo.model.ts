export class Todo {
    constructor(
        public id: number, 
        public title: string, 
        public isComplete: boolean,
        public priority: 'high' | 'medium' | 'low',
        public dueDate: Date // Fecha y hora de vencimiento
    ) {}
}
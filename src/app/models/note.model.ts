export class Note {
    constructor(
        public id: number,
        public title: string,
        public content: string, // Rich text content as HTML
        public createdAt: Date,
        public updatedAt: Date,
        public category: string,
        public isFavorite: boolean = false,
        public tags: string[] = []
    ) {}
}
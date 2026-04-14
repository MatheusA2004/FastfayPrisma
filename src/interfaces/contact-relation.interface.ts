export interface ContactRelation {
    id: string;
    contactId: string;
    relatedContactId: string;
    type: string;
    createdAt: Date;
}

export interface ContactRelationCreate {
    contactId: string;
    relatedContactId: string;
    type: string;
    userEmail: string;
}

export interface ContactRelationRepository {
    create(data: Omit<ContactRelationCreate, 'userEmail'>): Promise<ContactRelation>;
    findAll(contactId: string): Promise<ContactRelation[]>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<ContactRelation | null>;
}

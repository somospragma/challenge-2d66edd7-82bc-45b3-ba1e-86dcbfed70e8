/**
 * Entidad de dominio que representa una transacción financiera.
 * Contiene la lógica de negocio relacionada con transacciones.
 */
export class Transaction {
    constructor(
        public readonly id: string,
        public readonly accountId: string,
        public readonly amount: number,
        public readonly type: TransactionType,
        public readonly description: string,
        public readonly date: Date,
        public readonly status: TransactionStatus,
        public readonly metadata?: TransactionMetadata
    ) {}

    /**
     * Calcula el impacto de esta transacción en el saldo de la cuenta.
     * @returns El monto neto que afecta el saldo de la cuenta.
     */
    public calculateBalanceImpact(): number {
        return this.type === TransactionType.DEBIT ? -this.amount : this.amount;
    }

    /**
     * Verifica si la transacción está en un estado válido para procesamiento.
     * @returns true si la transacción puede procesarse, false en caso contrario.
     */
    public isProcessable(): boolean {
        return this.status === TransactionStatus.PENDING || this.status === TransactionStatus.RETRY;
    }

    /**
     * Crea una nueva instancia de transacción con un estado actualizado.
     * @param newStatus El nuevo estado para la transacción.
     * @returns Una nueva instancia de Transaction con el estado actualizado.
     */
    public withStatus(newStatus: TransactionStatus): Transaction {
        return new Transaction(
            this.id,
            this.accountId,
            this.amount,
            this.type,
            this.description,
            this.date,
            newStatus,
            this.metadata
        );
    }
}

/** Tipos de transacciones permitidos */
export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    TRANSFER = 'TRANSFER'
}

/** Estados posibles de una transacción */
export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    RETRY = 'RETRY'
}

/** Metadatos adicionales opcionales para una transacción */
export interface TransactionMetadata {
    referenceId?: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    tags?: string[];
    additionalFees?: number;
}
/**
 * Entidad de dominio que representa una cuenta bancaria.
 * Contiene la lógica de negocio relacionada con cuentas.
 */
export class Account {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly accountNumber: string,
        public readonly balance: number,
        public readonly currency: string,
        public readonly status: AccountStatus,
        public readonly lastSync?: Date,
        public readonly version?: number
    ) {}

    /**
     * Verifica si la cuenta está activa y puede realizar transacciones.
     * @returns true si la cuenta está activa, false en caso contrario.
     */
    public isActive(): boolean {
        return this.status === AccountStatus.ACTIVE;
    }

    /**
     * Crea una nueva instancia de cuenta con un saldo actualizado.
     * @param amount El monto a ajustar en el saldo.
     * @returns Una nueva instancia de Account con el saldo actualizado.
     */
    public adjustBalance(amount: number): Account {
        return new Account(
            this.id,
            this.userId,
            this.accountNumber,
            this.balance + amount,
            this.currency,
            this.status,
            this.lastSync,
            (this.version || 0) + 1
        );
    }

    /**
     * Crea una nueva instancia de cuenta con un estado actualizado.
     * @param newStatus El nuevo estado para la cuenta.
     * @returns Una nueva instancia de Account con el estado actualizado.
     */
    public withStatus(newStatus: AccountStatus): Account {
        return new Account(
            this.id,
            this.userId,
            this.accountNumber,
            this.balance,
            this.currency,
            newStatus,
            this.lastSync,
            this.version
        );
    }

    /**
     * Verifica si la cuenta tiene fondos suficientes para una transacción.
     * @param amount El monto de la transacción.
     * @returns true si hay fondos suficientes, false en caso contrario.
     */
    public hasSufficientFunds(amount: number): boolean {
        return this.balance >= amount;
    }
}

/** Estados posibles de una cuenta */
export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    FROZEN = 'FROZEN',
    CLOSED = 'CLOSED',
    PENDING = 'PENDING'
}
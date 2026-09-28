import { Transaction } from '../entities/transaction.entity';

/**
 * Interfaz abstracta para el repositorio de transacciones.
 * Define los contratos que deben implementarse para persistir y recuperar transacciones.
 */
export interface TransactionRepository {
    /**
     * Guarda una transacción en el repositorio.
     * @param transaction La transacción a guardar.
     * @returns Una promesa que resuelve con la transacción guardada.
     */
    save(transaction: Transaction): Promise<Transaction>;

    /**
     * Recupera una transacción por su ID.
     * @param id El ID de la transacción.
     * @returns Una promesa que resuelve con la transacción encontrada o null si no existe.
     */
    findById(id: string): Promise<Transaction | null>;

    /**
     * Recupera todas las transacciones de una cuenta.
     * @param accountId El ID de la cuenta.
     * @param limit Límite de transacciones a recuperar.
     * @param offset Offset para paginación.
     * @returns Una promesa que resuelve con una lista de transacciones.
     */
    findByAccountId(accountId: string, limit?: number, offset?: number): Promise<Transaction[]>;

    /**
     * Recupera transacciones pendientes para procesamiento.
     * @param batchSize Tamaño del lote de transacciones pendientes.
     * @returns Una promesa que resuelve con una lista de transacciones pendientes.
     */
    findPendingTransactions(batchSize: number): Promise<Transaction[]>;

    /**
     * Actualiza el estado de una transacción.
     * @param id El ID de la transacción.
     * @param newStatus El nuevo estado para la transacción.
     * @returns Una promesa que resuelve con la transacción actualizada.
     */
    updateStatus(id: string, newStatus: string): Promise<Transaction>;

    /**
     * Sincroniza transacciones locales con el backend en segundo plano.
     * @returns Una promesa que se resuelve cuando la sincronización completa.
     */
    syncWithBackend(): Promise<void>;
}
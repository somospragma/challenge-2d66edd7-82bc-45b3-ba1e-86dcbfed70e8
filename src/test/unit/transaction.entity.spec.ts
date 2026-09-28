import { Transaction, TransactionStatus, TransactionType } from '../../app/domain/entities/transaction.entity';
import { mockTransaction } from '../helpers/mocks';

describe('Transaction Entity', () => {
  describe('calculateBalanceImpact', () => {
    it('debería retornar impacto negativo para transacciones de débito', () => {
      const transaction = mockTransaction({ type: TransactionType.DEBIT, amount: 150.00 });
      const impact = transaction.calculateBalanceImpact();
      expect(impact).toBe(-150.00);
    });

    it('debería retornar impacto positivo para transacciones de crédito', () => {
      const transaction = mockTransaction({ type: TransactionType.CREDIT, amount: 200.00 });
      const impact = transaction.calculateBalanceImpact();
      expect(impact).toBe(200.00);
    });
  });

  describe('isProcessable', () => {
    it('debería retornar true cuando la transacción está en estado pendiente', () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      expect(transaction.isProcessable()).toBe(true);
    });

    it('debería retornar false cuando la transacción ya fue procesada', () => {
      const transaction = mockTransaction({ status: TransactionStatus.COMPLETED });
      expect(transaction.isProcessable()).toBe(false);
    });
  });

  describe('withStatus', () => {
    it('debería crear una nueva transacción con el estado actualizado', () => {
      const original = mockTransaction({ status: TransactionStatus.PENDING });
      const updated = original.withStatus(TransactionStatus.COMPLETED);
      expect(updated.status).toBe(TransactionStatus.COMPLETED);
    });
  });
});
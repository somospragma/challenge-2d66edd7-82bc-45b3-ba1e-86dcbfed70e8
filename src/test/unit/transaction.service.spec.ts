import { TestBed } from '@angular/core/testing';
import { TransactionService } from '../../app/presentation/services/transaction.service';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';
import { mockTransactionRepository, mockTransaction } from '../helpers/mocks';
import { TransactionStatus } from '../../app/domain/entities/transaction.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useFactory: mockTransactionRepository }
      ]
    });

    service = TestBed.inject(TransactionService);
    repository = TestBed.inject(TransactionRepository) as jest.Mocked<TransactionRepository>;
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeDefined();
  });

  describe('getTransactions', () => {
    it('debería obtener transacciones de una cuenta', async () => {
      const accountId = 'acc-456';
      const transactions = [mockTransaction(), mockTransaction({ id: 'txn-124' })];
      repository.findByAccountId.mockResolvedValue(transactions);

      const result = await service.getTransactions(accountId);
      expect(repository.findByAccountId).toHaveBeenCalledWith(accountId, undefined, undefined);
      expect(result).toHaveLength(2);
    });

    it('debería retornar array vacío cuando no hay transacciones', async () => {
      repository.findByAccountId.mockResolvedValue([]);

      const result = await service.getTransactions('acc-empty');
      expect(result).toHaveLength(0);
    });
  });

  describe('createTransaction', () => {
    it('debería crear una nueva transacción', async () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      repository.save.mockResolvedValue(transaction);

      const result = await service.createTransaction(transaction);
      expect(repository.save).toHaveBeenCalledWith(transaction);
      expect(result).toBeDefined();
    });
  });

  describe('syncTransactions', () => {
    it('debería sincronizar transacciones con el backend', async () => {
      repository.syncWithBackend.mockResolvedValue(undefined);

      await service.syncTransactions();
      expect(repository.syncWithBackend).toHaveBeenCalled();
    });
  });
});
import { TestBed } from '@angular/core/testing';
import { ProcessTransactionUseCase } from '../../app/domain/usecases/process-transaction.usecase';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';
import { mockTransactionRepository, mockTransaction } from '../helpers/mocks';
import { TransactionStatus } from '../../app/domain/entities/transaction.entity';

describe('ProcessTransactionUseCase', () => {
  let useCase: ProcessTransactionUseCase;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ProcessTransactionUseCase,
        { provide: TransactionRepository, useFactory: mockTransactionRepository }
      ]
    });

    useCase = TestBed.inject(ProcessTransactionUseCase);
    repository = TestBed.inject(TransactionRepository) as jest.Mocked<TransactionRepository>;
  });

  it('debería existir', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('debería procesar una transacción exitosamente', async () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      repository.findById.mockResolvedValue(transaction);
      repository.updateStatus.mockResolvedValue(transaction);

      const result = await useCase.execute(transaction.id);
      expect(repository.findById).toHaveBeenCalledWith(transaction.id);
      expect(repository.updateStatus).toHaveBeenCalled();
    });

    it('debería manejar transacciones no encontradas', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await useCase.execute('non-existent-id');
      expect(result).toBeNull();
    });
  });
});
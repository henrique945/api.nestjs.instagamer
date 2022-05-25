import { Type } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

/**
 * Método que provem um repositório para ser usado para testes
 *
 * @param repository As informações do repositório
 * @param override Caso precise sobrescrever outro método, é necessário passar nesse cara
 *
 * @example
 * const moduleRef = await Test.createTestingModule({
 *  providers: [
 *   provideRepository<EquipmentEntity, EquipmentRepository, typeof EquipmentRepository>(EquipmentRepository),
 *  ],
 * }).compile();
 */
export function provideRepository<E, T extends Repository<E>>(repository: T, override?: Partial<Omit<T, keyof TypeOrmCrudService<E>>>) {
  // @ts-ignore
  const repo: T = {
    clear: jest.fn(),
    createQueryBuilder: jest.fn(),
    decrement: jest.fn(),
    delete: jest.fn(),
    getId: jest.fn(),
    hasId: jest.fn(),
    increment: jest.fn(),
    insert: jest.fn(),
    merge: jest.fn(),
    manager: undefined,
    metadata: undefined,
    preload: jest.fn(),
    query: jest.fn(),
    queryRunner: undefined,
    restore: jest.fn(),
    softDelete: jest.fn(),
    target: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    exists: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    findByIds: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    recover: jest.fn(),
    remove: jest.fn(),
    softRemove: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    ...override,
  };

  return { provide: repository as unknown as Type<T>, useValue: repo };
}

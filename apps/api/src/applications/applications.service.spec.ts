import 'reflect-metadata';
import { NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { ApplicationStage } from '@job-tracker/shared';
import { ApplicationsService } from './applications.service';
import { ApplicationEntity } from './application.entity';
import type { CreateApplicationDto } from './dto/create-application.dto';

describe('ApplicationsService', () => {
  const userId = 'user-1';
  let repo: {
    find: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    preload: jest.Mock;
    delete: jest.Mock;
  };
  let service: ApplicationsService;

  beforeEach(() => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      delete: jest.fn(),
    };
    service = new ApplicationsService(
      repo as unknown as Repository<ApplicationEntity>,
    );
  });

  it('findAll scopes the query to the owner', async () => {
    repo.find.mockResolvedValue([]);
    await service.findAll(userId);
    expect(repo.find).toHaveBeenCalledWith({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  });

  it('findOne throws NotFound when the row is not the owner’s', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('app-1', userId)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 'app-1', userId },
    });
  });

  it('create stamps the owner userId', async () => {
    const dto = {
      company: 'Acme',
      role: 'Dev',
      stage: ApplicationStage.Saved,
    } as CreateApplicationDto;
    repo.create.mockReturnValue({ ...dto, userId });
    repo.save.mockResolvedValue({ id: 'app-1', ...dto, userId });
    await service.create(dto, userId);
    expect(repo.create).toHaveBeenCalledWith({ ...dto, userId });
  });

  it('remove throws NotFound when nothing was deleted', async () => {
    repo.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove('app-1', userId)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(repo.delete).toHaveBeenCalledWith({ id: 'app-1', userId });
  });

  it('remove resolves when a row was deleted', async () => {
    repo.delete.mockResolvedValue({ affected: 1 });
    await expect(service.remove('app-1', userId)).resolves.toBeUndefined();
  });
});

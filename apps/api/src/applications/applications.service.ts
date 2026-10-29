import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    // TypeORM repository for this entity: ready-made methods over the table.
    @InjectRepository(ApplicationEntity)
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  // Every method takes the owner's id and scopes its query by it, so a user can
  // never read or touch another user's applications.
  findAll(userId: string): Promise<ApplicationEntity[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, userId: string): Promise<ApplicationEntity> {
    const found = await this.repo.findOne({ where: { id, userId } });
    if (!found) {
      throw new NotFoundException(`No existe la postulación ${id}`);
    }
    return found;
  }

  create(dto: CreateApplicationDto, userId: string): Promise<ApplicationEntity> {
    const entity = this.repo.create({ ...dto, userId });
    return this.repo.save(entity);
  }

  async update(
    id: string,
    dto: UpdateApplicationDto,
    userId: string,
  ): Promise<ApplicationEntity> {
    // Ownership + existence check first (throws 404 if not the owner's row).
    await this.findOne(id, userId);
    const entity = await this.repo.preload({ id, ...dto });
    if (!entity) {
      throw new NotFoundException(`No existe la postulación ${id}`);
    }
    return this.repo.save(entity);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.repo.delete({ id, userId });
    if (!result.affected) {
      throw new NotFoundException(`No existe la postulación ${id}`);
    }
  }
}

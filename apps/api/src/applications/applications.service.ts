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

  findAll(): Promise<ApplicationEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<ApplicationEntity> {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Application ${id} not found`);
    }
    return found;
  }

  create(dto: CreateApplicationDto): Promise<ApplicationEntity> {
    const entity = this.repo.create(dto); // build the instance in memory
    return this.repo.save(entity); // INSERT
  }

  async update(id: string, dto: UpdateApplicationDto): Promise<ApplicationEntity> {
    // preload loads the existing row and merges the DTO changes onto it.
    // It returns undefined when the id does not exist.
    const entity = await this.repo.preload({ id, ...dto });
    if (!entity) {
      throw new NotFoundException(`Application ${id} not found`);
    }
    return this.repo.save(entity); // UPDATE
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Application ${id} not found`);
    }
  }
}

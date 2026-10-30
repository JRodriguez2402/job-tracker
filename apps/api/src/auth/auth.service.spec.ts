import 'reflect-metadata';

// @nestjs/jwt ships ESM that Jest (CommonJS) can't require; we don't need the
// real module here — the service receives a mock JwtService — so stub it out.
jest.mock('@nestjs/jwt', () => ({ JwtService: class {} }));

import { ConflictException, UnauthorizedException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import type { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

describe('AuthService', () => {
  let users: { findOne: jest.Mock; create: jest.Mock; save: jest.Mock };
  let jwt: { sign: jest.Mock };
  let service: AuthService;

  beforeEach(() => {
    users = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
    jwt = { sign: jest.fn().mockReturnValue('signed.jwt.token') };
    service = new AuthService(
      users as unknown as Repository<UserEntity>,
      jwt as unknown as JwtService,
    );
  });

  it('register stores a bcrypt hash, never the plain password', async () => {
    users.findOne.mockResolvedValue(null);
    users.create.mockImplementation((u: Partial<UserEntity>) => u);
    users.save.mockImplementation(async (u: Partial<UserEntity>) => ({
      id: 'u1',
      ...u,
    }));

    const res = await service.register({
      email: 'A@Test.com ',
      password: 'secret12',
    });

    // Email is normalized (trimmed + lowercased) before the lookup.
    expect(users.findOne).toHaveBeenCalledWith({
      where: { email: 'a@test.com' },
    });
    const saved = users.save.mock.calls[0][0] as UserEntity;
    expect(saved.passwordHash).not.toBe('secret12');
    expect(await bcrypt.compare('secret12', saved.passwordHash)).toBe(true);
    expect(res.accessToken).toBe('signed.jwt.token');
    expect(res.user.email).toBe('a@test.com');
  });

  it('register throws Conflict when the email already exists', async () => {
    users.findOne.mockResolvedValue({ id: 'u1' } as UserEntity);
    await expect(
      service.register({ email: 'a@test.com', password: 'secret12' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('login throws Unauthorized on a wrong password', async () => {
    const passwordHash = await bcrypt.hash('correct1', 10);
    users.findOne.mockResolvedValue({
      id: 'u1',
      email: 'a@test.com',
      passwordHash,
    } as UserEntity);
    await expect(
      service.login({ email: 'a@test.com', password: 'wrongpass' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('login returns a token on correct credentials', async () => {
    const passwordHash = await bcrypt.hash('correct1', 10);
    users.findOne.mockResolvedValue({
      id: 'u1',
      email: 'a@test.com',
      passwordHash,
    } as UserEntity);
    const res = await service.login({
      email: 'a@test.com',
      password: 'correct1',
    });
    expect(res.accessToken).toBe('signed.jwt.token');
    expect(res.user).toEqual({ id: 'u1', email: 'a@test.com' });
  });
});

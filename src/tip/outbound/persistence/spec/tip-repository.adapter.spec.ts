import { jest } from '@jest/globals'; // eslint-disable-line node/no-extraneous-import
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import _ from 'lodash';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION_NAME } from '../../../../infrastructure/config/environment.constant.js';
import utils from '../../../../infrastructure/utils/index.js';
import { Tip } from '../../../domain/entity/index.js';
import { TipRepositoryAdapter } from '../tip-repository.adapter.js';

class TipModel {
  async create(document: Partial<Tip>): Promise<Tip> {
    return {
      _id: new mongoose.Types.ObjectId(),
      uuid: utils.uuidv4(),
      active: true,
      createdAt: new Date(),
      description: null,
      etc: null,
      image: null,
      title: '',
      updatedAt: new Date(),
      url: 'https://kue.tip',
      ..._.omitBy(document, _.isUndefined),
    };
  }

  async countDocuments(): Promise<number> {
    return 1;
  }

  async find(): Promise<Tip[]> {
    return [
      {
        _id: new mongoose.Types.ObjectId(),
        uuid: utils.uuidv4(),
        active: true,
        createdAt: new Date(),
        description: null,
        etc: null,
        image: null,
        title: '',
        updatedAt: new Date(),
        url: 'https://kue.tip',
      },
    ];
  }
}

describe('tip-repository.adapter', () => {
  let moduleRef: TestingModule;

  let tipModel: TipModel;
  let service: TipRepositoryAdapter;

  beforeEach(async () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-06-26T00:00:00.000+09:00'));

    moduleRef = await Test.createTestingModule({
      providers: [
        TipRepositoryAdapter,
        {
          provide: getModelToken(Tip.name, DATABASE_CONNECTION_NAME.MAIN),
          useClass: TipModel,
        },
      ],
    }).compile();

    tipModel = moduleRef.get<TipModel>(
      getModelToken(Tip.name, DATABASE_CONNECTION_NAME.MAIN),
    );

    service = moduleRef.get<TipRepositoryAdapter>(TipRepositoryAdapter);

    jest
      .spyOn(utils, 'uuidv4')
      .mockReturnValue('25176a54-7afd-40b0-a3d1-24465d7fcb57');
  });

  it('TIP 을 생성해야 한다.', async () => {
    const create_spy = jest.spyOn(tipModel, 'create');

    await service.create('https://kue.tips');

    expect(create_spy).toBeCalledWith({
      url: 'https://kue.tips',
      uuid: '25176a54-7afd-40b0-a3d1-24465d7fcb57',
    });
  });
});

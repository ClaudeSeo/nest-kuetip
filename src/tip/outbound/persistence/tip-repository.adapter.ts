import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION_NAME } from '../../../infrastructure/config/environment.constant.js';
import utils from '../../../infrastructure/utils/index.js';
import { Tip, TipDocument } from '../../domain/entity/index.js';
import { TipRepository } from '../../domain/ports/index.js';

@Injectable()
export class TipRepositoryAdapter implements TipRepository {
  constructor(
    @InjectModel(Tip.name, DATABASE_CONNECTION_NAME.MAIN)
    private readonly tipModel: mongoose.Model<TipDocument>,
  ) {}

  async create(url: string): Promise<Tip> {
    return await this.tipModel.create({
      url,
      uuid: utils.uuidv4(),
    });
  }

  async findAll(): Promise<Tip[]> {
    return await this.tipModel.find(
      {
        active: true,
      },
      null,
      {
        sort: {
          _id: -1,
        },
      },
    );
  }

  async getCount(): Promise<number> {
    return await this.tipModel.countDocuments();
  }
}

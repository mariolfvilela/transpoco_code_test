import { Controller, Get } from '@overnightjs/core';
import logger from '@src/logger';
import { Request, Response } from 'express';
import { Tracker } from '@src/models/tracker';
import { TrackerService } from '@src/services/tracker-service';
import { BaseController } from '@src/controllers/base-controller';

@Controller('trackers')
export class TrackerController extends BaseController<Tracker> {
  private readonly _trackerService = new TrackerService();
  constructor() {
    super();
  }

  @Get('')
  public async getAll(
    req: Request,
    res: Response
  ): Promise<Response<Tracker[]> | void> {
    try {
      const {
        orderBy,
      }: {
        orderBy?: 'asc' | 'desc';
      } = req.query;
      const trackers = await this._trackerService.getAll(orderBy);
      res.status(200).send(trackers);
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }

  @Get(':tracker_uid')
  public async getByTrackerUid(
    req: Request,
    res: Response
  ): Promise<Response<Tracker[]> | void> {
    try {
      //const {initDate,endDate}: {initDate?:keyof Date; endDate?: keyof Date;} = req.query;
      const tracker_uid = Number(req.params.tracker_uid) | 0;
      res
        .status(200)
        .send(await this._trackerService.getByTrackerUid(tracker_uid));
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}

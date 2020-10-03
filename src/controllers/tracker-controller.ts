import { Controller, Get } from '@overnightjs/core';
import logger from '@src/logger';
import { Request, Response } from 'express';
import { Tracker } from '@src/models/tracker';
import { BaseController } from '@src/controllers/base-controller';
import { ITrackerService } from '@src/services/interfaces/i-tracker-service';

@Controller('trackers')
export class TrackerController extends BaseController<Tracker> {
  /**
   * @param {ITrackerService<Tracker>} _trackerService
   */
  constructor(private readonly _trackerService: ITrackerService<Tracker>) {
    super();
  }

  @Get('')
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const {
        orderBy,
        orderField,
        start_date,
        end_date,
      }: {
        orderBy?: 'ASC' | 'DESC';
        orderField?: string;
        start_date?: Date;
        end_date?: Date;
      } = req.query;
      const trackers = await this._trackerService.getAll(
        orderBy,
        orderField,
        start_date,
        end_date
      );
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
      const tracker_uid = Number(req.params.tracker_uid) | 0;
      const {
        start_date,
        end_date,
      }: {
        start_date?: Date;
        end_date?: Date;
      } = req.query;

      if (Math.sign(tracker_uid) < 1)
        this.sendErrorResponse(res, {
          code: 500,
          message: 'Tracker_uid must be a positive value',
        });
      else
        res
          .status(200)
          .send(
            await this._trackerService.getByTrackerUid(
              tracker_uid,
              start_date,
              end_date
            )
          );
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}

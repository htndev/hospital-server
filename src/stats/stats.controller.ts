import { Post, Body, Controller } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('/period')
  async byPeriod(@Body('lte') lte: Date, @Body('gte') gte: Date) {
    return this.statsService.getVisitsByPeriod(gte, lte);
  }

  @Post('/specs')
  async bySpec(@Body('lte') lte: Date, @Body('gte') gte: Date) {
    return this.statsService.getSpecsByPeriod(gte, lte);
  }
}

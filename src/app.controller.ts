import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("home")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get All Home\'s' })
  @ApiResponse({ status: 200, description: 'get all home\'s.' })
  @ApiResponse({ status: 404, description: 'no saved home\'s.' })
  @Get()
  getHome(): string {
    return "Hello From Home";
  }
}

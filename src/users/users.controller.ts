import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateApplicationDto } from 'src/applications/dto/create-application.dto/create-application.dto';
import { ApplicationOwnerGuard } from 'src/auth/application-owner/application-owner.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('apps')
  getAllApps(@Req() req: any) {
		const userId = req.user.id;
		const page = req.query.page;
		const limit = req.query.limit;
    return this.usersService.getAllApps(userId, page, limit);
  }

  @Get('apps/:id')
	@UseGuards(ApplicationOwnerGuard)
  getAppById(@Param('id') id: string) {
    return this.usersService.getAppById(id);
  }

  @Post('apps')
  createApp(@Body() createAppDto: CreateApplicationDto, @Req() req: any) {
		const userId = req.user.id;
  	return this.usersService.createApp(createAppDto, userId);
  }

  @Put('apps/:id')
	@UseGuards(ApplicationOwnerGuard)
  updateApp(
		@Param('id') id: string,
		@Body() updateAppDto: any,
		@Req() req: any
	) {
		const userId = req.user.id;
    return this.usersService.updateApp(id, updateAppDto, userId);
  }

  @Delete('apps/:id')
	@UseGuards(ApplicationOwnerGuard)
  deleteApp(
		@Param('id') id: string,
		@Req() req: any
	) {
		const userId = req.user.id;
    return this.usersService.deleteApp(id, userId);
  }
}

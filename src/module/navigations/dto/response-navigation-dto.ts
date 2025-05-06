export class ResponseNavigationDto {
	id: string;
	name: string;
	appId: string;
	typeId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(partial: Partial<ResponseNavigationDto>) {
		Object.assign(this, partial);
	}
}
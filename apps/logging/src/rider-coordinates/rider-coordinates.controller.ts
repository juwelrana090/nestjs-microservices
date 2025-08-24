import { Controller, Get } from '@nestjs/common';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
    @Get()
    getRiderCoordinates() {
        // Logic to retrieve rider coordinates
        return 'Rider Coordinates'
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RiderCoordinatesService {
    constructor(
        @InjectModel(RiderCoordinate.name)
        private readonly riderCoodinateModel: Model<RiderCoordinate>,
        @Inject('RIDER_SERVICE') private client: ClientProxy
    ) { }

    async getRiderCoordiantes(riderId: string) {
        try {
            const coordinates = await this.riderCoodinateModel.find({ rider: riderId });
            console.log('coordinates', coordinates)
            const pattern = { cmd: 'get-rider' };
            const payload = { id: riderId }
            const rider = await firstValueFrom(this.client.send(pattern, payload));
            console.log('rider', rider)
            return { coordinates, rider }
        }
        catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }
    async saveRiderCoordiantes(createCoordinateDTO: CraeteCoordinatesDTO) {
        return await this.riderCoodinateModel.create(createCoordinateDTO)
    }
}
import { Controller } from "@nestjs/common";
import { GuestsModule } from "./guests.module";

@Controller()
    export class GuestsController {
        constructor(private readonly guestsModule: GuestsModule){}
    }

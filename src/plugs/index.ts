
import { useSwagger } from "./swagger";
import { INestApplication } from "@nestjs/common";
export function usePlugs(app: INestApplication) {
    useSwagger(app);
    // useLogger(app);
}
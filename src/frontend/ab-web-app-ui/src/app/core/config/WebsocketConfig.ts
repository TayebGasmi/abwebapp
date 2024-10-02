import {RxStompConfig} from "@stomp/rx-stomp";
import {environment} from "../../../environments/environment";

export const rxStompConfig: RxStompConfig = {
  brokerURL: environment.WS_URL,
};

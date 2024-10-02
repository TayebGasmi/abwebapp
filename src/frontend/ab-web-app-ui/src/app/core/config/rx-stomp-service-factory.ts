import {RxStompService} from "../service/rx-stomp.service";
import {rxStompConfig} from "./WebsocketConfig";


export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(rxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
